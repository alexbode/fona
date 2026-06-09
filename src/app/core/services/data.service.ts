import { Injectable, inject, signal, Signal, WritableSignal } from '@angular/core';
import { SupabaseService } from '@core/services/supabase.service';
import { LoggingService } from '@core/services/logging.service';
import { AuthService } from '@core/services/auth.service';
import { Sentence } from '@core/models/sentence';
import { LRUCache } from '@app/core/helpers/lru-cache/lru-cache';

interface DbSentence {
  text: string;
  ipa: string;
  pinyin: string | null;
  sentence_id: string | number;
}

@Injectable({
  providedIn: 'root',
})
export class DataService {
  // Services
  private readonly supabase = inject(SupabaseService).getSupabaseClient();
  private readonly logger = inject(LoggingService);
  private readonly auth = inject(AuthService);

  // State
  private readonly bucketName = 'repeat-with-me-audio';
  private readonly presignedUrlCacheSize = 1000;
  private readonly presignedUrlTtlSeconds = 3600;
  private presignedUrlCache = new LRUCache<string, Promise<string>>(
    this.presignedUrlCacheSize,
    this.presignedUrlTtlSeconds,
  );
  private sentencesCache = new LRUCache<string, Promise<Sentence[]>>();
  private sentenceCountCache = new LRUCache<string, Promise<number>>();
  public sentenceCountUpdateTrigger = signal(0);

  getSentences(language: string, accent: string): Promise<Sentence[]> {
    if (!language || !accent) return Promise.reject([]);
    const key = `${language.toLowerCase()}/${accent.toLowerCase()}`;
    this.logger.debug('data.service.ts getSentences | key:', key);

    const cached = this.sentencesCache.get(key);
    if (cached) {
      this.logger.debug('data.service.ts getSentences | cache:', 'hit');
      return cached;
    }

    const fetchPromise = this.fetchSentences(language, accent);
    this.sentencesCache.put(key, fetchPromise);
    fetchPromise.catch(() => this.sentencesCache.delete(key));

    return fetchPromise;
  }

  private async fetchSentences(language: string, accent: string): Promise<Sentence[]> {
    this.logger.debug('data.service.ts fetchSentences | language, accent:', language, accent);

    const { data, error } = await this.supabase
      .from('sentences')
      .select(`text, ipa, pinyin, sentence_id, language!inner(language), accent!inner(accent)`)
      .eq('language.language', language)
      .eq('accent.accent', accent);

    if (error) {
      this.logger.error('data.service.ts fetchSentences | error:', error);
      throw error;
    }

    return data.map(
      (item: DbSentence) =>
        ({
          text: item.text,
          ipa: item.ipa,
          pinyin: item.pinyin,
          sentenceId: item.sentence_id,
        }) as Sentence,
    );
  }

  getPresignedUrl(language: string, accent: string, sentenceId: string | number): Promise<string> {
    if (!language || !accent || !sentenceId) return Promise.reject('');

    const key = `${language.toLowerCase()}/${accent.toLowerCase()}/sentence_${sentenceId}.wav`;
    this.logger.debug('data.service.ts getPresignedUrl | key:', key);

    const cached = this.presignedUrlCache.get(key);
    if (cached) {
      this.logger.debug('data.service.ts getPresignedUrl | cache:', 'hit');
      return cached;
    }

    const fetchPromise = this.fetchAudio(key);
    this.presignedUrlCache.put(key, fetchPromise);
    fetchPromise.catch(() => this.presignedUrlCache.delete(key));

    return fetchPromise;
  }

  private async fetchAudio(key: string): Promise<string> {
    this.logger.debug('data.service.ts fetchAudio | key:', key);
    const { data, error } = await this.supabase.storage
      .from(this.bucketName)
      .createSignedUrl(key, this.presignedUrlTtlSeconds + 100);

    if (error) {
      this.logger.error('data.service.ts fetchAudio | error:', error);
      throw error;
    }
    return data.signedUrl;
  }

  async getSentenceCount(
    language: string,
    accent: string,
    sentenceId: string | number,
  ): Promise<number> {
    const key = `${language.toLowerCase()}/${accent.toLowerCase()}/${sentenceId}`;
    this.logger.debug('data.service.ts getSentenceCount | key:', key);

    const cached = this.sentenceCountCache.get(key);
    if (cached) {
      this.logger.debug('data.service.ts getSentenceCount | cache:', 'hit');
      return cached;
    }

    const { data, error } = await this.supabase
      .from('chorus_counts')
      .select(`count, language!inner(language), accent!inner(accent)`)
      .eq('language.language', language.toLowerCase())
      .eq('accent.accent', accent.toLowerCase())
      .eq('sentence_id', sentenceId)
      .eq('user_id', this.auth.userId()) // Standardized to userId()
      .maybeSingle();

    if (error) {
      this.logger.error('data.service.ts getSentenceCount | error:', error, data);
      throw error;
    }

    const countPromise = Promise.resolve(data?.count ?? 0);
    this.sentenceCountCache.put(key, countPromise);
    return countPromise;
  }

  async incrementSentenceCount(language: string, accent: string, sentenceId: string | number) {
    const key = `${language.toLowerCase()}/${accent.toLowerCase()}/${sentenceId}`;
    this.logger.debug('data.service.ts incrementSentenceCount | key:', key);
    const currentCount = (await this.getSentenceCount(language, accent, sentenceId)) ?? 0;

    // Optimistic Update
    this.sentenceCountCache.put(key, Promise.resolve(currentCount + 1));
    this.sentenceCountUpdateTrigger.update((v) => v + 1);

    // Background network request
    const { error } = await this.supabase.rpc('increment_rep', {
      p_user_id: this.auth.userId(), // Standardized to userId()
      p_language: language,
      p_accent: accent,
      p_sentence: parseInt(String(sentenceId), 10),
    });

    // Revert on error
    if (error) {
      this.logger.error('data.service.ts incrementSentenceCount | error:', error);
      this.sentenceCountCache.put(key, Promise.resolve(currentCount));
      this.sentenceCountUpdateTrigger.update((v) => v + 1);
    }
  }
}
