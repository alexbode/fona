import { Service, inject, isDevMode } from '@angular/core';
import { SupabaseService } from '@core/services/supabase.service';
import { LoggingService } from '@core/services/logging.service';
import { Sentence } from '@core/models/sentence';
import { CourseConfig } from '@core/models/config';
import { Language } from '@core/models/language';

/* Do not directly call the fetch service from a component.
Use the data service instead. */
@Service()
export class FetchService {
  // Services
  private readonly supabase = inject(SupabaseService).getSupabaseClient();
  private readonly logger = inject(LoggingService);
  // In devmode, add a delay to simulate network latency.
  private sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  async fetchTotalSentenceCount(userId: string): Promise<number> {
    this.logger.debug('fetch.service.ts fetchTotalSentenceCount | userId:', userId);
    if (isDevMode()) await this.sleep(2000);

    const { data, error } = await this.supabase.rpc('get_user_total_listen_count', {
      p_user_id: userId,
    });
    if (error) {
      this.logger.error('fetch.service.ts fetchTotalSentenceCount | error:', error);
      throw error;
    }
    return data;
  }

  async fetchLanguageList(): Promise<Language[]> {
    this.logger.debug('fetch.service.ts fetchLanguageList');
    if (isDevMode()) await this.sleep(2000);

    const { data, error } = await this.supabase
      .from('language')
      .select(
        `
      id,
      name:language,
      nativeName:native_name,
      code,
      flag,
      accents:accent!inner (
        id,
        name:accent,
        flag,
        nativeName:native_name,
        code:country_code
      )
    `,
      )
      .overrideTypes<Language[], { merge: false }>();
    if (error) {
      this.logger.error('fetch.service.ts fetchLanguageList | error:', error);
      throw error;
    }
    return data;
  }

  async fetchCourseConfig(language: string, accent: string): Promise<CourseConfig> {
    this.logger.debug('fetch.service.ts fetchCourse | language:', language, accent);
    if (isDevMode()) await this.sleep(2000);

    const { data, error } = await this.supabase
      .from('course')
      .select('config, language!inner(language), accent!inner(accent)')
      .eq('language.language', language.toLowerCase())
      .eq('accent.accent', accent.toLowerCase())
      .single();
    if (error) {
      this.logger.error('fetch.service.ts fetchCourse | error:', error);
      throw error;
    }
    return data.config as CourseConfig;
  }

  async fetchSentence(sentenceId: number): Promise<Sentence> {
    this.logger.debug('fetch.service.ts fetchSentence | sentenceId:', sentenceId);
    if (isDevMode()) await this.sleep(2000);

    const { data, error } = await this.supabase
      .from('sentence')
      .select('text, ipa, pinyin')
      .eq('id', sentenceId)
      .single();

    if (error) {
      this.logger.error('fetch.service.ts fetchSentence | error:', error);
      throw error;
    }

    return {
      text: data.text,
      ipa: data.ipa,
      pinyin: data.pinyin,
    } as Sentence;
  }

  async fetchAudio(sentenceId: number, audioTtlSeconds: number = 3700): Promise<string> {
    this.logger.debug('fetch.service.ts fetchAudio | sentenceId:', sentenceId);
    if (isDevMode()) await this.sleep(2000);

    const { data, error } = await this.supabase.storage
      .from('audio')
      .createSignedUrl(`${sentenceId}.wav`, audioTtlSeconds + 100);

    if (error) {
      this.logger.error('fetch.service.ts fetchAudio | error:', error);
      throw error;
    }
    const response = await fetch(data.signedUrl);
    const blob = await response.blob();
    const objectUrl = URL.createObjectURL(blob);
    return objectUrl;
  }

  async fetchSentenceCount(sentenceId: number, userId: string): Promise<number> {
    this.logger.debug('fetch.service.ts getSentenceCount | sentenceId:', sentenceId, userId);
    if (isDevMode()) await this.sleep(2000);

    const { data, error } = await this.supabase
      .from('sentence_listen_count')
      .select('count')
      .eq('sentence_id', sentenceId)
      .eq('user_id', userId)
      .maybeSingle();
    if (error) {
      this.logger.error('fetch.service.ts getSentenceCount | error:', error, data);
      throw error;
    }
    return data?.count ?? 0;
  }

  async incrementSentenceCount(sentenceId: number) {
    this.logger.debug('fetch.service.ts incrementSentenceCount | sentenceId:', sentenceId);
    if (isDevMode()) await this.sleep(2000);

    const { error } = await this.supabase.rpc('increment_sentence_count', {
      p_sentence_id: sentenceId,
    });

    if (error) {
      this.logger.error('fetch.service.ts incrementSentenceCount | error:', error);
      throw error;
    }
  }
}
