import { Injectable, inject, signal } from '@angular/core';
import { SupabaseService } from '@core/services/supabase.service';
import { LoggingService } from '@core/services/logging.service';
import { AuthService } from '@core/services/auth.service';
import { Sentence } from '@core/models/sentence';
import { LRUCache } from '@app/core/helpers/lru-cache/lru-cache';
import { CourseConfig } from '@core/models/config';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  // Services
  private readonly supabase = inject(SupabaseService).getSupabaseClient();
  private readonly logger = inject(LoggingService);
  private readonly auth = inject(AuthService);

  // State
  private readonly presignedUrlCacheSize = 1000;
  private readonly presignedUrlTtlSeconds = 3600;
  private presignedUrlCache = new LRUCache<string, Promise<string>>(
    this.presignedUrlCacheSize,
    this.presignedUrlTtlSeconds,
  );
  private sentencesCache = new LRUCache<string, Promise<Sentence>>();
  private sentenceCountCache = new LRUCache<string, Promise<number>>();
  public sentenceCountUpdateTrigger = signal(0);
  private courseConfigCache = new LRUCache<string, Promise<CourseConfig>>();

  async getCourseConfig(language: string, accent: string): Promise<CourseConfig> {
    const key = `${language.toLowerCase()}/${accent.toLowerCase()}`;
    this.logger.debug('data.service.ts getCourseConfig | key:', key);

    if (this.courseConfigCache.has(key)) {
      this.logger.debug('data.service.ts getCourseConfig | cache: hit');
      return this.courseConfigCache.get(key)!;
    }

    const fetchPromise = this.fetchCourse(language, accent);
    this.courseConfigCache.put(key, fetchPromise);
    return fetchPromise;
  }

  async fetchCourse(language: string, accent: string): Promise<CourseConfig> {
    const { data, error } = await this.supabase
      .from('course')
      .select('config, language!inner(language), accent!inner(accent)')
      .eq('language.language', language.toLowerCase())
      .eq('accent.accent', accent.toLowerCase())
      .single();
    if (error) {
      this.logger.error('data.service.ts fetchCourse | error:', error);
      throw error;
    }
    return data.config as CourseConfig;
  }

  getSentence(sentenceId: number): Promise<Sentence> {
    if (!sentenceId) return Promise.reject([]);
    const key = String(sentenceId);
    this.logger.debug('data.service.ts getSentences | key:', key);

    const cached = this.sentencesCache.get(key);
    if (cached) {
      this.logger.debug('data.service.ts getSentences | cache:', 'hit');
      return cached;
    }

    const fetchPromise = this.fetchSentence(sentenceId);
    this.sentencesCache.put(key, fetchPromise);
    fetchPromise.catch(() => this.sentencesCache.delete(key));

    return fetchPromise;
  }

  private async fetchSentence(sentenceId: number): Promise<Sentence> {
    this.logger.debug('data.service.ts fetchSentence | sentenceId:', sentenceId);

    const { data, error } = await this.supabase
      .from('sentence')
      .select('text, ipa, pinyin')
      .eq('id', sentenceId)
      .single();

    if (error) {
      this.logger.error('data.service.ts fetchSentence | error:', error);
      throw error;
    }

    return {
      text: data.text,
      ipa: data.ipa,
      pinyin: data.pinyin,
    } as Sentence;
  }

  getPresignedUrl(sentenceId: number): Promise<string> {
    if (!sentenceId) return Promise.reject('');

    const key = String(sentenceId);
    this.logger.debug('data.service.ts getPresignedUrl | key:', key);

    const cached = this.presignedUrlCache.get(key);
    if (cached) {
      this.logger.debug('data.service.ts getPresignedUrl | cache:', 'hit');
      return cached;
    }

    const fetchPromise = this.fetchAudio(sentenceId);
    this.presignedUrlCache.put(key, fetchPromise);
    fetchPromise.catch(() => this.presignedUrlCache.delete(key));

    return fetchPromise;
  }

  private async fetchAudio(sentenceId: number): Promise<string> {
    this.logger.debug('data.service.ts fetchAudio | sentenceId:', sentenceId);
    const { data, error } = await this.supabase.storage
      .from('audio')
      .createSignedUrl(`${sentenceId}.wav`, this.presignedUrlTtlSeconds + 100);

    if (error) {
      this.logger.error('data.service.ts fetchAudio | error:', error);
      throw error;
    }
    return data.signedUrl;
  }

  async getSentenceCount(sentenceId: number): Promise<number> {
    const key = String(sentenceId);
    this.logger.debug('data.service.ts getSentenceCount | key:', key);

    const cached = this.sentenceCountCache.get(key);
    if (cached) {
      this.logger.debug('data.service.ts getSentenceCount | cache:', 'hit');
      return cached;
    }

    const { data, error } = await this.supabase
      .from('sentence_listen_count')
      .select('count')
      .eq('sentence_id', sentenceId)
      .eq('user_id', this.auth.userId())
      .maybeSingle();

    if (error) {
      this.logger.error('data.service.ts getSentenceCount | error:', error, data);
      throw error;
    }

    const countPromise = Promise.resolve(data?.count ?? 0);
    this.sentenceCountCache.put(key, countPromise);
    return countPromise;
  }

  async incrementSentenceCount(sentenceId: number) {
    const key = String(sentenceId);
    this.logger.debug('data.service.ts incrementSentenceCount | key:', key);
    const currentCount = (await this.getSentenceCount(sentenceId)) ?? 0;

    // Optimistic Update
    this.sentenceCountCache.put(key, Promise.resolve(currentCount + 1));
    this.sentenceCountUpdateTrigger.update((v) => v + 1);

    // Background network request
    const { error } = await this.supabase.rpc('increment_sentence_count', { p_sentence_id: sentenceId });

    // Revert on error
    if (error) {
      this.logger.error('data.service.ts incrementSentenceCount | error:', error);
      this.sentenceCountCache.put(key, Promise.resolve(currentCount));
      this.sentenceCountUpdateTrigger.update((v) => v + 1);
    }
  }
}
