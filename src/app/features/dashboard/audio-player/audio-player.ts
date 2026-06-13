import { Component, Signal, input, inject, computed, signal, effect } from '@angular/core';
import { LoggingService } from '@core/services/logging.service';
import { MatButtonModule } from '@angular/material/button';
import { DataService } from '@core/services/data.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { FormsModule } from '@angular/forms';
import { AuthService } from '@core/services/auth.service';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CourseConfig } from '@app/core/models/config';
import { DataState } from '@app/core/models/state';
import { Data } from '@angular/router';

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
      this.audioResource();
      this.stopAudio();
    });
  }
  // configResource = resource({
  //   params: () => ({ language: this.language(), accent: this.accent() }),
  //   loader: async ({ params }) => {
  //     if (!params.language || !params.accent) return undefined;
  //     return await this.dataService.getCourseConfig(params.language, params.accent);
  //   },
  // });

  config: Signal<DataState<CourseConfig>> = computed(() => {
    const lang = this.language();
    const acc = this.accent();
    return this.dataService.getCourseConfig(lang, acc)();
  });

  sentenceId: Signal<number | null> = computed(() => {
    const config = this.config();
    if (!config.value || config.isLoading || config.error) return null;
    return config.value.chorus.sentences[parseInt(this.sentenceIndex(), 10) - 1];
  });

  audioResource: Signal<DataState<string>> = computed(() => {
    const id = this.sentenceId();
    if (!id) return { value: null, isLoading: true, error: null };
    return this.dataService.getAudio(id)();
  });

  private handleAudioEnded = () => {
    this.logger.debug('audio-player.ts handleAudioEnded');
    this.isPlaying.set(false);
    this.incrementCounter();
    this.playAudio();
  };

  playAudio() {
    this.logger.debug('audio-player.ts playAudio');

    const audioState = this.audioResource();
    if (audioState.isLoading || !audioState.value) {
      this.logger.debug('Audio is not ready to play yet.');
      return;
    }

    if (!this.isPlaying()) {
      this.audio = new Audio(audioState.value);

      this.audio.currentTime = 0;
      this.audio.onended = this.handleAudioEnded;
      this.audio.playbackRate = parseInt(this.playbackSpeed, 10) / 100;

      this.audio
        .play()
        .then(() => {
          this.isPlaying.set(true);
        })
        .catch((err) => {
          this.logger.error('Failed to play audio:', err);
          this.isPlaying.set(false);
        });
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
    const sentenceId = this.sentenceId();
    if (sentenceId) {
      this.dataService.incrementSentenceCount(sentenceId);
    }
  }

  protected onSpaceBar() {
    if (this.isPlaying()) {
      this.pauseAudio();
    } else {
      this.playAudio();
    }
  }
}
