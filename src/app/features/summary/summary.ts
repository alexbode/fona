import { Component, inject, input, OnInit, computed, Signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AppRoutesHelper } from '@app/app.routes';
import { DataService } from '@core/services/data.service';
import { DataState } from '@core/models/state';
import { CourseConfig } from '@core/models/config';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { HlmIcon } from '@spartan-ng/helm/icon';
import { lucideChevronRight } from '@ng-icons/lucide';

export interface SummaryData {
  reps: number;
  total: number;
  accent: string;
  mode?: 'chorus' | 'pairs' | 'pairs_quiz' | 'chorus_focus';
  correct?: number;
  streak?: number;
  ipa?: string;
  incorrectPairs?: {
    ipaA: string;
    ipaB: string;
    correct: number;
    total: number;
  }[];
}

import { ButtonDirective } from '@app/directive/button';
import { HlmCardImports } from '@spartan-ng/helm/card';

@Component({
  selector: 'app-summary',
  imports: [ButtonDirective, HlmCardImports, RouterLink, NgIcon, HlmIcon],
  providers: [
    provideIcons({
      lucideChevronRight,
    }),
  ],
  templateUrl: './summary.html',
})
export class Summary implements OnInit {
  protected readonly AppRoutesHelper = AppRoutesHelper;
  private readonly router = inject(Router);
  private readonly dataService = inject(DataService);

  readonly language = input.required<string>();
  readonly accent = input.required<string>();

  // State
  protected data: SummaryData = {
    reps: 0,
    total: 0,
    accent: '',
  };

  protected message = '';

  ngOnInit() {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as SummaryData | undefined;

    // Fallback to reading from session/history state if navigated directly
    const historyState = history.state as SummaryData | undefined;

    if (state && state.accent) {
      this.data = state;
    } else if (historyState && historyState.accent) {
      this.data = historyState;
    } else {
      // General fallbacks
      this.data = {
        reps: 0,
        total: 20,
        accent: this.accent(),
      };
    }

    const messages = [
      'Solid session. Muscle memory builds rep by rep.',
      'Your mouth is learning faster than your brain thinks.',
      'Keep showing up. Accent change is cumulative.',
    ];

    this.message = messages[Math.floor(Math.random() * messages.length)];
  }

  config: Signal<DataState<CourseConfig>> = computed(() => {
    const lang = this.language();
    const acc = this.accent();
    return this.dataService.getCourseConfig(lang, acc)();
  });

  chorusCumulativeReps = computed(() => {
    return this.data.reps;
  });

  title = computed(() => {
    if (this.data.mode === 'pairs_quiz') {
      return 'Minimal Pairs Quiz';
    }
    if (this.data.mode === 'pairs') {
      return 'Minimal Pairs';
    }
    if (this.data.mode === 'chorus_focus') {
      return this.data.ipa ? `Chorus Focus (/${this.data.ipa}/)` : 'Chorus Focus';
    }
    return 'Chorusing';
  });

  isPairsQuiz = computed(() => {
    return this.data.mode === 'pairs_quiz';
  });

  accuracyPercentage = computed(() => {
    if (this.data.correct === undefined || this.data.total === 0) return 0;
    return Math.round((this.data.correct / this.data.total) * 100);
  });

  streakValue = computed(() => {
    return this.data.streak ?? 0;
  });

  getPairIndex(ipaA: string, ipaB: string): number | null {
    const cfg = this.config().value;
    if (!cfg || !cfg.pairs) return null;
    const index = cfg.pairs.findIndex(
      (p) =>
        (p.ipa_a === ipaA && p.ipa_b === ipaB) ||
        (p.ipa_a === ipaB && p.ipa_b === ipaA),
    );
    return index !== -1 ? index + 1 : null;
  }

  onGoAgain() {
    if (this.data.mode === 'pairs_quiz') {
      this.router.navigate(AppRoutesHelper.getPairsQuizRoute(this.language(), this.accent()));
      return;
    }
    if (this.data.mode === 'pairs') {
      this.router.navigate(AppRoutesHelper.getPairsSelectionRoute(this.language(), this.accent()));
      return;
    }
    if (this.data.mode === 'chorus_focus') {
      if (this.data.ipa) {
        this.router.navigate(
          AppRoutesHelper.getChorusDashboardRoute(this.language(), this.accent()),
          { queryParams: { ipa: this.data.ipa } },
        );
      } else {
        this.router.navigate(
          AppRoutesHelper.getChorusFocusSelectionRoute(this.language(), this.accent()),
        );
      }
      return;
    }
    this.router.navigate(AppRoutesHelper.getChorusDashboardRoute(this.language(), this.accent()));
  }

  onHome() {
    this.router.navigate(AppRoutesHelper.getLanguagesRoute());
  }
}
