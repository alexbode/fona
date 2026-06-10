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

  sentencesResource = resource({
    params: () => ({ lang: this.language(), acc: this.accent() }),

    loader: async ({ params }) => {
      if (!params.lang || !params.acc) return undefined;
      return await this.dataService.getSentences(params.lang, params.acc);
    },
  });

  sentence = computed(() => {
    if (!this.sentencesResource.hasValue()) {
      return {} as Sentence;
    }
    const s = this.sentencesResource.value()!;
    return s.find((item: Sentence) => String(item.sentenceId) === this.sentenceIndex());
  });

  text = computed(() => this.sentence()?.text);
  ipa = computed(() => this.sentence()?.ipa);
  pinyin = computed(() => this.sentence()?.pinyin);
  hasPinyin = computed(() => this.pinyin !== null);
}
