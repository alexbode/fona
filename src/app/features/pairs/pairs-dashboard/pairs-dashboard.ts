import {
  Component,
  input,
  inject,
  computed,
  Signal,
  signal,
  OnDestroy,
  viewChild,
  effect,
} from '@angular/core';
import { TitleCasePipe } from '@angular/common';
import { Router } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { HlmIcon } from '@spartan-ng/helm/icon';
import { lucideChevronLeft, lucideVolume2 } from '@ng-icons/lucide';
import { HlmBreadcrumbImports } from '@spartan-ng/helm/breadcrumb';
import { ButtonDirective } from '@app/directive/button';
import { HlmButtonImports } from '@spartan-ng/helm/button';

import { DataService } from '@core/services/data.service';
import { AppRoutesHelper } from '@app/app.routes';
import { CourseConfig, PairsConfig } from '@core/models/config';
import { DataState } from '@core/models/state';
import { AudioPlayer } from '@app/shared/audio-player/audio-player';

@Component({
  selector: 'app-pairs-dashboard',
  standalone: true,
  imports: [
    TitleCasePipe,
    HlmBreadcrumbImports,
    NgIcon,
    HlmIcon,
    ButtonDirective,
    HlmButtonImports,
    AudioPlayer,
  ],
  providers: [
    provideIcons({
      lucideChevronLeft,
      lucideVolume2,
    }),
  ],
  templateUrl: './pairs-dashboard.html',
  styleUrl: './pairs-dashboard.scss',
})
export class PairsDashboard implements OnDestroy {
  protected readonly AppRoutesHelper = AppRoutesHelper;
  protected readonly language = input.required<string>();
  protected readonly accent = input.required<string>();
  protected readonly pairIndex = input.required<number>();
  protected readonly exampleIndex = input.required<number>();

  private readonly dataService = inject(DataService);
  private readonly router = inject(Router);

  // Expose isAudioPlaying from service
  readonly isAudioPlaying = this.dataService.isAudioPlaying;

  // View children of audio players
  readonly playerA = viewChild<AudioPlayer>('playerA');
  readonly playerB = viewChild<AudioPlayer>('playerB');
  readonly playerSentence = viewChild<AudioPlayer>('playerSentence');

  // Active playing key for tracking loader
  readonly playingKey = signal<string | null>(null);

  // Fetch language list state
  readonly languagesState = this.dataService.getLanguageList();

  constructor() {
    effect(() => {
      if (!this.isAudioPlaying()) {
        this.playingKey.set(null);
      }
    });
  }

  // Find selected language object
  readonly languageObj = computed(() => {
    const langs = this.languagesState().value;
    if (!langs) return null;
    const pathLang = this.language()?.toLowerCase();
    return langs.find((l) => l.name.toLowerCase() === pathLang) || null;
  });

  // Find selected accent object
  readonly accentObj = computed(() => {
    const lang = this.languageObj();
    if (!lang) return null;
    const pathAccent = this.accent()?.toLowerCase();
    return lang.accents.find((a) => a.name.toLowerCase() === pathAccent) || null;
  });

  config: Signal<DataState<CourseConfig>> = computed(() => {
    const lang = this.language();
    const acc = this.accent();
    return this.dataService.getCourseConfig(lang, acc)();
  });

  pairs = computed(() => this.config().value?.pairs ?? []);

  pair = computed(() => {
    const pairs = this.pairs();
    if (pairs.length > 0) {
      return pairs[this.pairIndex() - 1] as PairsConfig;
    } else {
      return {} as PairsConfig;
    }
  });

  numExamples = computed(() => this.pair()?.num_examples ?? 0);

  // Word A & B Sentences
  readonly wordASentence = computed(() => {
    const id = this.wordAId();
    return id ? this.dataService.getSentence(id)() : { value: null, isLoading: true, error: null };
  });
  readonly wordBSentence = computed(() => {
    const id = this.wordBId();
    return id ? this.dataService.getSentence(id)() : { value: null, isLoading: true, error: null };
  });

  readonly wordAText = computed(() => this.wordASentence().value?.text ?? '');
  readonly wordBText = computed(() => this.wordBSentence().value?.text ?? '');

  wordAId = computed(() => {
    const ids = this.pair()?.words_a ?? [];
    const idx = this.exampleIndex() - 1;
    return ids.length > idx ? parseInt(ids[idx], 10) : 0;
  });
  wordBId = computed(() => {
    const ids = this.pair()?.words_b ?? [];
    const idx = this.exampleIndex() - 1;
    return ids.length > idx ? parseInt(ids[idx], 10) : 0;
  });

  // Context Sentence
  readonly sentenceId = computed(() => {
    const ids = this.pair()?.sentences ?? [];
    const idx = this.exampleIndex() - 1;
    return ids.length > idx ? parseInt(ids[idx] as any, 10) : 0;
  });
  readonly sentenceObj = computed(() => {
    const id = this.sentenceId();
    return id ? this.dataService.getSentence(id)() : { value: null, isLoading: true, error: null };
  });

  sentenceWords = computed(() => {
    const text = this.sentenceObj().value?.text ?? '';
    const wordA = this.wordAText().toLowerCase();
    const wordB = this.wordBText().toLowerCase();

    return text.split(' ').map((w) => {
      const clean = w.toLowerCase().replace(/[.,!?。]/g, '');
      const isA = clean === wordA;
      const isB = clean === wordB;
      return {
        original: w,
        isA,
        isB,
      };
    });
  });

  private getPlayerByKey(key: string): AudioPlayer | undefined {
    if (key === 'word-a') return this.playerA();
    if (key === 'word-b') return this.playerB();
    if (key === 'sentence') return this.playerSentence();
    return undefined;
  }

  playWord(key: string) {
    const player = this.getPlayerByKey(key);
    if (this.playingKey() === key && this.isAudioPlaying()) {
      player?.stopAudio();
      this.playingKey.set(null);
      return;
    }

    this.stopAudio();
    this.playingKey.set(key);
    player?.playAudio();
  }

  stopAudio() {
    this.playerA()?.stopAudio();
    this.playerB()?.stopAudio();
    this.playerSentence()?.stopAudio();
    this.playingKey.set(null);
  }

  ngOnDestroy() {
    this.stopAudio();
  }

  previousExample() {
    this.router.navigate(
      AppRoutesHelper.getPairsDashboardRoute(
        this.language(),
        this.accent(),
        this.pairIndex(),
        this.exampleIndex() - 1,
      ),
    );
  }

  handleNext() {
    if (this.exampleIndex() < this.numExamples()) {
      this.router.navigate(
        AppRoutesHelper.getPairsDashboardRoute(
          this.language(),
          this.accent(),
          this.pairIndex(),
          Number(this.exampleIndex()) + 1,
        ),
      );
    } else {
      this.router.navigate(AppRoutesHelper.getSummaryRoute(this.language(), this.accent()));
    }
  }

  onBack() {
    this.router.navigate(AppRoutesHelper.getPairsSelectionRoute(this.language(), this.accent()));
  }
}
