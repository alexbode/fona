import { Injectable, inject, signal, Signal, WritableSignal } from '@angular/core';
import { SupabaseService } from '@core/services/supabase.service';
import { LoggingService } from '@core/services/logging.service';
import { AuthService } from '@core/services/auth.service';
import { Sentence } from '@core/models/sentence';
import { LRUCache } from '@core/helpers/lru-cache';

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
  private presignedUrlCache = new LRUCache<string, Promise<string>>();
  private sentencesCache = new LRUCache<string, Promise<Sentence[]>>();
  private sentenceCountCache = new LRUCache<string, Promise<number>>();
  public sentenceCountUpdateTrigger = signal(0);

  getSentences(language: string, accent: string, sentenceId: string | number): Promise<Sentence[]> {
    if (!language || !accent || !sentenceId) return Promise.reject([]);
    const key = `${language.toLowerCase()}/${accent.toLowerCase()}`;
    this.logger.debug('data.service.ts getSentences | key:', key);
    if (this.sentencesCache.has(key)) {
      this.logger.debug('data.service.ts getSentences | cache:', 'hit');
      return this.sentencesCache.get(key)!;
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
      (item: any) =>
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
    if (this.presignedUrlCache.has(key)) {
      this.logger.debug('data.service.ts getPresignedUrl | cache:', 'hit');
      return this.presignedUrlCache.get(key)!;
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
      .createSignedUrl(key, 3600);
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

    if (this.sentenceCountCache.has(key)) {
      this.logger.debug('data.service.ts getSentenceCount | cache:', 'hit');
      return this.sentenceCountCache.get(key)!;
    }

    const { data, error } = await this.supabase
      .from('chorus_counts')
      .select(`count, language!inner(language), accent!inner(accent)`)
      .eq('language.language', language.toLowerCase())
      .eq('accent.accent', accent.toLowerCase())
      .eq('sentence_id', sentenceId)
      .eq('user_id', this.auth.userId())
      .maybeSingle();
    if (error) {
      this.logger.error('data.service.ts getSentenceCount | error:', error, data);
      throw error;
    }
    this.sentenceCountCache.put(key, Promise.resolve(data?.count ?? 0));
    return this.sentenceCountCache.get(key)!;
  }

  async incrementSentenceCount(language: string, accent: string, sentenceId: string | number) {
    const key = `${language.toLowerCase()}/${accent.toLowerCase()}/${sentenceId}`;
    this.logger.debug('data.service.ts incrementSentenceCount | key:', key);
    const currentCount = (await this.getSentenceCount(language, accent, sentenceId)) ?? 0;

    // Instantly update the global cache so other components see the new value immediately
    this.sentenceCountCache.put(key, Promise.resolve(currentCount + 1));
    // Trigger singal so any 'resource' used in a component can be updated.
    this.sentenceCountUpdateTrigger.update((v) => v + 1);

    // Perform the backgr97709c1a-4551-4118-813f-01e36dcf4a9cound network request
    const { error } = await this.supabase.rpc('increment_rep', {
      p_user_id: this.auth.currentUser()?.id,
      p_language: language,
      p_accent: accent,
      p_sentence: parseInt(String(sentenceId), 10),
    });

    if (error) {
      this.logger.error('data.service.ts incrementSentenceCount | error:', error);
      // Optional: Revert the cache if the network request fails
      this.sentenceCountCache.put(key, Promise.resolve(currentCount));
    }
  }
}
