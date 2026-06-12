import { Component, input, resource, inject, computed } from '@angular/core';
import { DataService } from '@core/services/data.service';
import { LoggingService } from '@core/services/logging.service';
import { StateService} from '@core/services/state.service';


@Component({
  selector: 'app-pair-word',
  imports: [],
  templateUrl: './pair-word.html',
  styleUrl: './pair-word.scss',
})
export class PairWord {
  // Inputs
  wordKey = input.required<string>();

  // Services
  private logger = inject(LoggingService);
  private dataService = inject(DataService);
  private stateService = inject(StateService);

  // State
  private audio = new Audio();


  audioResource = resource({
    params: () => ({ id: parseInt(this.wordKey(), 10) }),

    loader: async ({ params }) => {
      if (!params.id) return undefined;
      this.logger.debug('audio-player.ts audioResource | params:', params);
      const url = await this.dataService.getPresignedUrl(params.id);
      return new Audio(url);
    },
  });

  sentenceResource = resource({
    params: () => ({ id: parseInt(this.wordKey(), 10) }),

    loader: async ({ params }) => {
      if (!params.id) return undefined;
      this.logger.debug('audio-player.ts audioResource | params:', params);
      return await this.dataService.getSentence(params.id);
    },
  });
  text = computed(() => this.sentenceResource.value()?.text ?? '');
  ipa = computed(() => this.sentenceResource.value()?.ipa ?? '');

  playAudio() {
    this.logger.debug('pair-sentence.ts playAudio');
    if (!this.stateService.isAudioPlaying()) {
      this.audio = this.audioResource.value() || new Audio('');
      if (this.audio.ended) {
        this.audio.currentTime = 0;
      }
      this.audio.onended = this.handleAudioEnded;
      this.audio.play();
      this.stateService.setIsAudioPlaying(true);
    }
  }
    private handleAudioEnded = () => {
    this.stateService.setIsAudioPlaying(false);
    this.incrementCounter();
  };

  incrementCounter() {
    const sentenceId = parseInt(this.wordKey(), 10);
    if (sentenceId) {
      this.dataService.incrementSentenceCount(sentenceId);
    }
  }
}
