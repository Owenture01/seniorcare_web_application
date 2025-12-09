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
      moodScore: Math.round(Math.random() * 4 + 6), // Mostly happy
      screenTime: Math.floor(Math.random() * 40 + 30) // 30-70 minutes per day
    });
  }
  return history;
};

export const MOCK_PATIENTS: Patient[] = [
  {
    id: 'p1',
    name: 'Dad',
    age: 78,
    role: 'Your Father',
    status: 'online',
    avatar: 'DA',
    condition: 'Mild Cognitive Impairment',
    // avatarUrl: 'https://picsum.photos/id/64/200/200',
    avatarUrl: '../resources/images/dad.png',
    history: generateHistory(30, 'stable'),
    lastMessage: 'Thanks for checking in! I\'m doing well today.',
    messages: [
      { type: 'received', content: 'Good morning! Just finished my breakfast.', time: '8:30 AM' },
      { type: 'sent', content: 'That\'s great, Dad! How are you feeling today?', time: '8:35 AM' },
      { type: 'received', content: 'Feeling good! The weather is nice.', time: '8:40 AM' },
      { type: 'sent', content: 'Did you take your morning medication?', time: '8:42 AM' },
      { type: 'received', content: 'Thanks for checking in! I\'m doing well today.', time: '8:45 AM' }
    ],
    alerts: [
      {
        id: 'a1',
        severity: 'info',
        message: 'Completed daily cognitive assessment successfully.',
        time: '10:30 AM'
      }
    ],
    todayActivities: [
      { name: 'Connect 4', timeSpent: 23, percentage: 39 },
      { name: 'Mahjong', timeSpent: 13, percentage: 22 },
      { name: 'Matching Card', timeSpent: 10, percentage: 17 },
      { name: 'Crossword Puzzle', timeSpent: 8, percentage: 14 },
      { name: 'Logic Grid', timeSpent: 5, percentage: 8 }
    ]
  },
  {
    id: 'p2',
    name: 'Mom',
    age: 82,
    role: 'Your Mother',
    status: 'online',
    avatar: 'MO',
    condition: 'Early Stage Alzheimer\'s',
    // avatarUrl: 'https://picsum.photos/id/91/200/200',
    avatarUrl: '../resources/images/mom.png',
    history: generateHistory(30, 'declining'),
    lastMessage: 'Yes, I did! Sarah reminded me this morning.',
    messages: [
      { type: 'received', content: 'Good morning! I just finished my morning exercises.', time: '9:15 AM' },
      { type: 'sent', content: 'That\'s wonderful, Mom! How are you feeling today?', time: '9:18 AM' },
      { type: 'received', content: 'Feeling great! The weather is lovely today.', time: '9:20 AM' },
      { type: 'sent', content: 'I\'m glad to hear that. Did you take your medication?', time: '9:22 AM' },
      { type: 'received', content: 'Yes, I did! Sarah reminded me this morning.', time: '9:25 AM' }
    ],
    alerts: [
      {
        id: 'a2',
        severity: 'concerning',
        message: 'Detected a rise in reaction time this week.',
        time: '9:00 AM'
      },
      {
        id: 'a3',
        severity: 'info',
        message: 'Medication reminder completed on time.',
        time: '8:00 AM'
      }
    ],
    todayActivities: [
      { name: 'Memory Match', timeSpent: 18, percentage: 35 },
      { name: 'Puzzle Builder', timeSpent: 15, percentage: 29 },
      { name: 'Word Search', timeSpent: 10, percentage: 19 },
      { name: 'Sudoku', timeSpent: 9, percentage: 17 }
    ]
  },
  {
    id: 'p3',
    name: 'Uncle Toh',
    role: 'Your Uncle',
    status: 'online',
    avatar: 'UT',
    age: 74,
    condition: 'Post-Stroke Recovery',
    // avatarUrl: 'https://picsum.photos/id/65/200/200',
    avatarUrl: '../resources/images/uncle_toh.png',
    history: generateHistory(30, 'improving'),
    lastMessage: 'The therapy is really helping. Thank you!',
    messages: [
      { type: 'received', content: 'Hi! Just completed my physical therapy session.', time: 'Yesterday' },
      { type: 'sent', content: 'That\'s excellent! How did it go?', time: 'Yesterday' },
      { type: 'received', content: 'The therapy is really helping. Thank you!', time: 'Yesterday' }
    ],
    alerts: [
      {
        id: 'a4',
        severity: 'critical',
        message: 'Detected unusual interaction with the system.',
        time: '5:34 PM'
      },
      {
        id: 'a5',
        severity: 'concerning',
        message: 'Missed scheduled therapy session reminder.',
        time: '2:00 PM'
      },
      {
        id: 'a6',
        severity: 'info',
        message: 'Physical therapy progress improving steadily.',
        time: '11:00 AM'
      }
    ],
    todayActivities: [
      { name: 'Chess', timeSpent: 25, percentage: 42 },
      { name: 'Card Games', timeSpent: 12, percentage: 20 },
      { name: 'Brain Teasers', timeSpent: 11, percentage: 18 },
      { name: 'Trivia Quiz', timeSpent: 8, percentage: 13 },
      { name: 'Pattern Recognition', timeSpent: 4, percentage: 7 }
    ]
  }
];

export const getPatientById = (id: string): Patient | undefined => {
  return MOCK_PATIENTS.find(p => p.id === id);
};
