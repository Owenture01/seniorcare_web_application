# SeniorCare+ Web Application

## Overview

SeniorCare+ is a comprehensive web application designed to enhance caregiver support by providing real-time insights into elderly patients' cognitive performance. The platform combines an interactive data dashboard with AI-powered analytics to help caregivers make informed decisions about patient care.

---

## Features

### 📊 Interactive Dashboard
- **Patient Profile**: View patient information with real-time mood tracking (8 mood states)
- **KPI Metrics**: Monitor reaction time, memory scores, and error rates
- **Data Visualization**: 30-day trend charts for cognitive performance tracking
- **Weekly Engagement**: Bar chart showing daily screen time and activity patterns

### 🤖 AI-Powered Insights
- **Cognitive Assessment**: Automated health reports using Google Gemini 2.5 Flash
- **Smart Analysis**: AI-driven insights based on 14 days of patient activity
- **Real-time Updates**: Automatic analysis with manual refresh capability

### 💬 Communication System
- **Multi-Patient Chat**: Message multiple patients seamlessly
- **Voice Messaging**: Record and playback voice messages with animated sound bars
- **Message History**: Persistent chat conversations with timestamps

### 🔔 Alert Management
- **Severity Levels**: Critical, concerning, and info alerts with color coding
- **Real-time Notifications**: Proactive alerts for important health events

### 📈 Activity Tracking
- **Daily Activities**: Track cognitive games and exercises
- **Time Analytics**: Monitor minutes spent per activity with percentage breakdowns
- **Progress Visualization**: Visual progress bars for activity engagement

---

## Tech Stack

- **React 19.2.0** - UI framework
- **TypeScript 5.8.2** - Type safety
- **Vite 6.2.0** - Build tool
- **React Router DOM** - Client-side routing
- **Recharts 3.5.0** - Data visualization
- **Google Gemini AI** - Cognitive assessments
- **Lucide React** - Icon library

---

## URL Routes

The application uses React Router for navigation with the following URL structure:

### Dashboard Routes
- `/` - Redirects to first patient's dashboard
- `/dashboard` - Redirects to first patient's dashboard
- `/dashboard/:patientId` - Patient-specific dashboard
  - Example: `/dashboard/dad`
  - Example: `/dashboard/mom`
  - Example: `/dashboard/uncle-toh`

### Chat Routes
- `/chat` - Redirects to first patient's chat
- `/chat/:patientId` - Patient-specific chat
  - Example: `/chat/dad`
  - Example: `/chat/mom`
  - Example: `/chat/uncle-toh`

### Other Routes
- `/settings` - Caregiver settings page
- All invalid routes redirect to the first patient's dashboard

**Note:** Patient IDs in URLs are automatically converted from names (e.g., "Uncle Toh" → "uncle-toh")

---

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Google Gemini API key ([Get one here](https://makersuite.google.com/app/apikey))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Owenture01/seniorcare_web_application.git
   cd seniorcare_web_application
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   VITE_GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to `http://localhost:5173`

### Build Commands

```bash
# Development mode
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## Project Structure

```
seniorcare_web_application/
├── components/          # React components
│   ├── Activity.tsx     # Activity tracking
│   ├── AIInsight.tsx    # AI assessments
│   ├── Alerts.tsx       # Alert notifications
│   ├── Charts.tsx       # Data visualizations
│   ├── Dashboard.tsx    # Main dashboard
│   ├── Layout.tsx       # App layout
│   ├── PatientProfile.tsx # Patient info
│   └── ScreenTime.tsx   # Engagement charts
├── pages/
│   └── Chats.tsx        # Chat interface
├── services/
│   ├── dataService.ts   # Patient data
│   └── geminiService.js # AI integration
├── types.ts             # TypeScript types
└── App.tsx              # Root component
```

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Made with ❤️ for better elderly care**