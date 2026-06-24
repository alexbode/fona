import { Service, inject, Signal, computed, effect } from '@angular/core';
import { FetchService } from '@core/services/fetch.service';
import { StateService } from '@core/services/state.service';
import { LoggingService } from '@core/services/logging.service';
import { DataState } from '@core/models/state';
import { Sentence } from '@core/models/sentence';
import { Language } from '@core/models/language';
import { CourseConfig } from '@core/models/config';
import { AppUser } from '@core/models/user';

@Service()
export class DataService {
  // Services
  private readonly fetchService = inject(FetchService);
  private readonly stateService = inject(StateService);
  private readonly logger = inject(LoggingService);

  // State
  readonly currentUser = this.stateService.currentUser;
  readonly isLoggedIn = computed(() => {
    return this.currentUser().value !== null;
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

  setCurrentUser(value: Partial<DataState<AppUser>>): void {
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
    const idsToFetch: number[] = [];
    for (const sentenceId of sentenceIds) {
      const existingSignal = this.stateService.getSentence(sentenceId);
      if (existingSignal === null) {
        this.stateService.initializeSentence(sentenceId);
        idsToFetch.push(sentenceId);
      }
    }

    if (idsToFetch.length > 0) {
      this.fetchAndHydrateSentences(idsToFetch);
    }
  }

  private async fetchAndHydrateSentences(sentenceIds: number[]): Promise<void> {
    try {
      const fetchedSentences = await this.fetchService.fetchSentences(sentenceIds);
      const fetchedMap = new Map<number, Sentence>();
      for (const item of fetchedSentences) {
        fetchedMap.set(item.id, item.sentence);
      }

      for (const sentenceId of sentenceIds) {
        const sentence = fetchedMap.get(sentenceId);
        if (sentence) {
          this.stateService.setSentence(sentenceId, {
            value: sentence,
            isLoading: false,
            error: null,
          });
        } else {
          this.stateService.setSentence(sentenceId, {
            value: null,
            isLoading: false,
            error: 'Sentence not found.',
          });
        }
      }
    } catch (error) {
      this.logger.error(`Failed to fetch sentences for [${sentenceIds.join(', ')}]`, error);
      for (const sentenceId of sentenceIds) {
        this.stateService.setSentence(sentenceId, {
          value: null,
          isLoading: false,
          error: 'Failed to fetch sentence.',
        });
      }
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

  incrementSentenceCount(sentenceId: number): void {
    this.stateService.incrementSentenceCount(sentenceId);
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

      // Extract all sentence IDs from the course config and pre-fetch them in a single batch
      const sentenceIds = new Set<number>();
      if (fetchedConfig.chorus?.sentences) {
        for (const id of fetchedConfig.chorus.sentences) {
          sentenceIds.add(id);
        }
      }
      if (fetchedConfig.pairs) {
        for (const pair of fetchedConfig.pairs) {
          if (pair.sentences) {
            for (const id of pair.sentences) {
              sentenceIds.add(id);
            }
          }
          if (pair.words_a) {
            for (const id of pair.words_a) {
              sentenceIds.add(id);
            }
          }
          if (pair.words_b) {
            for (const id of pair.words_b) {
              sentenceIds.add(id);
            }
          }
        }
      }
      if (fetchedConfig.pairsQuiz) {
        for (const quiz of fetchedConfig.pairsQuiz) {
          if (quiz.word_a) sentenceIds.add(quiz.word_a);
          if (quiz.word_b) sentenceIds.add(quiz.word_b);
        }
      }

      if (sentenceIds.size > 0) {
        this.loadSentences(Array.from(sentenceIds));
      }
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
}
