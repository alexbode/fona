export interface Sentence {
  text: string;
  ipa: string;
  sentenceId: number;
  pinyin?: string;
}

export interface DbSentence {
  text: string;
  ipa: string;
  sentence_id?: number;
  pinyin?: string;
}
