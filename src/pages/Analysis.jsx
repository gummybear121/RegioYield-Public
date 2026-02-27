import { useState } from 'react';
import Nav from '../components/Nav';

function AllocationCard() {
  return (
    <div className="card brutal-card">
      <h2 className="section-title">
        <div className="cube-icon" style={{ background: 'var(--accent-gold)' }}></div>
        Allocation
      </h2>
      <div className="pie-container"></div>
      <div className="allocation-legend">
        <div className="legend-item">
          <span>
            <span className="legend-dot" style={{ background: 'var(--accent-gold)' }}></span>
            BRZ Stablecoin (LATAM)
          </span>
          <span>45%</span>
        </div>
        <div className="legend-item">
          <span>
            <span className="legend-dot" style={{ background: 'var(--accent-lavender)' }}></span>
            EURC (Europe)
          </span>
          <span>30%</span>
        </div>
        <div className="legend-item">
          <span>
            <span className="legend-dot" style={{ background: 'var(--text-main)' }}></span>
            JPYC (APAC)
          </span>
          <span>25%</span>
        </div>
      </div>
    </div>
  );
}

function YieldPredictionsCard() {
  const predictions = [
    { symbol: 'BRZ', fill: '82%', current: '8.92%', projected: '9.4%', conf: '94%', color: 'var(--accent-gold)' },
    { symbol: 'JPYC', fill: '45%', current: '4.21%', projected: '4.5%', conf: '68%', color: 'var(--accent-lavender)' },
    { symbol: 'EURC', fill: '61%', current: '3.88%', projected: '3.7%', conf: '81%', color: 'var(--accent-lavender)' },
  ];

  return (
    <div className="card">
      <h2 className="section-title">
        <div className="cube-icon" style={{ background: 'var(--accent-lavender)' }}></div>
        Yield Predictions
      </h2>
      {predictions.map((pred) => (
        <div className="prediction-row" key={pred.symbol}>
          <span style={{ fontWeight: '800' }}>{pred.symbol}</span>
          <div className="gauge-container">
            <div className="gauge-fill" style={{ width: pred.fill, background: pred.color }}></div>
          </div>
          <span style={{ textAlign: 'right', fontWeight: '700' }}>
            {pred.current} → {pred.projected}
          </span>
          <span className="confidence-badge">{pred.conf} CONF</span>
        </div>
      ))}
    </div>
  );
}

function RiskSentimentCard() {
  return (
    <div className="card">
      <h2 className="section-title">
        <div className="cube-icon" style={{ background: '#000' }}></div>
        Risk & Sentiment
      </h2>
      <div className="risk-signal">
        <strong>⚠️ ALERT:</strong>
        SELIC rate pivot expected in 72h. Impact on BRZ liquidity pools.
      </div>

      <div style={{ marginTop: '20px' }}>
        <div className="info-row" style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '4px' }}>
          <span>Social Sentiment (Global)</span>
          <span style={{ fontWeight: '700' }}>BULLISH</span>
        </div>
        <div className="gauge-container">
          <div className="gauge-fill" style={{ width: '78%', background: '#22c55e' }}></div>
        </div>
      </div>
    </div>
  );
}

function RegionalFeedCard() {
  const news = [
    { source: 'Valor Econômico • Brazil', headline: 'Central Bank signals potential reserve requirement adjustments for 2024.' },
    { source: 'Nikkei Asia • Japan', headline: 'Yen-backed stablecoins see 15% volume surge following Tokyo fintech summit.' },
    { source: 'Les Echos • France', headline: 'MiCA compliance deadline approaching for Euro-pegged asset issuers.' },
  ];

  return (
    <div className="card">
      <h2 className="section-title">
        <div className="cube-icon" style={{ background: 'var(--accent-gold-dim)' }}></div>
        Regional Feed
      </h2>
      {news.map((item, idx) => (
        <div className="news-item" key={idx} style={{ border: idx === news.length - 1 ? 'none' : undefined, margin: idx === news.length - 1 ? 0 : undefined }}>
          <div className="news-source">{item.source}</div>
          <div className="news-headline">{item.headline}</div>
        </div>
      ))}
    </div>
  );
}

function ChatPanel() {
  const [input, setInput] = useState('');

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && input.trim()) {
      setInput('');
    }
  };

  return (
    <div className="card brutal-card chat-panel">
      <h2 className="section-title">
        <div className="cube-icon" style={{ background: 'var(--accent-lavender)' }}></div>
        Strategy Assistant
      </h2>
      <div className="chat-messages">
        <div className="msg ai">
          <div className="msg-label">Yield AI</div>
          Hello. I am analyzing current yield spreads. Based on your risk profile, shifting 5% from EURC to BRZ could increase monthly yield by ~0.4% with minimal volatility exposure.
        </div>
        <div className="msg user">
          <div className="msg-label">You</div>
          What are the risks of increasing my JPYC allocation?
        </div>
        <div className="msg ai">
          <div className="msg-label">Yield AI</div>
          The primary risk for JPYC currently is low liquidity depth vs. BRZ. If the BoJ pivots unexpectedly, slippage on exit could negate yield gains.
        </div>
      </div>
      <div className="chat-input-area">
        <input
          type="text"
          className="chat-input"
          placeholder="Ask about yield strategies..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <div style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', fontWeight: '800', cursor: 'pointer' }}>
          ↵
        </div>
      </div>
    </div>
  );
}

function StatPills() {
  const stats = [
    { label: 'Total Protocol TVL', value: '$284.6M', sub: '↑ +3.2% (24h)' },
    { label: 'Active Depositors', value: '18,492', sub: '↑ +212 new today' },
    { label: '24h Volume', value: '$41.3M', sub: 'Across 3 regions' },
    { label: 'Protocol Revenue', value: '$128K', sub: '↑ +18% vs last week' },
    { label: 'Avg. Hold Duration', value: '34d', sub: 'Median: 22 days' },
  ];

  return (
    <div className="stat-pills">
      {stats.map((stat, idx) => (
        <div className="stat-pill" key={idx}>
          <div className="stat-pill-label">{stat.label}</div>
          <div className="stat-pill-val">{stat.value}</div>
          <div className="stat-pill-sub">{stat.sub}</div>
        </div>
      ))}
    </div>
  );
}

function YieldHistoryChart() {
  return (
    <div className="card brutal-card">
      <h2 className="section-title">
        <div className="cube-icon" style={{ background: 'var(--accent-gold)' }}></div>
        Yield History (90d)
      </h2>
      <div className="chart-row-inner">
        <div className="sparkline-yaxis">
          <span>14%</span>
          <span>10%</span>
          <span>6%</span>
          <span>2%</span>
        </div>
        <div style={{ flex: 1, position: 'relative' }}>
          <svg width="100%" height="120" viewBox="0 0 400 120" preserveAspectRatio="none">
            <line x1="0" y1="0" x2="400" y2="0" stroke="var(--border-color)" strokeWidth="0.5" strokeDasharray="4,4"></line>
            <line x1="0" y1="40" x2="400" y2="40" stroke="var(--border-color)" strokeWidth="0.5" strokeDasharray="4,4"></line>
            <line x1="0" y1="80" x2="400" y2="80" stroke="var(--border-color)" strokeWidth="0.5" strokeDasharray="4,4"></line>
            <line x1="0" y1="120" x2="400" y2="120" stroke="var(--border-color)" strokeWidth="0.5"></line>
            <polyline fill="none" stroke="var(--accent-gold)" strokeWidth="2.5" points="0,90 22,82 44,75 66,80 88,68 110,60 132,55 154,62 176,50 198,42 220,38 242,45 264,40 286,32 308,28 330,35 352,25 374,20 400,18"></polyline>
            <polyline fill="none" stroke="var(--accent-lavender)" strokeWidth="2" points="0,100 22,98 44,96 66,100 88,94 110,90 132,92 154,88 176,86 198,84 220,88 242,90 264,86 286,82 308,80 330,85 352,80 374,78 400,76"></polyline>
            <polyline fill="none" stroke="#9CA3AF" strokeWidth="1.5" strokeDasharray="5,3" points="0,108 22,106 44,110 66,104 88,108 110,106 132,100 154,104 176,102 198,108 220,104 242,102 264,106 286,100 308,98 330,104 352,100 374,96 400,94"></polyline>
            <polygon fill="var(--accent-gold)" fillOpacity="0.08" points="0,90 22,82 44,75 66,80 88,68 110,60 132,55 154,62 176,50 198,42 220,38 242,45 264,40 286,32 308,28 330,35 352,25 374,20 400,18 400,120 0,120"></polygon>
            <circle cx="400" cy="18" r="4" fill="var(--accent-gold)" stroke="white" strokeWidth="1.5"></circle>
            <circle cx="400" cy="76" r="3" fill="var(--accent-lavender)" stroke="white" strokeWidth="1"></circle>
          </svg>
          <div className="sparkline-labels">
            <span>90d ago</span>
            <span>60d</span>
            <span>30d</span>
            <span>Today</span>
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', gap: '16px', marginTop: '14px', paddingTop: '12px', borderTop: '1px solid var(--border-color)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', fontWeight: '700' }}>
          <div style={{ width: '16px', height: '3px', background: 'var(--accent-gold)', borderRadius: '2px' }}></div>
          BRZ
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', fontWeight: '700' }}>
          <div style={{ width: '16px', height: '3px', background: 'var(--accent-lavender)', borderRadius: '2px' }}></div>
          EURC
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', fontWeight: '700' }}>
          <div style={{ width: '16px', height: '3px', background: '#9CA3AF', border: '2px dashed #9CA3AF' }}></div>
          JPYC
        </div>
        <div style={{ marginLeft: 'auto', fontSize: '0.72rem', color: 'var(--text-secondary)', fontWeight: '600' }}>
          BRZ +34.2% over period
        </div>
      </div>
    </div>
  );
}

function FearGreedMeter() {
  return (
    <div className="card">
      <h2 className="section-title" style={{ fontSize: '0.9rem' }}>
        <div className="cube-icon" style={{ background: '#22c55e' }}></div>
        Market Sentiment
      </h2>
      <div className="fear-greed">
        <div className="arc-wrap">
          <svg width="160" height="90" viewBox="0 0 160 90">
            <path d="M 10 85 A 70 70 0 0 1 40 22" stroke="#ef4444" strokeWidth="12" fill="none" strokeLinecap="butt"></path>
            <path d="M 40 22 A 70 70 0 0 1 80 10" stroke="#f97316" strokeWidth="12" fill="none" strokeLinecap="butt"></path>
            <path d="M 80 10 A 70 70 0 0 1 120 22" stroke="#eab308" strokeWidth="12" fill="none" strokeLinecap="butt"></path>
            <path d="M 120 22 A 70 70 0 0 1 150 85" stroke="#22c55e" strokeWidth="12" fill="none" strokeLinecap="butt"></path>
            <line x1="80" y1="16" x2="80" y2="24" stroke="white" strokeWidth="1.5"></line>
          </svg>
          <div className="arc-needle"></div>
          <div className="arc-center-dot"></div>
        </div>
        <div className="fear-score">72</div>
        <div className="fear-label">Greed</div>
        <div className="fear-detail">Prev. week: 61 · Neutral</div>
      </div>
    </div>
  );
}

function CorrelationMatrix() {
  const data = [
    { row: 'BRZ', values: ['1.0', '0.42', '0.18'], colors: ['var(--accent-gold)', '#FEF9C3', '#DBEAFE'] },
    { row: 'EURC', values: ['0.42', '1.0', '0.61'], colors: ['#FEF9C3', 'var(--accent-lavender)', '#D1FAE5'] },
    { row: 'JPYC', values: ['0.18', '0.61', '1.0'], colors: ['#DBEAFE', '#D1FAE5', '#E5E7EB'] },
  ];

  return (
    <div className="card">
      <h2 className="section-title" style={{ fontSize: '0.9rem' }}>
        <div className="cube-icon" style={{ background: 'var(--accent-lavender)' }}></div>
        Correlation
      </h2>
      <div className="corr-grid">
        <div></div>
        <div className="corr-header">BRZ</div>
        <div className="corr-header">EURC</div>
        <div className="corr-header">JPYC</div>

        {data.map((row, idx) => (
          <>
            <div className="corr-row-label" key={`row-${idx}`}>{row.row}</div>
            {row.values.map((val, vidx) => (
              <div className="corr-cell" key={`${idx}-${vidx}`} style={{ background: row.colors[vidx], color: '#000' }}>
                {val}
              </div>
            ))}
          </>
        ))}
      </div>
      <div style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', marginTop: '10px', fontWeight: '600' }}>
        30-day rolling correlation · lower = better diversification
      </div>
    </div>
  );
}

function OnChainMetrics() {
  const metrics = [
    { label: 'Net Inflows (24h)', value: '+$5.8M', delta: '▲ 12%', type: 'up' },
    { label: 'Unique Wallets', value: '4,281', delta: '▲ 3%', type: 'up' },
    { label: 'Liquidations', value: '$0', delta: 'Clean', type: 'up' },
    { label: 'Avg Gas (gwei)', value: '18.4', delta: '▼ 8%', type: 'dn' },
  ];

  return (
    <div className="card">
      <h2 className="section-title" style={{ fontSize: '0.9rem' }}>
        <div className="cube-icon" style={{ background: 'var(--text-main)' }}></div>
        On-Chain Metrics
      </h2>
      {metrics.map((metric, idx) => (
        <div className="onchain-row" key={idx}>
          <span className="onchain-label">{metric.label}</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span className="onchain-val">{metric.value}</span>
            <span className={`onchain-delta ${metric.type === 'up' ? 'delta-up' : 'delta-dn'}`}>
              {metric.delta}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

function VolatilityChart() {
  const bars = [
    { height: '28%', color: 'var(--accent-lavender)' },
    { height: '35%', color: 'var(--accent-lavender)' },
    { height: '22%', color: 'var(--accent-lavender)' },
    { height: '55%', color: 'var(--accent-gold)' },
    { height: '42%', color: 'var(--accent-gold)' },
    { height: '38%', color: 'var(--accent-lavender)' },
    { height: '60%', color: 'var(--accent-gold)' },
  ];

  return (
    <div className="card">
      <h2 className="section-title" style={{ fontSize: '0.9rem' }}>
        <div className="cube-icon" style={{ background: 'var(--accent-gold-dim)' }}></div>
        Implied Vol. (7d)
      </h2>
      <div style={{ display: 'flex', gap: '16px', marginBottom: '10px' }}>
        <div>
          <div style={{ fontSize: '0.65rem', fontWeight: '800', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>BRZ IV</div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem' }}>18.4%</div>
        </div>
        <div>
          <div style={{ fontSize: '0.65rem', fontWeight: '800', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>EURC IV</div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem' }}>9.2%</div>
        </div>
        <div>
          <div style={{ fontSize: '0.65rem', fontWeight: '800', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>JPYC IV</div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem' }}>11.8%</div>
        </div>
      </div>
      <div className="vol-strip">
        {bars.map((bar, idx) => (
          <div className="vol-bar" key={idx} style={{ height: bar.height, background: bar.color }}></div>
        ))}
      </div>
      <div style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', fontWeight: '600', marginTop: '6px' }}>
        Spikes correlate with SELIC announcement windows
      </div>
    </div>
  );
}

function YieldHeatmap() {
  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  const data = {
    BRZ: ['8.4', '8.7', '9.0', '9.2', '9.5', '9.1', '8.9'],
    EURC: ['3.6', '3.7', '3.9', '4.1', '3.9', '3.8', '3.7'],
    JPYC: ['4.1', '4.2', '4.4', '4.3', '4.2', '4.3', '4.5'],
  };
  const colors = {
    BRZ: ['#fef9c3', '#fde68a', '#fcd34d', '#fbbf24', '#f59e0b', '#fcd34d', '#fde68a'],
    EURC: ['#ede9fe', '#ddd6fe', '#c4b5fd', '#a78bfa', '#c4b5fd', '#ddd6fe', '#ede9fe'],
    JPYC: ['#f3f4f6', '#e5e7eb', '#d1d5db', '#e5e7eb', '#f3f4f6', '#e5e7eb', '#d1d5db'],
  };

  return (
    <div className="card">
      <h2 className="section-title" style={{ fontSize: '0.9rem' }}>
        <div className="cube-icon" style={{ background: 'var(--accent-lavender-dim)' }}></div>
        Weekly Yield Heatmap
      </h2>
      <div className="heatmap-grid">
        <div></div>
        {days.map((day, idx) => (
          <div className="hm-header" key={idx}>{day}</div>
        ))}

        {Object.entries(data).map(([asset, values], idx) => (
          <>
            <div className="hm-label" key={`label-${idx}`}>{asset}</div>
            {values.map((val, vidx) => (
              <div className="hm-cell" key={`${idx}-${vidx}`} style={{ background: colors[asset][vidx] }}>
                {val}
              </div>
            ))}
          </>
        ))}
      </div>
      <div style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', fontWeight: '600', marginTop: '8px' }}>
        Darker = higher daily APY %
      </div>
    </div>
  );
}

export default function Analysis() {
  return (
    <div className="analysis-page">
      <Nav />

      <header className="page-header">
        <h1>AI INSIGHTS & STRATEGY</h1>
        <p style={{ color: 'var(--text-secondary)', fontWeight: '600' }}>
          Real-time regional intelligence and predictive yield modeling.
        </p>
      </header>

      <div className="analysis-grid">
        <div className="column" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <AllocationCard />
          <YieldPredictionsCard />
        </div>

        <div className="column" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <RiskSentimentCard />
          <RegionalFeedCard />
        </div>

        <div className="column">
          <ChatPanel />
        </div>
      </div>

      <StatPills />

      <div className="section-divider">
        <hr />
        <span>Market Sentiment & Analytics</span>
        <hr />
      </div>

      <div className="analytics-section">
        <YieldHistoryChart />

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
          <FearGreedMeter />
          <CorrelationMatrix />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
          <OnChainMetrics />
          <VolatilityChart />
          <YieldHeatmap />
        </div>
      </div>
    </div>
  );
}
