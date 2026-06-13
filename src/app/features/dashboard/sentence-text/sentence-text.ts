import { Component, inject, input, resource, computed, Signal } from '@angular/core';
import { DataService } from '@app/core/services/data.service';
import { LoggingService } from '@core/services/logging.service';
import { MatListModule } from '@angular/material/list';
import { DataState } from '@core/models/state';
import { CourseConfig } from '@core/models/config';
import { Sentence } from '@core/models/sentence';

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

  config: Signal<DataState<CourseConfig>> = computed(() => {
    const lang = this.language();
    const acc = this.accent();
    return this.dataService.getCourseConfig(lang, acc)();
  });

  sentence: Signal<DataState<Sentence>> = computed(() => {
    const config = this.config();
    const sentenceIndex = parseInt(this.sentenceIndex(), 10);
    if (config.isLoading || !config.value) {
      return {
        value: null,
        isLoading: config.isLoading,
        error: config.error,
      };
    }
    return this.dataService.getSentence(config.value.chorus.sentences[sentenceIndex - 1])();
  });

  text = computed(() => this.sentence().value?.text);
  ipa = computed(() => this.sentence().value?.ipa);
  pinyin = computed(() => this.sentence().value?.pinyin);
  hasPinyin = computed(() => this.pinyin !== null && this.pinyin !== undefined);
}
