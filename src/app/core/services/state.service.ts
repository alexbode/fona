import { Service, signal, inject, WritableSignal, Signal } from '@angular/core';
import { LoggingService } from '@core/services/logging.service';
import { LRUCache } from '@app/core/helpers/lru-cache/lru-cache';
import { Sentence } from '@core/models/sentence';
import { CourseConfig } from '@core/models/config';
import { DataState } from '@core/models/state';
import { Language } from '@core/models/language';
import { User } from '@supabase/supabase-js';

function createInitialState<T>(initialValue: T | null = null): DataState<T> {
  return {
    value: initialValue,
    isLoading: true,
    error: null,
  };
}

/* Do not directly call the state service from a component
Use the data service instead. */
@Service()
export class StateService {
  // Services
  private readonly logger = inject(LoggingService);

  // State
  #isAudioPlaying = signal<boolean>(false);

  #sentenceCountMap = new LRUCache<number, WritableSignal<DataState<number>>>();
  #totalSentenceCount = signal<DataState<number>>(createInitialState());
  #sentenceMap = new LRUCache<number, WritableSignal<DataState<Sentence>>>();
  #courseConfig = new LRUCache<string, WritableSignal<DataState<CourseConfig>>>();

  #audioCacheSize = 1000;
  #audioTtlSeconds = 3600;
  #audioCache = new LRUCache<number, WritableSignal<DataState<string>>>(
    this.#audioCacheSize,
    this.#audioTtlSeconds,
  );

  #languageList = signal<DataState<Language[]>>(createInitialState());

  #isLoggedIn = signal<DataState<boolean>>(createInitialState<boolean>(false));
  #currentUser = signal<DataState<User>>(createInitialState<User>());

  readonly currentUser = this.#currentUser.asReadonly();
  readonly isLoggedIn = this.#isLoggedIn.asReadonly();
  readonly languageList = this.#languageList.asReadonly();
  readonly totalSentenceCount = this.#totalSentenceCount.asReadonly();

  setTotalSentenceCount(value: Partial<DataState<number>>) {
    this.#totalSentenceCount.update((current) => ({ ...current, ...value }));
  }

  setCurrentUser(value: Partial<DataState<User>>) {
    this.#currentUser.update((current) => ({ ...current, ...value }));
  }

  setLanguageList(value: Partial<DataState<Language[]>>): void {
    this.#languageList.update((current) => ({ ...current, ...value }));
  }

  getIsAudioPlaying(): Signal<boolean> {
    return this.#isAudioPlaying.asReadonly();
  }

  setIsAudioPlaying(value: boolean) {
    this.#isAudioPlaying.set(value);
  }

  initializeSentence(sentenceId: number): Signal<DataState<Sentence>> {
    const newSignal = signal<DataState<Sentence>>(createInitialState());
    this.#sentenceMap.put(sentenceId, newSignal);
    return newSignal.asReadonly();
  }

  getSentence(sentenceId: number): Signal<DataState<Sentence>> | null {
    if (!this.#sentenceMap.has(sentenceId)) return null;
    return this.#sentenceMap.get(sentenceId)!.asReadonly();
  }

  setSentence(sentenceId: number, value: Partial<DataState<Sentence>>): void {
    if (!this.#sentenceMap.has(sentenceId)) {
      this.initializeSentence(sentenceId);
    } else {
      this.#sentenceMap.get(sentenceId)!.update((current) => ({ ...current, ...value }));
    }
  }

  initializeSentenceCount(sentenceId: number): Signal<DataState<number>> {
    const newSignal = signal<DataState<number>>(createInitialState());
    this.#sentenceCountMap.put(sentenceId, newSignal);
    return newSignal.asReadonly();
  }

  getSentenceCount(sentenceId: number): Signal<DataState<number>> | null {
    if (!this.#sentenceCountMap.has(sentenceId)) return null;
    return this.#sentenceCountMap.get(sentenceId)!.asReadonly();
  }

  setSentenceCount(sentenceId: number, value: Partial<DataState<number>>): void {
    if (!this.#sentenceCountMap.has(sentenceId)) {
      this.initializeSentenceCount(sentenceId);
    } else {
      this.#sentenceCountMap.get(sentenceId)!.update((current) => ({ ...current, ...value }));
    }
  }

  incrementSentenceCount(sentenceId: number): void {
    if (!this.#sentenceCountMap.has(sentenceId)) {
      this.initializeSentenceCount(sentenceId);
    } else {
      this.#sentenceCountMap
        .get(sentenceId)!
        .update((current) => ({ ...current, value: (current.value ?? 0) + 1 }));
      this.#totalSentenceCount.update((current) => ({
        ...current,
        value: (current.value ?? 0) + 1,
      }));
    }
  }

  initializeAudio(setenceId: number): Signal<DataState<string>> {
    const newAudio = signal<DataState<string>>(createInitialState());
    this.#audioCache.put(setenceId, newAudio);
    return newAudio.asReadonly();
  }

  getAudio(setenceId: number): Signal<DataState<string>> | null {
    if (!this.#audioCache.has(setenceId)) return null;
    return this.#audioCache.get(setenceId)!.asReadonly();
  }

  setAudio(setenceId: number, value: Partial<DataState<string>>): void {
    if (!this.#audioCache.has(setenceId)) {
      this.initializeAudio(setenceId);
    } else {
      this.#audioCache.get(setenceId)!.update((current) => ({ ...current, ...value }));
    }
  }

  private courseConfigKey(language: string, accent: string): string {
    return `${language.toLowerCase()}/${accent.toLowerCase()}`;
  }

  initializeCourseConfig(language: string, accent: string): Signal<DataState<CourseConfig>> {
    const newCourseConfig = signal<DataState<CourseConfig>>(createInitialState());
    this.#courseConfig.put(this.courseConfigKey(language, accent), newCourseConfig);
    return newCourseConfig.asReadonly();
  }

  getCourseConfig(language: string, accent: string): Signal<DataState<CourseConfig>> | null {
    if (!this.#courseConfig.has(this.courseConfigKey(language, accent))) return null;
    return this.#courseConfig.get(this.courseConfigKey(language, accent))!.asReadonly();
  }

  setCourseConfig(language: string, accent: string, value: Partial<DataState<CourseConfig>>): void {
    if (!this.#courseConfig.has(this.courseConfigKey(language, accent))) {
      this.initializeCourseConfig(language, accent);
    } else {
      this.#courseConfig
        .get(this.courseConfigKey(language, accent))!
        .update((current) => ({ ...current, ...value }));
    }
  }
}
