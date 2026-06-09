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
  protected readonly sentenceId = input.required<string>();
  private readonly maxSentenceId = 20;
  protected firstLoadCount = signal<number>(0);

  constructor() {
    effect(() => {
      const firstChorusCount = this.chorusCountResource;
      if (this.firstLoadCount() === 0 && firstChorusCount.hasValue()) {
        this.firstLoadCount.set(firstChorusCount.value()?.valueOf()!);
        console.log("asdasd", this.firstLoadCount());
      }
    });
  }

  previousSentence() {
    if (Number(this.sentenceId()) > 1) {
      this.router.navigate([this.language(), this.accent(), Number(this.sentenceId()) - 1]);
      this.router.navigate([this.language(), this.accent(), Number(this.sentenceId()) - 1]);
    }
  }

  nextSentence() {
    if (Number(this.sentenceId()) < this.maxSentenceId) {
      this.router.navigate([this.language(), this.accent(), Number(this.sentenceId()) + 1]);
    }
  }

  disablePreviousButton() {
    return Number(this.sentenceId()) === 1;
  }

  disableNextButton() {
    return Number(this.sentenceId()) === this.maxSentenceId;
  }

  chorusCountResource = resource({
    params: () => ({
      lang: this.language(),
      acc: this.accent(),
      id: this.sentenceId(),
      _refresh: this.dataService.sentenceCountUpdateTrigger(),
    }),
    loader: async ({ params }) => {
      if (!params.lang || !params.acc || !params.id) return null;
      return await this.dataService.getSentenceCount(params.lang, params.acc, params.id);
    },
  });

  resetTempCount() {
    this.firstLoadCount.set(0);
  }

  sessionCount = computed(
    () => (this.chorusCountResource.value() ?? 0) - (this.firstLoadCount() ?? 0),
  );
}
