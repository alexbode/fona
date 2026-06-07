import { Injectable, inject, signal, Signal, WritableSignal } from '@angular/core';
import { SupabaseService } from '@core/services/supabase.service';
import { LoggingService } from '@core/services/logging.service';
import { AuthService } from '@core/services/auth.service';
import { Sentence } from '@core/models/sentence';

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
  private presignedUrlCache = new Map<string, Promise<string>>();
  private sentencesCache = new Map<string, Promise<Sentence[]>>();
  private sentenceCountCache = new Map<string, WritableSignal<number>>();

  getSentences(language: string, accent: string, sentenceId: string | number): Promise<Sentence[]> {
    if (!language || !accent || !sentenceId) return Promise.reject([]);
    const key = `${language.toLowerCase()}/${accent.toLowerCase()}`;
    this.logger.debug('data.service.ts getSentences | key:', key);
    if (this.sentencesCache.has(key)) {
      this.logger.debug('data.service.ts getSentences | sentencesCache Hit!');
      return this.sentencesCache.get(key)!;
    }
    const fetchPromise = this.fetchSentences(language, accent);
    this.sentencesCache.set(key, fetchPromise);
    fetchPromise.catch(() => this.sentencesCache.delete(key));
    return fetchPromise;
  }

  private async fetchSentences(language: string, accent: string): Promise<Sentence[]> {
    this.logger.debug(`data.service.ts fetchSentences | ${language} ${accent}`);
    const { data, error } = await this.supabase
      .from('sentences')
      .select(`text, ipa, pinyin, sentence_id, language!inner(language), accent!inner(accent)`)
      .eq('language.language', language)
      .eq('accent.accent', accent);
    if (error) {
      this.logger.error('data.service.ts sentences | Supabase query failed:', error.message);
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
    if (!language || !accent || !sentenceId) return Promise.reject('No key provided');
    const key = `${language.toLowerCase()}/${accent.toLowerCase()}/sentence_${sentenceId}.wav`;
    this.logger.debug('data.service.ts getPresignedUrl | key:', key);
    if (this.presignedUrlCache.has(key)) {
      this.logger.debug('data.service.ts getPresignedUrl | presignedUrlCache Hit!');
      return this.presignedUrlCache.get(key)!;
    }
    const fetchPromise = this.fetchAudio(key);
    this.presignedUrlCache.set(key, fetchPromise);
    fetchPromise.catch(() => this.presignedUrlCache.delete(key));
    return fetchPromise;
  }

  private async fetchAudio(key: string): Promise<string> {
    this.logger.debug('data.service.ts fetchAudio | key:', key);
    const { data, error } = await this.supabase.storage
      .from(this.bucketName)
      .createSignedUrl(key, 3600);
    if (error) {
      this.logger.error('data.service.ts fetchAudio | Error:', error.message);
      throw error;
    }
    return data.signedUrl;
  }

  getSentenceCount(
    language: string,
    accent: string,
    sentenceId: string | number,
  ): WritableSignal<number> {
    if (!language || !accent || !sentenceId) return signal(0);
    const key = `${language.toLowerCase()}/${accent.toLowerCase()}/${sentenceId}`;
    this.logger.debug('data.service.ts getSentenceCount | key:', key);
    if (this.sentenceCountCache.has(key)) {
      this.logger.debug('data.service.ts getSentenceCount | Cache Hit!');
      return this.sentenceCountCache.get(key)!;
    }
    this.sentenceCountCache.set(key, signal(0));
    this.fetchSentenceCount(language, accent, sentenceId).then((count) => {
        this.sentenceCountCache.get(key)!.update((value) => value + count);
    });
    this.logger.debug('dataservice.ts getSentenceCount  Fetch count | ', this.sentenceCountCache.get(key)!)
    return this.sentenceCountCache.get(key)!;
  }

  private async fetchSentenceCount(
    language: string,
    accent: string,
    sentenceId: string | number,
  ): Promise<number> {
    const { data, error } = await this.supabase
      .from('chorus_counts')
      .select(`count, language!inner(language), accent!inner(accent)`)
      .eq('language.language', language.toLowerCase())
      .eq('accent.accent', accent.toLowerCase())
      .eq('sentence_id', sentenceId)
      .eq('user_id', this.auth.userId()).single();

    if (error) {
      this.logger.error('data.service.ts fetchSentenceCount | Error loading initial chorus counts:', error);
      return Promise.reject(0);
    }
    this.logger.debug('data.service.ts fetchSentenceCount | data.count', data.count)
    return data.count;
  }

  async incrementSentenceCount(language: string, accent: string, sentenceId: string | number) {
    this.logger.debug('data.service.ts incrementSentenceCount');
    const key = `${language.toLowerCase()}/${accent.toLowerCase()}/${sentenceId}`;
    const count: WritableSignal<number> = this.getSentenceCount(language, accent, sentenceId);
    count?.update((item) => item + 1);
    const { data, error } = await this.supabase.rpc('increment_rep', {
        p_user_id: this.auth.currentUser()?.id,
        p_language: language,
        p_accent: accent,
        p_sentence: parseInt(String(sentenceId), 10),
      });
      if (error) {
        this.logger.error('data.service.ts incrmentSentenceCount | Error calling function increment_rep:', error);
      }
  }
}
