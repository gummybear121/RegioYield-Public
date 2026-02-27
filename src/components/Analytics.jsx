import { useState } from 'react';

const chartData = [
  { height: 60, highlight: true },
  { height: 85, secondary: true },
  { height: 40 },
  { height: 55 },
  { height: 70, highlight: true },
];

export default function Analytics() {
  const [activeFilter, setActiveFilter] = useState('All');

  return (
    <div className="analytics-container">
      <div className="ai-card">
        <div className="blur-orb"></div>
        <div className="ai-card-content">
          <div className="section-title" style={{ marginBottom: 'var(--spacing-md)' }}>
            Yield Forecast
          </div>
          <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
            Comparison of projected returns over 30 days based on local inflation data.
          </div>

          <div className="chart-bars">
            {chartData.map((bar, index) => (
              <div
                key={index}
                className={`bar ${bar.highlight ? 'highlight' : ''} ${bar.secondary ? 'secondary' : ''}`}
                style={{ height: `${bar.height}%` }}
              ></div>
            ))}
          </div>

          <div className="insight-row">
            <div className="insight-header">AI Recommendation</div>
            <div className="insight-text">
              JPYC pools show arbitrage opportunity due to recent forex volatility. Suggest allocation increase of 15%.
            </div>
          </div>
        </div>
      </div>

      <div className="card" style={{ flex: 1, justifyContent: 'flex-start', gap: 'var(--spacing-md)' }}>
        <div className="section-title">Wallet Allocation</div>
        <div className="wallet-allocation">
          <div className="wallet-allocation-jpy"></div>
          <div className="wallet-allocation-brl"></div>
          <div className="wallet-allocation-other"></div>
        </div>
        <div className="allocation-legend">
          <span className="allocation-item">
            <span className="allocation-dot allocation-dot-jpy"></span> JPY 45%
          </span>
          <span className="allocation-item">
            <span className="allocation-dot allocation-dot-brl"></span> BRL 35%
          </span>
          <span className="allocation-item">
            <span className="allocation-dot allocation-dot-other"></span> Other
          </span>
        </div>
      </div>
    </div>
  );
}
