import { Patient, DailyMetric } from '../types';

// Helper to generate dates
const getPastDate = (daysAgo: number): string => {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  return date.toISOString().split('T')[0];
};

// Generate pseudo-random realistic data
const generateHistory = (days: number, trend: 'stable' | 'declining' | 'improving'): DailyMetric[] => {
  const history: DailyMetric[] = [];
  
  let currentReaction = 800;
  let currentMemory = 75;
  let currentErrors = 2;

  for (let i = days; i >= 0; i--) {
    const volatility = Math.random(); 
    
    // Adjust based on trend
    if (trend === 'declining') {
      currentReaction += Math.random() * 5; 
      currentMemory -= Math.random() * 0.5;
      currentErrors += Math.random() > 0.7 ? 1 : 0;
    } else if (trend === 'improving') {
      currentReaction -= Math.random() * 5;
      currentMemory += Math.random() * 0.5;
      currentErrors = Math.max(0, currentErrors - (Math.random() > 0.8 ? 1 : 0));
    } else {
      // Stable but fluctuating
      currentReaction += (Math.random() - 0.5) * 20;
      currentMemory += (Math.random() - 0.5) * 5;
    }

    // Clamp values to realistic ranges
    currentReaction = Math.max(200, Math.min(2000, currentReaction));
    currentMemory = Math.max(0, Math.min(100, currentMemory));
    
    history.push({
      date: getPastDate(i),
      reactionTime: Math.round(currentReaction),
      errorCount: Math.round(currentErrors + (Math.random() * 2)),
      memoryScore: Math.round(currentMemory),
      moodScore: Math.round(Math.random() * 4 + 6) // Mostly happy
    });
  }
  return history;
};

export const MOCK_PATIENTS: Patient[] = [
  {
    id: 'p1',
    name: 'Eleanor Rigby',
    age: 78,
    condition: 'Mild Cognitive Impairment',
    avatarUrl: 'https://picsum.photos/id/64/200/200',
    history: generateHistory(30, 'stable')
  },
  {
    id: 'p2',
    name: 'Robert C. Miller',
    age: 82,
    condition: 'Early Stage Alzheimer\'s',
    avatarUrl: 'https://picsum.photos/id/91/200/200',
    history: generateHistory(30, 'declining')
  },
  {
    id: 'p3',
    name: 'Margaret Hale',
    age: 74,
    condition: 'Post-Stroke Recovery',
    avatarUrl: 'https://picsum.photos/id/65/200/200',
    history: generateHistory(30, 'improving')
  }
];

export const getPatientById = (id: string): Patient | undefined => {
  return MOCK_PATIENTS.find(p => p.id === id);
};
