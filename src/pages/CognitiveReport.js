import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  RadialLinearScale,
  ArcElement,
  Filler
} from 'chart.js';
import { Line, Radar } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  RadialLinearScale,
  ArcElement,
  Filler
);

function CognitiveReport() {
  // Sample data for Visual Trend Tracking (Line Chart)
  const trendData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7', 'Week 8'],
    datasets: [
      {
        label: 'Memory',
        data: [72, 75, 73, 78, 80, 82, 85, 87],
        borderColor: '#667eea',
        backgroundColor: 'rgba(102, 126, 234, 0.1)',
        fill: true,
        tension: 0.4
      },
      {
        label: 'Attention',
        data: [68, 70, 72, 71, 75, 78, 80, 82],
        borderColor: '#28a745',
        backgroundColor: 'rgba(40, 167, 69, 0.1)',
        fill: true,
        tension: 0.4
      },
      {
        label: 'Problem Solving',
        data: [65, 68, 70, 72, 74, 76, 78, 80],
        borderColor: '#f5576c',
        backgroundColor: 'rgba(245, 87, 108, 0.1)',
        fill: true,
        tension: 0.4
      },
      {
        label: 'Language',
        data: [80, 82, 81, 83, 85, 84, 86, 88],
        borderColor: '#ffc107',
        backgroundColor: 'rgba(255, 193, 7, 0.1)',
        fill: true,
        tension: 0.4
      }
    ]
  };

  const trendOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: false
      }
    },
    scales: {
      y: {
        beginAtZero: false,
        min: 50,
        max: 100,
        title: {
          display: true,
          text: 'Score (%)'
        }
      },
      x: {
        title: {
          display: true,
          text: 'Time Period'
        }
      }
    }
  };

  // Domain Radar Chart Data
  const radarData = {
    labels: [
      'Memory',
      'Attention',
      'Processing Speed',
      'Problem Solving',
      'Language',
      'Visual-Spatial'
    ],
    datasets: [
      {
        label: 'Current Performance',
        data: [87, 82, 75, 80, 88, 78],
        backgroundColor: 'rgba(74, 144, 164, 0.3)',
        borderColor: '#4a90a4',
        borderWidth: 2,
        pointBackgroundColor: '#4a90a4'
      },
      {
        label: 'Previous Month',
        data: [78, 75, 70, 72, 82, 72],
        backgroundColor: 'rgba(108, 117, 125, 0.2)',
        borderColor: '#6c757d',
        borderWidth: 2,
        pointBackgroundColor: '#6c757d'
      }
    ]
  };

  const radarOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        beginAtZero: false,
        min: 50,
        max: 100,
        ticks: {
          stepSize: 10
        }
      }
    },
    plugins: {
      legend: {
        position: 'top'
      }
    }
  };

  // Longitudinal Performance Index calculation
  const performanceIndex = {
    current: 85,
    trend: '+5%',
    trendDirection: 'up',
    breakdown: [
      { domain: 'Memory', score: 87, change: '+9', trend: 'up' },
      { domain: 'Attention', score: 82, change: '+7', trend: 'up' },
      { domain: 'Processing Speed', score: 75, change: '+5', trend: 'up' },
      { domain: 'Problem Solving', score: 80, change: '+8', trend: 'up' },
      { domain: 'Language', score: 88, change: '+6', trend: 'up' },
      { domain: 'Visual-Spatial', score: 78, change: '+6', trend: 'up' }
    ]
  };

  return (
    <div className="cognitive-report">
      {/* Page Header */}
      <div className="page-header">
        <h1>Cognitive Report</h1>
        <p>Detailed analysis of cognitive performance over time</p>
      </div>

      {/* Summary Cards */}
      <div className="dashboard-grid" style={{ marginBottom: '30px' }}>
        <div className="metric-card">
          <div className="metric-icon cognitive">🧠</div>
          <div className="metric-content">
            <h3>Overall Cognitive Score</h3>
            <div className="metric-value">{performanceIndex.current}%</div>
            <span className="metric-change positive">{performanceIndex.trend} from last month</span>
          </div>
        </div>
        <div className="metric-card">
          <div className="metric-icon activity">📊</div>
          <div className="metric-content">
            <h3>Assessment Sessions</h3>
            <div className="metric-value">42</div>
            <span className="metric-change positive">Completed this month</span>
          </div>
        </div>
        <div className="metric-card">
          <div className="metric-icon mood">⭐</div>
          <div className="metric-content">
            <h3>Strongest Domain</h3>
            <div className="metric-value">Language</div>
            <span className="metric-change positive">88% performance</span>
          </div>
        </div>
      </div>

      {/* Longitudinal Performance Index */}
      <div className="charts-section">
        <div className="chart-container">
          <h3>📈 Longitudinal Performance Index</h3>
          <div className="performance-index">
            <div className="index-circle">
              <span className="index-value">{performanceIndex.current}</span>
              <span className="index-label">Overall Score</span>
            </div>
            <p className="index-description">
              This index represents the overall cognitive health based on multiple assessments 
              over time. A score above 80 indicates healthy cognitive function.
            </p>
          </div>
          
          {/* Domain Breakdown */}
          <div style={{ marginTop: '20px' }}>
            <h4 style={{ marginBottom: '15px', color: '#333' }}>Domain Breakdown</h4>
            {performanceIndex.breakdown.map((item, index) => (
              <div key={index} style={{ 
                display: 'flex', 
                alignItems: 'center', 
                marginBottom: '10px',
                padding: '10px',
                backgroundColor: '#f8f9fa',
                borderRadius: '8px'
              }}>
                <span style={{ flex: 1, fontWeight: '500' }}>{item.domain}</span>
                <div style={{ 
                  width: '200px', 
                  height: '8px', 
                  backgroundColor: '#e9ecef', 
                  borderRadius: '4px',
                  marginRight: '15px'
                }}>
                  <div style={{ 
                    width: `${item.score}%`, 
                    height: '100%', 
                    backgroundColor: '#4a90a4',
                    borderRadius: '4px',
                    transition: 'width 0.5s ease'
                  }}></div>
                </div>
                <span style={{ fontWeight: '700', width: '50px' }}>{item.score}%</span>
                <span style={{ 
                  color: item.trend === 'up' ? '#28a745' : '#dc3545',
                  fontWeight: '500',
                  width: '50px'
                }}>
                  {item.trend === 'up' ? '↑' : '↓'} {item.change}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Domain Radar Chart */}
        <div className="chart-container">
          <h3>🎯 Domain Radar Chart</h3>
          <div className="radar-chart-container">
            <Radar data={radarData} options={radarOptions} />
          </div>
          <p style={{ textAlign: 'center', color: '#6c757d', marginTop: '15px', fontSize: '14px' }}>
            Compare current performance (blue) with previous month (gray)
          </p>
        </div>
      </div>

      {/* Visual Trend Tracking */}
      <div className="card" style={{ marginTop: '20px' }}>
        <div className="card-header">
          <h2>📉 Visual Trend Tracking</h2>
        </div>
        <div className="card-body">
          <div className="chart-wrapper">
            <Line data={trendData} options={trendOptions} />
          </div>
          <p style={{ textAlign: 'center', color: '#6c757d', marginTop: '15px', fontSize: '14px' }}>
            Track cognitive performance trends across different domains over the past 8 weeks
          </p>
        </div>
      </div>

      {/* Insights & Recommendations */}
      <div className="card" style={{ marginTop: '20px' }}>
        <div className="card-header">
          <h2>💡 AI-Generated Insights</h2>
        </div>
        <div className="card-body">
          <div style={{ display: 'grid', gap: '15px' }}>
            <div className="alert-banner info">
              <span className="alert-icon">✅</span>
              <div className="alert-content">
                <h4>Strong Memory Performance</h4>
                <p>Memory scores have improved by 9% over the past month, showing excellent engagement with memory-focused activities.</p>
              </div>
            </div>
            <div className="alert-banner info">
              <span className="alert-icon">📈</span>
              <div className="alert-content">
                <h4>Consistent Improvement</h4>
                <p>All cognitive domains show positive trends. Continue with current activity patterns for sustained improvement.</p>
              </div>
            </div>
            <div className="alert-banner warning">
              <span className="alert-icon">💪</span>
              <div className="alert-content">
                <h4>Focus Area: Processing Speed</h4>
                <p>Processing speed is the lowest scoring domain at 75%. Consider adding more speed-based exercises to daily routine.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CognitiveReport;
