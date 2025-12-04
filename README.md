# SeniorCare+ Web Application

SeniorCare+ is a complementary web application to SeniorConnect+. It is designed to enhance caregiver support by offering superior insight into an elderly person's cognitive performance. This is achieved through a combination of an interactive data dashboard and a state-of-the-art, AI-driven chatbot.

## Core Philosophy

**"Peace of Mind at a Glance"** - Reducing the cognitive load on busy caregivers by translating complex performance data into simple, actionable insights.

## Features

### 1. Caretaker Dashboard (Home Screen)
- Overview of elderly's cognitive health metrics
- Real-time activity tracking
- Quick action buttons for common tasks
- Weekly performance highlights
- Alert notifications and status updates

### 2. Cognitive Report & AI Analysis
- **Visual Trend Tracking**: Line charts showing cognitive performance trends over time across multiple domains (Memory, Attention, Problem Solving, Language)
- **Longitudinal Performance Index**: Overall cognitive score with detailed domain breakdown and progress indicators
- **Domain Radar Chart**: Visual comparison of current vs. previous month performance across cognitive domains
- **AI-Generated Insights**: Automated analysis with recommendations for improvement

### 3. AI Analysis Chatbot
- Interactive chatbot for querying cognitive performance data
- Natural language understanding for questions about memory, attention, progress, and concerns
- Personalized recommendations based on performance data
- Quick action buttons for common queries

### 4. Contact Elderly (Chat Feature)
- Real-time messaging with elderly family members
- Contact list with online/offline status
- Quick reply suggestions
- Video and voice call buttons
- Message history with timestamps

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

```bash
# Install dependencies
npm install

# Start the development server
npm start
```

The application will open at [http://localhost:3000](http://localhost:3000).

## Available Scripts

### `npm start`
Runs the app in development mode.

### `npm test`
Launches the test runner in interactive watch mode.

### `npm run build`
Builds the app for production to the `build` folder.

## Tech Stack

- **React 19** - UI Framework
- **React Router v7** - Navigation and routing
- **Chart.js / React-Chartjs-2** - Data visualization
- **CSS3** - Styling with custom design system

## Project Structure

```
src/
├── components/
│   └── Sidebar.js       # Navigation sidebar
├── pages/
│   ├── Dashboard.js     # Home screen with metrics
│   ├── CognitiveReport.js # Charts and performance data
│   ├── AIChatbot.js     # AI analysis chatbot
│   └── Chat.js          # Contact elderly feature
├── styles/
│   └── main.css         # Global styles
├── App.js               # Main app component with routing
└── index.js             # Entry point
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.
