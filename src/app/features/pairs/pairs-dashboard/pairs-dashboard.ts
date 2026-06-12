import { Component, input, inject, computed, resource } from '@angular/core';
import { DataService } from '@core/services/data.service';
import { PairsConfig } from '@core/models/config';
import { MatCardActions, MatCardTitle, MatCardModule } from '@angular/material/card';
import { PairWord } from '@features/pairs/pair-word/pair-word';
import { PairSentence } from '../pair-sentence/pair-sentence';

@Component({
  selector: 'app-pairs-dashboard',
  imports: [MatCardActions, MatCardTitle, MatCardModule, PairWord, PairSentence],
  templateUrl: './pairs-dashboard.html',
  styleUrl: './pairs-dashboard.scss',
})
export class PairsDashboard {
  protected readonly language = input.required<string>();
  protected readonly accent = input.required<string>();
  protected readonly pairIndex = input.required<string>();
  protected readonly exampleIndex = input.required<string>();

  private readonly dataService = inject(DataService);

  configResource = resource({
    params: () => ({ language: this.language(), accent: this.accent() }),
    loader: async ({ params }) => {
      if (!params.language || !params.accent) return undefined;
      return await this.dataService.getCourseConfig(params.language, params.accent);
    },
  });

  pairs = computed(() => this.configResource.value()?.pairs ?? []);
  pair = computed(() => {
    const pairs = this.pairs();
    if (pairs.length > 0) {
      return pairs[parseInt(this.pairIndex(), 10) - 1] as PairsConfig;
    } else {
      return {} as PairsConfig;
    }
  });
  numExamples = computed(() => this.pair()?.num_examples);
  ipaA = computed(() => `/${this.pair()?.ipa_a}/`);
  ipaB = computed(() => `/${this.pair()?.ipa_b}/`);
  title = computed(() => `Pair: ${this.ipaA()} ${this.ipaB()}`);
  wordA = computed(() => (this.pair()?.words_a ?? [])[parseInt(this.exampleIndex(), 10) - 1] ?? 0);
  wordB = computed(() => (this.pair()?.words_b ?? [])[parseInt(this.exampleIndex(), 10) - 1] ?? 0);
  sentence = computed(
    () => (this.pair()?.sentences ?? [])[parseInt(this.exampleIndex(), 10) - 1] ?? 0,
  );
}
