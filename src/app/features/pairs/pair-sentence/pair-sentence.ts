import { Component, inject, input, Signal, computed, effect } from '@angular/core';
import { DataService } from '@core/services/data.service';
import { LoggingService } from '@core/services/logging.service';
import { DataState } from '@core/models/state';
import { Sentence } from '@core/models/sentence';
import { ButtonDirective } from '@app/directive/button';
import { HlmButtonImports } from '@spartan-ng/helm/button';

@Component({
  selector: 'app-pair-sentence',
  imports: [ButtonDirective, HlmButtonImports],
  templateUrl: './pair-sentence.html',
  styleUrl: './pair-sentence.scss',
})
export class PairSentence {
  // Inputs
  sentenceKey = input.required<number>();

  // Services
  private logger = inject(LoggingService);
  private dataService = inject(DataService);

  // State
  private audio = new Audio();
  constructor() {
    effect(() => {
      const id = this.sentenceKey();
      this.audioResource();
      this.stopAudio();
    });
  }

  sentence: Signal<DataState<Sentence>> = computed(() => {
    const sentenceId = this.sentenceKey();

    if (!sentenceId || sentenceId <= 0) {
      return { value: null, isLoading: true, error: null };
    }

    return this.dataService.getSentence(sentenceId)();
  });

  audioResource: Signal<DataState<string>> = computed(() => {
    const sentenceId = this.sentenceKey();

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
    const sentenceId = this.sentenceKey();
    if (sentenceId) {
      this.dataService.incrementSentenceCount(sentenceId);
    }
  }
}
