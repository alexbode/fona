import { Component, input, inject, signal, resource, effect } from '@angular/core';
import { DataService } from '@core/services/data.service';
import { LoggingService } from '@core/services/logging.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { FormsModule } from '@angular/forms';
import { AuthService } from '@core/services/auth.service';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-audio-player',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatButtonToggleModule,
    FormsModule,
    MatProgressBarModule,
  ],
  templateUrl: './audio-player.html',
  styleUrl: './audio-player.scss',
  host: {
    '(document:keydown.space)': 'onSpaceBar()',
  },
})
export class AudioPlayer {
  // Inputs
  readonly language = input.required<string>();
  readonly accent = input.required<string>();
  readonly sentenceIndex = input.required<string>();

  // Services
  // private readonly counterService = inject(CounterService);
  protected readonly auth = inject(AuthService);
  private readonly dataService = inject(DataService);
  private readonly logger = inject(LoggingService);

  // Signals
  protected isPlaying = signal(false);

  // State
  private audio = new Audio();
  protected playbackSpeed = '100';

  constructor() {
    effect(() => {
      const id = this.sentenceIndex();
      this.stopAudio();
    });
  }

  audioResource = resource({
    params: () => ({ lang: this.language(), acc: this.accent(), id: this.sentenceIndex() }),

    loader: async ({ params }) => {
      if (!params.lang || !params.acc || !params.id) return undefined;
      this.logger.debug('audio-player.ts audioResource | params:', params);
      const url = await this.dataService.getPresignedUrl(params.lang, params.acc, params.id);
      return new Audio(url);
    },
  });

  private handleAudioEnded = () => {
    this.logger.debug('audio-player.ts handleAudioEnded');
    this.isPlaying.set(false);
    this.incrementCounter();
    this.playAudio();
  };

  playAudio() {
    this.logger.debug('audio-player.ts playAudio');
    if (!this.isPlaying()) {
      this.audio = this.audioResource.value() || new Audio('');
      if (this.audio.ended) {
        this.audio.currentTime = 0;
      }
      this.audio.onended = this.handleAudioEnded;
      this.audio.playbackRate = parseInt(this.playbackSpeed, 10) / 100;
      this.audio.play();
      this.isPlaying.set(true);
    }
  }

  pauseAudio() {
    this.logger.debug('audio-player.ts pauseAudio');
    this.audio.pause();
    this.isPlaying.set(false);
  }

  stopAudio() {
    this.logger.debug('audio-player.ts stopAudio');
    this.audio.pause();
    this.audio.currentTime = 0;
    this.isPlaying.set(false);
  }

  incrementCounter() {
    this.dataService.incrementSentenceCount(this.language(), this.accent(), this.sentenceIndex());
  }

  protected onSpaceBar() {
    if (this.isPlaying()) {
      this.pauseAudio();
    } else {
      this.playAudio();
    }
  }
}
