import { Sentence } from '@core/models/sentence';

export interface CourseConfig {
  id: string;
  language: string;
  accent: string;
  chorus: DetailConfig;
  pair: DetailConfig;
}

export interface DetailConfig {
  sentences: number[];
}
