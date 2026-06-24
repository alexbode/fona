import {
  Component,
  input,
  inject,
  signal,
  effect,
  computed,
  Signal,
  viewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { DecimalPipe, TitleCasePipe } from '@angular/common';
import { AudioPlayer } from '@app/shared/audio-player/audio-player';
import { DataService } from '@core/services/data.service';
import { AppRoutesHelper } from '@app/app.routes';
import { DataState } from '@app/core/models/state';
import { CourseConfig } from '@app/core/models/config';
import { Sentence } from '@core/models/sentence';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { HlmIcon } from '@spartan-ng/helm/icon';
import { lucideChevronLeft, lucideBookOpen } from '@ng-icons/lucide';
import { HlmCardImports } from '@spartan-ng/helm/card';
import { HlmBreadcrumbImports } from '@spartan-ng/helm/breadcrumb';

import { ButtonDirective } from '@app/directive/button';
import { HlmSkeleton } from '@spartan-ng/helm/skeleton';

@Component({
  selector: 'app-chorus-dashboard',
  imports: [
    AudioPlayer,
    HlmButtonImports,
    ButtonDirective,
    NgIcon,
    HlmIcon,
    DecimalPipe,
    TitleCasePipe,
    HlmCardImports,
    HlmBreadcrumbImports,
    HlmSkeleton,
  ],
  providers: [
    provideIcons({
      lucideChevronLeft,
      lucideBookOpen,
    }),
  ],
  templateUrl: './chorus-dashboard.html',
  styleUrl: './chorus-dashboard.scss',
  host: {
    '(window:keydown.arrowleft)': 'previousSentence()',
    '(window:keydown.arrowright)': 'nextSentence()',
  },
})
export class ChorusDashboard {
  protected readonly AppRoutesHelper = AppRoutesHelper;
  protected readonly dataService = inject(DataService);
  private readonly router = inject(Router);

  readonly language = input.required<string>();
  readonly accent = input.required<string>();
  readonly ipa = input<string>(); // Bind query parameter 'ipa'

  // Internal state
  readonly sentencesInSession = signal<number[]>([]);
  readonly sentenceIndex = signal<number>(1);
  readonly sessionInitialized = signal<boolean>(false);

  // Fetch language list to resolve native accent name
  readonly languagesState = this.dataService.getLanguageList();

  readonly languageObj = computed(() => {
    const langs = this.languagesState().value;
    if (!langs) return null;
    const pathLang = this.language()?.toLowerCase();
    return langs.find((l) => l.name.toLowerCase() === pathLang) || null;
  });

  readonly accentObj = computed(() => {
    const lang = this.languageObj();
    if (!lang) return null;
    const pathAccent = this.accent()?.toLowerCase();
    return lang.accents.find((a) => a.name.toLowerCase() === pathAccent) || null;
  });

  // Query headless audio player child component
  readonly audioPlayer = viewChild<AudioPlayer>(AudioPlayer);

  protected readonly playbackSpeed = signal<string>('100');

  setSpeed(speed: string) {
    this.playbackSpeed.set(speed);
  }

  protected readonly sessionCount = signal<number>(0);
  protected readonly cumulativeReps = signal<number>(0);
  private trackedSentenceId: number = -1;

  constructor() {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as { cumulativeReps?: number } | undefined;
    this.cumulativeReps.set(state?.cumulativeReps ?? 0);

    effect(() => {
      const config = this.config().value;
      const targetIpa = this.ipa();
      if (!config || !config.chorus || !config.chorus.sentences || this.sessionInitialized()) {
        return;
      }

      if (targetIpa) {
        // Chorus Focus mode: Wait for all sentences to load, then filter by IPA symbol
        const allLoaded = config.chorus.sentences.every(
          (id) => !this.dataService.getSentence(id)().isLoading,
        );
        if (allLoaded) {
          const matchingIds = config.chorus.sentences.filter((id) => {
            const s = this.dataService.getSentence(id)().value;
            return s && s.ipa && s.ipa.includes(targetIpa);
          });
          this.sentencesInSession.set(matchingIds);
          this.sessionInitialized.set(true);
        }
      } else {
        // Standard Chorusing mode: Pick 10 random sentences
        const indices = new Set<number>();
        const totalSentences = config.chorus.sentences.length;
        const limit = Math.min(10, totalSentences);
        while (indices.size < limit) {
          indices.add(Math.floor(Math.random() * totalSentences));
        }
        const sentenceToAddToSession: number[] = Array.from(indices).map(
          (index) => config.chorus.sentences[index],
        );
        this.sentencesInSession.set(sentenceToAddToSession);
        this.sessionInitialized.set(true);
      }
    });

    effect(() => {
      const count = this.sentenceCount().value;
      const isLoading = this.sentenceCount().isLoading;
      const currentSentenceId = this.sentenceId();
      if (isLoading || count === null || count === undefined || !currentSentenceId) {
        return;
      }
      if (this.trackedSentenceId !== currentSentenceId) {
        this.sessionCount.set(0);
        this.trackedSentenceId = currentSentenceId; // Mark this sentence as initialized
      } else {
        this.sessionCount.update((v) => v + 1);
      }
    });
  }

  config: Signal<DataState<CourseConfig>> = computed(() => {
    const lang = this.language();
    const acc = this.accent();
    return this.dataService.getCourseConfig(lang, acc)();
  });

  sentenceId: Signal<number | null> = computed(() => {
    const sentences = this.sentencesInSession();
    if (sentences.length === 0) return null;
    return sentences[this.sentenceIndex() - 1];
  });

  readonly numSentences = computed(() => this.sentencesInSession().length);

  sentence: Signal<DataState<Sentence>> = computed(() => {
    const id = this.sentenceId();
    if (!id) return { value: null, isLoading: true, error: null };
    return this.dataService.getSentence(id)();
  });

  sentenceText = computed(() => this.sentence().value?.text ?? '');
  sentenceIpa = computed(() => this.sentence().value?.ipa ?? '');
  sentencePinyin = computed(() => this.sentence().value?.pinyin ?? '');
  hasPinyin = computed(() => !!this.sentencePinyin());

  // Get total completed reps across all sentences
  allTimeRepsState = this.dataService.getTotalSentenceCount();
  allTimeReps = computed(() => this.allTimeRepsState().value ?? 0);

  previousSentence() {
    this.audioPlayer()?.stopAudio();
    if (this.sentenceIndex() > 1) {
      this.sentenceIndex.update((idx) => idx - 1);
    }
  }

  nextSentence() {
    this.audioPlayer()?.stopAudio();
    const nextCumulative = this.cumulativeReps() + this.sessionCount();
    if (this.sentenceIndex() < this.numSentences()) {
      this.cumulativeReps.set(nextCumulative);
      this.sentenceIndex.update((idx) => idx + 1);
    }
  }

  disablePreviousButton() {
    return this.sentenceIndex() === 1;
  }

  disableNextButton() {
    return this.sentenceIndex() === this.numSentences();
  }

  sentenceCount: Signal<DataState<number>> = computed(() => {
    const id = this.sentenceId();
    if (!id) return { value: null, isLoading: false, error: null };
    return this.dataService.getSentenceCount(id)();
  });

  handlePlay() {
    if (this.dataService.isAudioPlaying()) {
      this.audioPlayer()?.stopAudio();
    } else {
      this.audioPlayer()?.playAudio();
    }
  }

  handleNext() {
    this.audioPlayer()?.stopAudio();
    const nextCumulative = this.cumulativeReps() + this.sessionCount();
    if (this.sentenceIndex() < this.numSentences()) {
      this.cumulativeReps.set(nextCumulative);
      this.sentenceIndex.update((idx) => idx + 1);
    } else {
      this.router.navigate(AppRoutesHelper.getSummaryRoute(this.language(), this.accent()), {
        state: {
          mode: this.ipa() ? 'chorus_focus' : 'chorus',
          reps: nextCumulative,
          total: this.numSentences(),
          accent: this.accentObj()?.nativeName || this.accent(),
          ipa: this.ipa(),
        },
      });
    }
  }

  onIpa() {
    this.audioPlayer()?.stopAudio();
    this.router.navigate(AppRoutesHelper.getIpaRoute());
  }

  onBack() {
    this.audioPlayer()?.stopAudio();
    this.router.navigate(AppRoutesHelper.getModeSelectionRoute(this.language(), this.accent()));
  }
}
