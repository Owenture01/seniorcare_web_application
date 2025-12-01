import React from 'react';

function Dashboard() {
  // Sample data for the dashboard
  const elderlyInfo = {
    name: 'Margaret Johnson',
    age: 78,
    lastActive: '10 minutes ago',
    overallScore: 85
  };

  const metrics = [
    {
      title: 'Cognitive Score',
      value: '85%',
      change: '+3%',
      changeType: 'positive',
      icon: 'cognitive'
    },
    {
      title: 'Daily Activity',
      value: '12',
      subtitle: 'games played',
      change: '+2',
      changeType: 'positive',
      icon: 'activity'
    },
    {
      title: 'Mood Index',
      value: 'Good',
      change: 'Stable',
      changeType: 'positive',
      icon: 'mood'
    },
    {
      title: 'Alerts',
      value: '0',
      subtitle: 'active',
      change: 'All clear',
      changeType: 'positive',
      icon: 'alert'
    }
  ];

  const recentActivities = [
    {
      type: 'game',
      title: 'Completed Memory Match',
      description: 'Score: 92% - Excellent performance!',
      time: '10 min ago'
    },
    {
      type: 'game',
      title: 'Played Word Puzzle',
      description: 'Score: 78% - Good cognitive engagement',
      time: '45 min ago'
    },
    {
      type: 'message',
      title: 'Received message from caregiver',
      description: 'Daily check-in completed',
      time: '2 hours ago'
    },
    {
      type: 'game',
      title: 'Completed Pattern Recognition',
      description: 'Score: 85% - Above average',
      time: '3 hours ago'
    }
  ];

  return (
    <div className="dashboard">
      {/* Page Header */}
      <div className="page-header">
        <h1>Welcome Back, Caregiver!</h1>
        <p>Here's how {elderlyInfo.name} is doing today</p>
      </div>

      {/* Alert Banner - Shows when there are concerns */}
      <div className="alert-banner info">
        <span className="alert-icon">ℹ️</span>
        <div className="alert-content">
          <h4>Daily Summary</h4>
          <p>{elderlyInfo.name} has been active today. Last seen {elderlyInfo.lastActive}.</p>
        </div>
      </div>

      {/* Elderly Info Card */}
      <div className="elderly-info">
        <h3>👤 {elderlyInfo.name}</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '15px' }}>
          <div className="info-item">
            <span className="info-label">Age</span>
            <span className="info-value">{elderlyInfo.age} years</span>
          </div>
          <div className="info-item">
            <span className="info-label">Last Active</span>
            <span className="info-value">{elderlyInfo.lastActive}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Overall Score</span>
            <span className="info-value" style={{ color: '#28a745' }}>{elderlyInfo.overallScore}%</span>
          </div>
          <div className="info-item">
            <span className="info-label">Status</span>
            <span className="info-value" style={{ color: '#28a745' }}>● Online</span>
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="dashboard-grid">
        {metrics.map((metric, index) => (
          <div className="metric-card" key={index}>
            <div className={`metric-icon ${metric.icon}`}>
              {metric.icon === 'cognitive' && '🧠'}
              {metric.icon === 'activity' && '🎮'}
              {metric.icon === 'mood' && '😊'}
              {metric.icon === 'alert' && '🔔'}
            </div>
            <div className="metric-content">
              <h3>{metric.title}</h3>
              <div className="metric-value">{metric.value}</div>
              <span className={`metric-change ${metric.changeType}`}>
                {metric.change} {metric.subtitle && `· ${metric.subtitle}`}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Two Column Layout */}
      <div className="charts-section">
        {/* Recent Activity */}
        <div className="card">
          <div className="card-header">
            <h2>📋 Recent Activity</h2>
          </div>
          <div className="card-body">
            <ul className="activity-list">
              {recentActivities.map((activity, index) => (
                <li className="activity-item" key={index}>
                  <span className={`activity-icon ${activity.type}`}>
                    {activity.type === 'game' && '🎯'}
                    {activity.type === 'alert' && '⚠️'}
                    {activity.type === 'message' && '💬'}
                  </span>
                  <div className="activity-content">
                    <h4>{activity.title}</h4>
                    <p>{activity.description}</p>
                  </div>
                  <span className="activity-time">{activity.time}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="card">
          <div className="card-header">
            <h2>⚡ Quick Actions</h2>
          </div>
          <div className="card-body">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <button className="btn btn-primary" style={{ width: '100%', padding: '15px' }}>
                💬 Send Message to {elderlyInfo.name.split(' ')[0]}
              </button>
              <button className="btn btn-secondary" style={{ width: '100%', padding: '15px' }}>
                📊 View Detailed Cognitive Report
              </button>
              <button className="btn btn-secondary" style={{ width: '100%', padding: '15px' }}>
                🤖 Ask AI about Performance
              </button>
              <button className="btn btn-secondary" style={{ width: '100%', padding: '15px' }}>
                📞 Schedule Video Call
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Weekly Summary */}
      <div className="card">
        <div className="card-header">
          <h2>📈 This Week's Highlights</h2>
        </div>
        <div className="card-body">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', textAlign: 'center' }}>
            <div>
              <div style={{ fontSize: '32px', fontWeight: '700', color: '#4a90a4' }}>42</div>
              <div style={{ color: '#6c757d', fontSize: '14px' }}>Games Completed</div>
            </div>
            <div>
              <div style={{ fontSize: '32px', fontWeight: '700', color: '#28a745' }}>+5%</div>
              <div style={{ color: '#6c757d', fontSize: '14px' }}>Cognitive Improvement</div>
            </div>
            <div>
              <div style={{ fontSize: '32px', fontWeight: '700', color: '#667eea' }}>4.2h</div>
              <div style={{ color: '#6c757d', fontSize: '14px' }}>Avg. Daily Activity</div>
            </div>
            <div>
              <div style={{ fontSize: '32px', fontWeight: '700', color: '#f5576c' }}>0</div>
              <div style={{ color: '#6c757d', fontSize: '14px' }}>Missed Sessions</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
