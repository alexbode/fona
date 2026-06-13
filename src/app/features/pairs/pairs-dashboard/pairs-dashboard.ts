import { Component, input, inject, computed, Signal } from '@angular/core';
import { PairsConfig } from '@core/models/config';
import { DataService } from '@core/services/data.service';
import { MatCardActions, MatCardTitle, MatCardModule } from '@angular/material/card';
import { PairWord } from '@features/pairs/pair-word/pair-word';
import { PairSentence } from '@features/pairs/pair-sentence/pair-sentence';
import { DataState } from '@core/models/state';
import { CourseConfig } from '@core/models/config';

@Component({
  selector: 'app-pairs-dashboard',
  imports: [MatCardActions, MatCardTitle, MatCardModule, PairWord, PairSentence],
  templateUrl: './pairs-dashboard.html',
  styleUrl: './pairs-dashboard.scss',
})
export class PairsDashboard {
  protected readonly language = input.required<string>();
  protected readonly accent = input.required<string>();
  protected readonly pairIndex = input.required<number>();
  protected readonly exampleIndex = input.required<number>();

  private readonly dataService = inject(DataService);

  config: Signal<DataState<CourseConfig>> = computed(() => {
    const lang = this.language();
    const acc = this.accent();
    return this.dataService.getCourseConfig(lang, acc)();
  });

  pairs = computed(() => this.config().value?.pairs ?? []);
  pair = computed(() => {
    const pairs = this.pairs();
    if (pairs.length > 0) {
      return pairs[this.pairIndex() - 1] as PairsConfig;
    } else {
      return {} as PairsConfig;
    }
  });
  numExamples = computed(() => this.pair()?.num_examples);
  ipaA = computed(() => `/${this.pair()?.ipa_a}/`);
  ipaB = computed(() => `/${this.pair()?.ipa_b}/`);
  title = computed(() => `Pair: ${this.ipaA()} ${this.ipaB()}`);
  wordA = computed(() => (this.pair()?.words_a ?? [])[this.exampleIndex() - 1] ?? 0);
  wordB = computed(() => (this.pair()?.words_b ?? [])[this.exampleIndex() - 1] ?? 0);
  wordAKey = computed(() => parseInt(this.wordA(), 10));
  wordBKey = computed(() => parseInt(this.wordB(), 10));
  sentence = computed(() => (this.pair()?.sentences ?? [])[this.exampleIndex() - 1] ?? 0);
}
