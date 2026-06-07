import { Component, input, inject, computed } from '@angular/core';
import { AudioPlayer } from '@features/dashboard/audio-player/audio-player';
import { SentenceText } from '@features/dashboard/sentence-text/sentence-text';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { DataService } from '@core/services/data.service';

@Component({
  standalone: true,
  selector: 'app-chorus-dashboard',
  imports: [MatButtonModule, MatIconModule, MatButtonToggleModule, AudioPlayer, SentenceText],
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

  chorusCount = computed(() =>
    this.dataService.getSentenceCount(this.language(), this.accent(), this.sentenceId())(),
  );
}