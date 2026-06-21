export interface DataState<T> {
  value: T | null;
  isLoading: boolean;
  error: string | null;
}

export interface SessionState {
  currentMode: SessionMode;
  chorusSessionState?: ChorusSessionState;
  pairsSessionState?: PairsSessionState;
  pairsQuizSessionState?: PairsQuizSessionState;
}

export enum SessionMode {
  CHORUS = 'chorus',
  PAIRS = 'pairs',
  PAIRS_QUIZ = 'pairs_quiz',
}

export interface ChorusSessionState {
  cumulativeReps: number;
  sentencesInSession: number[];
}

export interface PairsSessionState {
  cumulativeReps: number;
  pairsInSession: MinimalPair[];
}

export interface MinimalPair {
  ipaA: string;
  ipaB: string;
  wordA: number;
  wordB: number;
  sentence: number;
}

export interface PairsQuizSessionState {
  correctAnswers: number;
  incorrectAnswers: number;
}
