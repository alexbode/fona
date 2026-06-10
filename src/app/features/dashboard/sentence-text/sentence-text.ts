import { Component, inject, input, resource, computed } from '@angular/core';
import { DataService } from '@app/core/services/data.service';
import { Sentence } from '@core/models/sentence';
import { LoggingService } from '@core/services/logging.service';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-sentence-text',
  imports: [MatListModule],
  templateUrl: './sentence-text.html',
  styleUrl: './sentence-text.scss',
})
export class SentenceText {
  readonly dataService = inject(DataService);
  private logger = inject(LoggingService);

  readonly language = input.required<string>();
  readonly accent = input.required<string>();
  readonly sentenceIndex = input.required<string>();

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

  sentenceResource = resource({
    params: () => ({ id: this.sentenceId() }),

    loader: async ({ params }) => {
      if (!params.id) return undefined;
      return await this.dataService.getSentence(params.id);
    },
  });

  text = computed(() => this.sentenceResource.value()?.text);
  ipa = computed(() => this.sentenceResource.value()?.ipa);
  pinyin = computed(() => this.sentenceResource.value()?.pinyin);
  hasPinyin = computed(() => this.pinyin !== null && this.pinyin !== undefined);
}
