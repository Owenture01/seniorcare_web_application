export interface DailyMetric {
  date: string;
  reactionTime: number; // in milliseconds
  errorCount: number; // count
  memoryScore: number; // 0-100
  moodScore: number; // 1-10
}

export interface Patient {
  id: string;
  name: string;
  age: number;
  condition: string; // e.g., "Mild Cognitive Impairment", "Early Stage Dementia"
  avatarUrl: string;
  history: DailyMetric[];
}

export interface InsightState {
  loading: boolean;
  content: string | null;
  error: string | null;
}
