import { Component, inject, input, OnInit, computed, Signal } from '@angular/core';
import { Router } from '@angular/router';
import { AppRoutesHelper } from '@app/app.routes';
import { DataService } from '@core/services/data.service';
import { DataState } from '@core/models/state';
import { CourseConfig } from '@core/models/config';

export interface SummaryData {
  reps: number;
  total: number;
  accent: string;
  mode?: 'chorus' | 'pairs' | 'pairs_quiz';
  correct?: number;
  streak?: number;
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
  imports: [ButtonDirective, HlmCardImports],
  templateUrl: './summary.html',
})
export class Summary implements OnInit {
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

  onGoAgain() {
    if (this.data.mode === 'pairs_quiz') {
      this.router.navigate(AppRoutesHelper.getPairsQuizRoute(this.language(), this.accent()));
      return;
    }
    if (this.data.mode === 'pairs') {
      this.router.navigate(AppRoutesHelper.getPairsSelectionRoute(this.language(), this.accent()));
      return;
    }
    this.router.navigate(AppRoutesHelper.getChorusDashboardRoute(this.language(), this.accent()));
  }

  onHome() {
    this.router.navigate(AppRoutesHelper.getLanguagesRoute());
  }
}
