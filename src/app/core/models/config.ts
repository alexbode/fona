import { Sentence } from '@core/models/sentence';

export interface CourseConfig {
  id: string;
  language: string;
  accent: string;
  vowels: string[];
  semiVowels?: string[];
  consonants: string[];
  chorus: ChorusConfig;
  pairs: PairsConfig[];
  pairsQuiz: PairsQuizConfig[];
}

export interface ChorusConfig {
  sentences: number[];
}

export interface PairsConfig {
  ipa_a: string;
  ipa_b: string;
  words_a: number[];
  words_b: number[];
  sentences: number[];
  num_examples: number;
}

export interface PairsQuizConfig {
  ipa_a: string;
  ipa_b: string;
  word_a: number;
  word_b: number;
}
