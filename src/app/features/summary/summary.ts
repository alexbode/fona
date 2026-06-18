import { Component, inject, input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppRoutesHelper } from '@app/app.routes';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { HlmIcon } from '@spartan-ng/helm/icon';
import { lucideTrophy } from '@ng-icons/lucide';

export interface SummaryData {
  mode: 'chorusing' | 'minimal-pairs';
  reps: number;
  total: number;
  correct: number;
  streak: number;
  accent: string;
}

@Component({
  selector: 'app-summary',
  imports: [NgIcon, HlmIcon],
  providers: [
    provideIcons({
      lucideTrophy,
    }),
  ],
  templateUrl: './summary.html',
})
export class Summary implements OnInit {
  private readonly router = inject(Router);

  readonly language = input.required<string>();
  readonly accent = input.required<string>();

  // State
  protected data: SummaryData = {
    mode: 'chorusing',
    reps: 0,
    total: 0,
    correct: 0,
    streak: 0,
    accent: '',
  };

  protected isChorusing = true;
  protected accuracy = 0;
  protected message = '';

  ngOnInit() {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as SummaryData | undefined;

    // Fallback to reading from session/history state if navigated directly
    const historyState = history.state as SummaryData | undefined;

    if (state && state.mode) {
      this.data = state;
    } else if (historyState && historyState.mode) {
      this.data = historyState;
    } else {
      // General fallbacks
      this.data = {
        mode: 'chorusing',
        reps: 0,
        total: 20,
        correct: 0,
        streak: 0,
        accent: this.accent(),
      };
    }

    this.isChorusing = this.data.mode === 'chorusing';
    this.accuracy =
      this.data.total > 0 ? Math.round((this.data.correct / this.data.total) * 100) : 0;

    const messages = this.isChorusing
      ? [
          'Solid session. Muscle memory builds rep by rep.',
          'Your mouth is learning faster than your brain thinks.',
          'Keep showing up. Accent change is cumulative.',
        ]
      : this.accuracy >= 80
        ? [
            'Sharp ear. Minimal pairs are the hardest thing to train.',
            "You're developing phonemic categories. Keep going.",
            'Real progress. Your brain is rewiring.',
          ]
        : [
            "Tough sounds. That's the point. Come back tomorrow.",
            "These distinctions take time. You're in the right place.",
            'Ear training is a long game. Every rep counts.',
          ];

    this.message = messages[Math.floor(Math.random() * messages.length)];
  }

  onGoAgain() {
    if (this.isChorusing) {
      this.router.navigate(
        AppRoutesHelper.getChorusDashboardRoute(this.language(), this.accent(), 1),
      );
    } else {
      // Fallback for minimal pairs if implemented
      this.router.navigate(
        AppRoutesHelper.getPairsDashboardRoute(this.language(), this.accent(), 1, 1),
      );
    }
  }

  onHome() {
    this.router.navigate(AppRoutesHelper.getLanguagesRoute());
  }
}
