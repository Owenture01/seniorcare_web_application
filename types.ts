export interface DailyMetric {
  date: string;
  reactionTime: number; // in milliseconds
  errorCount: number; // count
  memoryScore: number; // 0-100
  moodScore: number; // 1-10
}

export interface ChatMessage {
  type: 'sent' | 'received';
  content: string;
  time: string;
  isVoice?: boolean;
  duration?: number;
}

export interface Alert {
  id: string;
  severity: 'critical' | 'concerning' | 'info';
  message: string;
  time: string;
}

export interface Patient {
  id: string;
  name: string;
  age: number;
  role: string;
  status: 'online' | 'offline';
  condition: string; // e.g., "Mild Cognitive Impairment", "Early Stage Dementia"
  avatarUrl: string;
  avatar: string; // Initials for chat
  history: DailyMetric[];
  messages: ChatMessage[];
  lastMessage?: string;
  alerts?: Alert[];
}

export interface InsightState {
  loading: boolean;
  content: string | null;
  error: string | null;
}
