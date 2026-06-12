import { Sentence } from '@core/models/sentence';

export interface CourseConfig {
  id: string;
  language: string;
  accent: string;
  chorus: ChorusConfig;
  pairs: PairsConfig[];
}

export interface ChorusConfig {
  sentences: number[];
}

export interface PairsConfig {
  ipa_a: string;
  ipa_b: string;
  words_a: string[];
  words_b: string[];
  sentences: number[];
  num_examples: number;
}
