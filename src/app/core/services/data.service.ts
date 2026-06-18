import { Service, inject, Signal, computed, effect } from '@angular/core';
import { FetchService } from '@core/services/fetch.service';
import { StateService } from '@core/services/state.service';
import { LoggingService } from '@core/services/logging.service';
import { DataState, ChorusSessionState } from '@core/models/state';
import { Sentence } from '@core/models/sentence';
import { Language } from '@core/models/language';
import { CourseConfig } from '@core/models/config';
import { User } from '@supabase/supabase-js';

@Service()
export class DataService {
  // Services
  private readonly fetchService = inject(FetchService);
  private readonly stateService = inject(StateService);
  private readonly logger = inject(LoggingService);

  // State
  readonly currentUser = this.stateService.currentUser;
  readonly isLoggedIn = computed(() => {
    return this.currentUser() !== null;
  });
  readonly userId = computed(() => {
    return this.currentUser()?.value?.id;
  });

  constructor() {
    effect(() => {
      // functions to run once a user logs in.
      if (this.isLoggedIn()) {
        this.fetchAndHydrateTotalSentenceCount();
        this.stateService.clearSentenceCountMap();
      }
    });
  }

  getTotalSentenceCount(): Signal<DataState<number>> {
    const existingSignal = this.stateService.totalSentenceCount;
    if (existingSignal()?.value !== null) {
      return existingSignal;
    }
    if (this.isLoggedIn()) {
      this.fetchAndHydrateTotalSentenceCount();
    }
    return existingSignal;
  }

  private async fetchAndHydrateTotalSentenceCount(): Promise<void> {
    try {
      const fetchedCount = await this.fetchService.fetchTotalSentenceCount(this.userId()!);
      this.stateService.setTotalSentenceCount({
        value: fetchedCount,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      this.logger.error(`Failed to fetch total sentence count`, error);
      this.stateService.setTotalSentenceCount({
        value: null,
        isLoading: false,
        error: 'Failed to fetch total sentence count.',
      });
    }
  }

  setCurrentUser(value: Partial<DataState<User>>): void {
    this.stateService.setCurrentUser(value);
  }

  getLanguageList(): Signal<DataState<Language[]>> {
    const existingSignal = this.stateService.languageList;
    if (!existingSignal()?.isLoading) {
      return existingSignal;
    }
    this.fetchAndHydrateLanguageList();
    this.logger.debug('fetch.service.ts fetchLanguageList | returning:', existingSignal);
    return existingSignal;
  }

  private async fetchAndHydrateLanguageList(): Promise<void> {
    try {
      const fetchedLanguageList = await this.fetchService.fetchLanguageList();
      this.stateService.setLanguageList({
        value: fetchedLanguageList,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      this.logger.error(`Failed to fetch language list`, error);
      this.stateService.setLanguageList({
        value: null,
        isLoading: false,
        error: 'Failed to fetch language list.',
      });
    }
  }

  loadSentences(sentenceIds: number[]): void {
    for (const sentenceId of sentenceIds) {
      this.getSentence(sentenceId);
    }
  }

  getSentence(sentenceId: number): Signal<DataState<Sentence>> {
    const existingSignal = this.stateService.getSentence(sentenceId);
    if (existingSignal !== null) {
      return existingSignal!;
    }
    const newSignal = this.stateService.initializeSentence(sentenceId);
    this.fetchAndHydrateSentence(sentenceId);
    return newSignal;
  }

  private async fetchAndHydrateSentence(sentenceId: number): Promise<void> {
    try {
      const fetchSentence = await this.fetchService.fetchSentence(sentenceId);
      this.stateService.setSentence(sentenceId, {
        value: fetchSentence,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      this.logger.error(`Failed to fetch sentence for ${sentenceId}`, error);
      this.stateService.setSentence(sentenceId, {
        value: null,
        isLoading: false,
        error: 'Failed to fetch sentence.',
      });
    }
  }

  loadSentenceCounts(sentenceIds: number[]): void {
    for (const sentenceId of sentenceIds) {
      this.getSentenceCount(sentenceId);
    }
  }

  getSentenceCount(sentenceId: number): Signal<DataState<number>> {
    const existingSignal = this.stateService.getSentenceCount(sentenceId);
    if (existingSignal !== null) {
      return existingSignal!;
    }
    const newSignal = this.stateService.initializeSentenceCount(sentenceId);
    this.fetchAndHydrateSentenceCount(sentenceId);
    return newSignal;
  }

  private async fetchAndHydrateSentenceCount(sentenceId: number): Promise<void> {
    try {
      const fetchedCount = await this.fetchService.fetchSentenceCount(sentenceId, this.userId()!);
      this.stateService.setSentenceCount(sentenceId, {
        value: fetchedCount,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      this.logger.error(`Failed to fetch count for ${sentenceId}`, error);
      this.stateService.setSentenceCount(sentenceId, {
        value: null,
        isLoading: false,
        error: 'Failed to fetch count.',
      });
    }
  }

  incrementSentenceCount(sentenceId: number, isChorus: boolean = false): void {
    this.stateService.incrementSentenceCount(sentenceId, isChorus);
    this.fetchService.incrementSentenceCount(sentenceId);
  }

  getAudio(sentenceId: number): Signal<DataState<string>> {
    const existingAudio = this.stateService.getAudio(sentenceId);
    if (existingAudio !== null) {
      return existingAudio!;
    }
    const newAudio = this.stateService.initializeAudio(sentenceId);
    this.fetchAndHydrateAudio(sentenceId);
    return newAudio;
  }

  private async fetchAndHydrateAudio(sentenceId: number): Promise<void> {
    try {
      const fetchedAudio = await this.fetchService.fetchAudio(sentenceId);
      this.stateService.setAudio(sentenceId, {
        value: fetchedAudio,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      this.logger.error(`Failed to fetch audio for ${sentenceId}`, error);
      this.stateService.setAudio(sentenceId, {
        value: null,
        isLoading: false,
        error: 'Failed to fetch audio.',
      });
    }
  }

  getCourseConfig(language: string, accent: string): Signal<DataState<CourseConfig>> {
    const existingSignal = this.stateService.getCourseConfig(language, accent);
    if (existingSignal !== null) {
      return existingSignal!;
    }
    const newSignal = this.stateService.initializeCourseConfig(language, accent);
    this.fetchAndHydrateCourseConfig(language, accent);
    return newSignal;
  }

  private async fetchAndHydrateCourseConfig(language: string, accent: string): Promise<void> {
    try {
      const fetchedConfig = await this.fetchService.fetchCourseConfig(language, accent);
      this.stateService.setCourseConfig(language, accent, {
        value: fetchedConfig,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      this.logger.error(`Failed to fetch config for ${language}/${accent}`, error);
      this.stateService.setCourseConfig(language, accent, {
        value: null,
        isLoading: false,
        error: 'Failed to fetch config.',
      });
    }
  }

  public readonly isAudioPlaying = this.stateService.getIsAudioPlaying();

  setIsAudioPlaying(value: boolean): void {
    this.stateService.setIsAudioPlaying(value);
  }

  initializeChorusSessionState(config: CourseConfig): void {
    if (config === null || config.chorus === null || config.chorus.sentences === null) {
      this.logger.error('data.service.ts | Failed to initialize chorus session state: config is null');
      return;
    }
    const indices = new Set<number>();
    while (indices.size < 10) {
      indices.add(Math.floor(Math.random() * 20));
    }
    const sentenceToAddToSession: number[] = Array.from(indices).map(index => config.chorus.sentences[index]);
    this.stateService.setChorusSessionState({ cumulativeReps: 0, sentencesInSession: sentenceToAddToSession });
  }

  getChorusSessionState(): Signal<ChorusSessionState> {
    return this.stateService.getChorusSessionState();
  }
}
