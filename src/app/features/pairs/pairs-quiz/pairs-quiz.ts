import {
  Component,
  inject,
  computed,
  input,
  Signal,
  signal,
  effect,
  viewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { TitleCasePipe } from '@angular/common';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { HlmIcon } from '@spartan-ng/helm/icon';
import {
  lucideChevronLeft,
  lucideVolume2,
  lucideCheckCircle,
  lucideXCircle,
  lucideBookOpen,
} from '@ng-icons/lucide';
import { DataService } from '@core/services/data.service';
import { AppRoutesHelper } from '@app/app.routes';
import { CourseConfig, PairsQuizConfig } from '@core/models/config';
import { HlmBreadcrumbImports } from '@spartan-ng/helm/breadcrumb';
import { ButtonDirective } from '@app/directive/button';
import { AudioPlayer } from '@app/shared/audio-player/audio-player';

interface QuizPair {
  config: PairsQuizConfig;
  answer: 'A' | 'B';
  wordA: number;
  wordB: number;
}

@Component({
  selector: 'app-pairs-quiz',
  imports: [NgIcon, HlmIcon, TitleCasePipe, HlmBreadcrumbImports, ButtonDirective, AudioPlayer],
  providers: [
    provideIcons({
      lucideChevronLeft,
      lucideVolume2,
      lucideCheckCircle,
      lucideXCircle,
      lucideBookOpen,
    }),
  ],
  templateUrl: './pairs-quiz.html',
})
export class PairsQuiz {
  protected readonly AppRoutesHelper = AppRoutesHelper;
  private readonly router = inject(Router);
  private readonly dataService = inject(DataService);

  readonly languageName = input.required<string>({ alias: 'language' });
  readonly accentName = input.required<string>({ alias: 'accent' });

  // View children of audio players
  readonly playerA = viewChild<AudioPlayer>('playerA');
  readonly playerB = viewChild<AudioPlayer>('playerB');
  readonly isAudioPlaying = this.dataService.isAudioPlaying;

  // Fetch language list state
  readonly languagesState = this.dataService.getLanguageList();

  // Find selected language object
  readonly languageObj = computed(() => {
    const langs = this.languagesState().value;
    if (!langs) return null;
    const pathLang = this.languageName()?.toLowerCase();
    return langs.find((l) => l.name.toLowerCase() === pathLang) || null;
  });

  // Find selected accent object
  readonly accentObj = computed(() => {
    const lang = this.languageObj();
    if (!lang) return null;
    const pathAccent = this.accentName()?.toLowerCase();
    return lang.accents.find((a) => a.name.toLowerCase() === pathAccent) || null;
  });

  readonly configState = computed(() => {
    const lang = this.languageName();
    const acc = this.accentName();
    return this.dataService.getCourseConfig(lang, acc)();
  });

  // Quiz state
  readonly quizPairs = signal<QuizPair[]>([]);
  readonly pairIdx = signal<number>(0);
  readonly selected = signal<'A' | 'B' | null>(null);
  readonly correctCount = signal<number>(0);
  readonly currentStreak = signal<number>(0);
  readonly bestStreak = signal<number>(0);

  constructor() {
    effect(() => {
      const config = this.configState().value;
      if (config && config.pairsQuiz && this.quizPairs().length === 0) {
        // Select up to 10 random pairs from config.pairsQuiz
        const shuffled = [...config.pairsQuiz].sort(() => Math.random() - 0.5);
        const selectedList: QuizPair[] = shuffled.slice(0, 10).map((p) => {
          const answer: 'A' | 'B' = Math.random() < 0.5 ? 'A' : 'B';
          return {
            config: p,
            answer,
            wordA: p.word_a,
            wordB: p.word_b,
          };
        });
        this.quizPairs.set(selectedList);

        // Pre-fetch all sentences and audio files in parallel immediately
        console.log('asdasd', selectedList);
        for (const pair of selectedList) {
          this.dataService.getSentence(pair.wordA);
          this.dataService.getSentence(pair.wordB);
          this.dataService.getAudio(pair.wordA);
          this.dataService.getAudio(pair.wordB);
        }
      }
    });
  }

  readonly currentQuizPair = computed(() => {
    const list = this.quizPairs();
    const idx = this.pairIdx();
    return list.length > idx ? list[idx] : null;
  });

  readonly isSentenceLoading = computed(() => {
    const pair = this.currentQuizPair();
    if (!pair) return true;
    const a = this.dataService.getSentence(pair.wordA)();
    const b = this.dataService.getSentence(pair.wordB)();
    return a.isLoading || b.isLoading;
  });

  readonly wordASentence = computed(() => {
    const pair = this.currentQuizPair();
    if (!pair) return null;
    return this.dataService.getSentence(pair.wordA)().value;
  });

  readonly wordBSentence = computed(() => {
    const pair = this.currentQuizPair();
    if (!pair) return null;
    return this.dataService.getSentence(pair.wordB)().value;
  });

  readonly wordAId = computed(() => this.currentQuizPair()?.wordA ?? null);
  readonly wordBId = computed(() => this.currentQuizPair()?.wordB ?? null);

  readonly focusNote = computed(() => {
    const pair = this.currentQuizPair();
    if (!pair) return '';
    return `/${pair.config.ipa_a}/ vs /${pair.config.ipa_b}/`;
  });

  readonly activeSentenceId = computed(() => {
    const pair = this.currentQuizPair();
    if (!pair) return null;
    return pair.answer === 'A' ? pair.wordA : pair.wordB;
  });

  readonly progressPercent = computed(() => {
    const total = this.quizPairs().length;
    if (total === 0) return 0;
    return ((this.pairIdx() + 1) / total) * 100;
  });

  readonly accuracyDisplay = computed(() => {
    const idx = this.pairIdx();
    if (idx === 0) return '—';
    return `${Math.round((this.correctCount() / idx) * 100)}%`;
  });

  readonly playButtonText = computed(() => {
    if (this.isAudioPlaying()) return 'Playing…';
    if (this.selected() !== null) return 'Already heard';
    return 'Hear it';
  });

  // Word option buttons helper calculations
  choiceCorrect(choice: string): boolean {
    const pair = this.currentQuizPair();
    return !!pair && pair.answer === choice;
  }

  choiceIncorrect(choice: string): boolean {
    const sel = this.selected();
    const pair = this.currentQuizPair();
    return !!sel && !!pair && sel === choice && pair.answer !== choice;
  }

  // Result panel style/text helpers
  readonly isCurrentChoiceCorrect = computed(() => {
    const sel = this.selected();
    const pair = this.currentQuizPair();
    return !!sel && !!pair && sel === pair.answer;
  });

  readonly resultText = computed(() => {
    const correct = this.isCurrentChoiceCorrect();
    const pair = this.currentQuizPair();
    if (!pair) return '';
    const correctWordText =
      pair.answer === 'A' ? this.wordASentence()?.text : this.wordBSentence()?.text;
    return correct ? '✓ Correct.' : `✗ The answer was ${correctWordText}.`;
  });

  handlePlay() {
    const pair = this.currentQuizPair();
    if (!pair) return;
    if (pair.answer === 'A') {
      this.playerA()?.playAudio();
    } else {
      this.playerB()?.playAudio();
    }
  }

  playChoiceAudio(choice: string) {
    if (choice === 'A') {
      this.playerA()?.playAudio();
    } else {
      this.playerB()?.playAudio();
    }
  }

  handleCardClick(choice: string) {
    if (this.selected() === null) {
      this.handleSelect(choice);
    } else {
      this.playChoiceAudio(choice);
    }
  }

  readonly outcomes = signal<{ ipaA: string; ipaB: string; wasCorrect: boolean }[]>([]);

  handleSelect(choice: string) {
    if (this.selected() !== null) return;
    const validatedChoice = choice === 'A' || choice === 'B' ? choice : 'A';
    this.selected.set(validatedChoice);
    const pair = this.currentQuizPair();
    if (!pair) return;
    const wasCorrect = validatedChoice === pair.answer;
    if (wasCorrect) {
      this.correctCount.set(this.correctCount() + 1);
      const nextStreak = this.currentStreak() + 1;
      this.currentStreak.set(nextStreak);
      this.bestStreak.set(Math.max(this.bestStreak(), nextStreak));
    } else {
      this.currentStreak.set(0);
    }
    this.outcomes.update((prev) => [
      ...prev,
      {
        ipaA: pair.config.ipa_a,
        ipaB: pair.config.ipa_b,
        wasCorrect,
      },
    ]);
  }

  handleNext() {
    if (this.pairIdx() < this.quizPairs().length - 1) {
      this.pairIdx.set(this.pairIdx() + 1);
      this.selected.set(null);
    } else {
      // Group outcomes by contrast
      const contrastMap = new Map<
        string,
        { ipaA: string; ipaB: string; total: number; correct: number }
      >();
      for (const outcome of this.outcomes()) {
        const key = `/${outcome.ipaA}/ vs /${outcome.ipaB}/`;
        if (!contrastMap.has(key)) {
          contrastMap.set(key, {
            ipaA: outcome.ipaA,
            ipaB: outcome.ipaB,
            total: 0,
            correct: 0,
          });
        }
        const stats = contrastMap.get(key)!;
        stats.total++;
        if (outcome.wasCorrect) {
          stats.correct++;
        }
      }

      // Filter to only those contrasts where the user made at least one mistake
      const incorrectContrasts = Array.from(contrastMap.values())
        .filter((c) => c.correct < c.total)
        .map((c) => ({
          ipaA: c.ipaA,
          ipaB: c.ipaB,
          correct: c.correct,
          total: c.total,
        }));

      // Session complete: navigate to summary and pass the stats
      this.router.navigate(
        AppRoutesHelper.getSummaryRoute(this.languageName(), this.accentName()),
        {
          state: {
            mode: 'pairs_quiz',
            reps: this.quizPairs().length,
            total: this.quizPairs().length,
            correct: this.correctCount(),
            streak: this.bestStreak(),
            accent: this.accentObj()?.nativeName ?? this.accentName(),
            incorrectPairs: incorrectContrasts,
          },
        },
      );
    }
  }

  onIpa() {
    this.router.navigate(AppRoutesHelper.getIpaRoute());
  }
}
