import { Component, Signal, input, inject, computed, effect } from '@angular/core';
import { LoggingService } from '@core/services/logging.service';
import { DataService } from '@core/services/data.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { FormsModule } from '@angular/forms';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CourseConfig } from '@app/core/models/config';
import { DataState } from '@app/core/models/state';
import { HlmButtonImports } from '@spartan-ng/helm/button';

@Component({
  selector: 'app-audio-player',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonToggleModule,
    FormsModule,
    MatProgressBarModule,
    HlmButtonImports,
  ],
  templateUrl: './audio-player.html',
  styleUrl: './audio-player.scss',
})
export class AudioPlayer {
  // Inputs
  readonly language = input.required<string>();
  readonly accent = input.required<string>();
  readonly sentenceId = input.required<number | null>();
  readonly loop = input<boolean>(true);
  readonly playbackSpeed = input<string>('100');

  // Services
  readonly dataService = inject(DataService);
  private readonly logger = inject(LoggingService);

  // Signals
  readonly isAudioPlaying = this.dataService.isAudioPlaying;

  // State
  private audio = new Audio();

  constructor() {
    effect(() => {
      const id = this.sentenceId();
      this.audioResource();
      this.stopAudio();
    });

    effect(() => {
      const speed = this.playbackSpeed();
      if (this.audio) {
        this.audio.playbackRate = parseInt(speed, 10) / 100;
      }
    });
  }

  ngOnDestroy(): void {
    this.audio.pause();
    this.stopAudio();
  }

  config: Signal<DataState<CourseConfig>> = computed(() => {
    const lang = this.language();
    const acc = this.accent();
    return this.dataService.getCourseConfig(lang, acc)();
  });

  audioResource: Signal<DataState<string>> = computed(() => {
    const id = this.sentenceId();
    if (!id) return { value: null, isLoading: true, error: null };
    return this.dataService.getAudio(id)();
  });

  private handleAudioEnded = () => {
    this.logger.debug('audio-player.ts handleAudioEnded');
    this.dataService.setIsAudioPlaying(false);
    this.incrementCounter();
    if (this.loop()) {
      this.playAudio();
    }
  };

  playAudio() {
    this.logger.debug('audio-player.ts playAudio');

    const audioState = this.audioResource();
    if (audioState.isLoading || !audioState.value) {
      this.logger.debug('Audio is not ready to play yet.');
      return;
    }

    if (!this.isAudioPlaying()) {
      this.audio = new Audio(audioState.value);

      this.audio.currentTime = 0;
      this.audio.onended = this.handleAudioEnded;
      this.audio.playbackRate = parseInt(this.playbackSpeed(), 10) / 100;

      this.audio
        .play()
        .then(() => {
          this.dataService.setIsAudioPlaying(true);
        })
        .catch((err) => {
          this.logger.error('Failed to play audio:', err);
          this.dataService.setIsAudioPlaying(false);
        });
    }
  }

  pauseAudio() {
    this.logger.debug('audio-player.ts pauseAudio');
    this.audio.pause();
    this.dataService.setIsAudioPlaying(false);
  }

  stopAudio() {
    this.logger.debug('audio-player.ts stopAudio');
    this.audio.pause();
    this.audio.currentTime = 0;
    this.dataService.setIsAudioPlaying(false);
  }

  incrementCounter() {
    const sentenceId = this.sentenceId();
    if (sentenceId) {
      this.dataService.incrementSentenceCount(sentenceId, true);
    }
  }

  protected onSpaceBar() {
    if (this.isAudioPlaying()) {
      this.pauseAudio();
    } else {
      this.playAudio();
    }
  }
}
