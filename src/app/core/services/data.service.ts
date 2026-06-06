import { Injectable, inject, signal, ResourceRef, resource, computed } from '@angular/core';
import { SupabaseService } from '@core/services/supabase.service';
import { LoggingService } from '@core/services/logging.service';
import { Sentence } from '@core/models/sentence';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  // Services
  private readonly client = inject(SupabaseService);
  private readonly logger = inject(LoggingService);

  // Clients
  private readonly supabase = this.client.getSupabaseClient();

  // Signals
  protected language = signal<string>('');
  protected accent = signal<string>('');
  protected sentenceId = signal<string>('');

  // State
  private presignedUrlCache = new Map<string, Promise<string>>();
  private readonly bucketName = 'repeat-with-me-audio';
  private sentencesCache = new Map<string, Promise<Sentence[]>>();

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
}
