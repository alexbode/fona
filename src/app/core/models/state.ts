export interface DataState<T> {
  value: T | null;
  isLoading: boolean;
  error: string | null;
}

export interface ChorusSessionState {
  cumulativeReps: number;
  sentencesInSession: number[];
}
