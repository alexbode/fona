import { Component, input, inject, signal, resource, effect, computed } from '@angular/core';
import { AudioPlayer } from '@features/dashboard/audio-player/audio-player';
import { SentenceText } from '@features/dashboard/sentence-text/sentence-text';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { DataService } from '@core/services/data.service';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  standalone: true,
  selector: 'app-chorus-dashboard',
  imports: [
    MatButtonModule,
    MatIconModule,
    MatButtonToggleModule,
    AudioPlayer,
    SentenceText,
    MatCardModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './chorus-dashboard.html',
  styleUrl: './chorus-dashboard.scss',
  host: {
    '(window:keydown.arrowleft)': 'previousSentence()',
    '(window:keydown.arrowright)': 'nextSentence()',
  },
})
export class ChorusDashboard {
  protected dataService = inject(DataService);
  private router = inject(Router);

  protected readonly language = input.required<string>();
  protected readonly accent = input.required<string>();
  protected readonly sentenceIndex = input.required<string>();

  protected sessionCount = signal<number>(0);
  private trackedSentenceId: number = -1;

  constructor() {
    effect(() => {
      const count = this.sentenceCountResource.value();
      const isLoading = this.sentenceCountResource.isLoading();
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

  configResource = resource({
    params: () => ({ language: this.language(), accent: this.accent() }),
    loader: async ({ params }) => {
      if (!params.language || !params.accent) return undefined;
      return await this.dataService.getCourseConfig(params.language, params.accent);
    },
  });

  sentenceId = computed(() => {
    const config = this.configResource.value();
    if (config) return config.chorus.sentences[parseInt(this.sentenceIndex(), 10) - 1];
    return undefined;
  });

  numSentences = computed(() => {
    const config = this.configResource.value();
    if (config) {
      return config.chorus.sentences.length;
    }
    return 0;
  });

  previousSentence() {
    if (Number(this.sentenceIndex()) > 1) {
      this.router.navigate([this.language(), this.accent(), Number(this.sentenceIndex()) - 1]);
      this.router.navigate([this.language(), this.accent(), Number(this.sentenceIndex()) - 1]);
    }
  }

  nextSentence() {
    if (Number(this.sentenceIndex()) < this.numSentences()) {
      this.router.navigate([this.language(), this.accent(), Number(this.sentenceIndex()) + 1]);
    }
  }

  disablePreviousButton() {
    return Number(this.sentenceIndex()) === 1;
  }

  disableNextButton() {
    return Number(this.sentenceIndex()) === this.numSentences();
  }

  sentenceCountResource = resource({
    params: () => ({
      id: this.sentenceId(),
      _refresh: this.dataService.sentenceCountUpdateTrigger(),
    }),
    loader: async ({ params }) => {
      if (!params.id) return null;
      return await this.dataService.getSentenceCount(params.id);
    },
  });

  resetSessionCount() {
    this.sessionCount.set(0);
  }
}
