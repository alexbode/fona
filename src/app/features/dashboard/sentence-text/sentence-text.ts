import { Component, inject, input, resource, computed } from '@angular/core';
import { DataService } from '@app/core/services/data.service';
import { Sentence } from '@core/models/sentence';
import { LoggingService } from '@core/services/logging.service';

@Component({
  selector: 'app-sentence-text',
  imports: [],
  templateUrl: './sentence-text.html',
  styleUrl: './sentence-text.scss',
})
export class SentenceText {
  readonly dataService = inject(DataService);
  private logger = inject(LoggingService);

  readonly language = input.required<string>();
  readonly accent = input.required<string>();
  readonly sentenceId = input.required<string>();

  sentencesResource = resource({
    params: () => ({ lang: this.language(), acc: this.accent(), id: this.sentenceId() }),

    loader: async ({ params }) => {
      if (!params.lang || !params.acc || !params.id) return undefined;
      return await this.dataService.getSentences(params.lang, params.acc, params.id);
    },
  });

  sentence = computed(() => {
    if (!this.sentencesResource.hasValue()){
      return {} as Sentence;
    }
    const s = this.sentencesResource.value()!;
    return s.find((item: Sentence) => String(item.sentenceId) === this.sentenceId());
  });

  text = computed(() => this.sentence()?.text);
  ipa = computed(() => this.sentence()?.ipa);
  pinyin = computed(() => this.sentence()?.pinyin);
  hasPinyin = computed(() => this.pinyin.length > 1);
}
