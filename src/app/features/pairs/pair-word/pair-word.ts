import { Component, input, Signal, inject, computed, effect } from '@angular/core';
import { LoggingService } from '@core/services/logging.service';
import { DataService } from '@core/services/data.service';
import { DataState } from '@core/models/state';
import { Sentence } from '@core/models/sentence';
import { ButtonDirective } from '@app/directive/button';
import { HlmButtonImports } from '@spartan-ng/helm/button';

@Component({
  selector: 'app-pair-word',
  imports: [ButtonDirective, HlmButtonImports],
  templateUrl: './pair-word.html',
  styleUrl: './pair-word.scss',
})
export class PairWord {
  // Inputs
  wordKey = input.required<number>();

  // Services
  private logger = inject(LoggingService);
  private dataService = inject(DataService);

  // State
  private audio = new Audio();

  constructor() {
    effect(() => {
      const id = this.wordKey();
      this.audioResource();
      this.stopAudio();
    });
  }

  sentence: Signal<DataState<Sentence>> = computed(() => {
    const sentenceId = this.wordKey();

    // 1. Guard against 0 or invalid IDs
    if (!sentenceId || sentenceId <= 0) {
      return { value: null, isLoading: true, error: null };
    }

    return this.dataService.getSentence(sentenceId)();
  });

  audioResource: Signal<DataState<string>> = computed(() => {
    const sentenceId = this.wordKey();

    // 2. Apply the same explicit guard here
    if (!sentenceId || sentenceId <= 0) {
      return { value: null, isLoading: true, error: null };
    }

    return this.dataService.getAudio(sentenceId)();
  });
  text = computed(() => this.sentence().value?.text ?? '');
  ipa = computed(() => this.sentence().value?.ipa ?? '');

  playAudio() {
    this.logger.debug('audio-player.ts playAudio');

    const audioState = this.audioResource();

    if (audioState.isLoading || !audioState.value) {
      this.logger.debug('Audio is not ready to play yet.');
      return;
    }

    if (!this.dataService.isAudioPlaying()) {
      this.audio = new Audio(audioState.value);

      this.audio.currentTime = 0;
      this.audio.onended = this.handleAudioEnded;

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

  stopAudio() {
    this.audio.pause();
    this.audio.currentTime = 0;
    this.dataService.setIsAudioPlaying(false);
  }

  private handleAudioEnded = () => {
    this.dataService.setIsAudioPlaying(false);
    this.incrementCounter();
  };

  incrementCounter() {
    const sentenceId = this.wordKey();
    if (sentenceId) {
      this.dataService.incrementSentenceCount(sentenceId);
    }
  }
}
