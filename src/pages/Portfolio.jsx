import { useNavigate } from 'react-router-dom';
import Nav from '../components/Nav';

const portfolioData = [
  {
    id: 1,
    poolId: 'brz',
    region: 'BR',
    name: 'BRZ Stablecoin',
    platform: 'Curve Finance',
    regionFull: 'LATAM',
    positionValue: '$0.00',
    positionAmount: '0 BRZ',
    earnings: '$0.00',
    apy: '8.92%',
    sparkline: [40, 55, 45, 70, 85, 75, 95],
    accent: 'gold',
  },
  {
    id: 2,
    poolId: 'jpyc',
    region: 'JP',
    name: 'JPYC Coin',
    platform: 'Uniswap V3',
    regionFull: 'APAC',
    positionValue: '$0.00',
    positionAmount: '0 JPYC',
    earnings: '$0.00',
    apy: '14.20%',
    sparkline: [70, 65, 80, 75, 85, 90, 98],
    accent: 'lavender',
  },
  {
    id: 3,
    poolId: 'xsgd',
    region: 'SG',
    name: 'XSGD',
    platform: 'StraitsX',
    regionFull: 'APAC',
    positionValue: '$0.00',
    positionAmount: '0 XSGD',
    earnings: '$0.00',
    apy: '4.18%',
    sparkline: [30, 32, 28, 35, 33, 38, 40],
    accent: 'lavender',
  },
  {
    id: 4,
    poolId: 'xidr',
    region: 'ID',
    name: 'XIDR',
    platform: 'StraitsX',
    regionFull: 'APAC',
    positionValue: '$0.00',
    positionAmount: '0 XIDR',
    earnings: '$0.00',
    apy: '5.20%',
    sparkline: [25, 30, 35, 40, 38, 42, 45],
    accent: 'gold',
  },
];

const allocationData = [
  { name: 'BRZ Stablecoin', pct: 50, color: 'var(--accent-gold)' },
  { name: 'Euro-E Vault', pct: 29, color: 'var(--accent-lavender)' },
  { name: 'USDC Delta', pct: 21, color: '#D1D5DB' },
];

const apyData = [
  { name: 'Euro-E Vault', apy: 14.20, color: 'var(--accent-lavender)' },
  { name: 'BRZ Stablecoin', apy: 8.92, color: 'var(--accent-gold)' },
  { name: 'USDC Delta Neutral', apy: 6.50, color: '#D1D5DB' },
];

export default function Portfolio() {
  const navigate = useNavigate();

  const getAccentColor = (accent) => {
    switch(accent) {
      case 'gold': return 'var(--accent-gold)';
      case 'lavender': return 'var(--accent-lavender)';
      case 'gray': return '#E8E8E8';
      default: return 'var(--accent-gold)';
    }
  };

  return (
    <div className="layout">
      <Nav />
      
      <header className="dashboard-header">
        <h1>MY PORTFOLIO</h1>
      </header>

      <div className="summary-grid">
        <div className="card summary-card">
          <div className="stat-label">Total Net Worth</div>
          <div className="stat-value">$284,912.40</div>
        </div>
        <div className="card summary-card" style={{ borderLeft: '4px solid var(--accent-gold)' }}>
          <div className="stat-label">Unrealized Yield</div>
          <div className="stat-value trend-up">+$4,102.12</div>
        </div>
        <div className="card summary-card">
          <div className="stat-label">Avg. Net APY</div>
          <div className="stat-value">11.42%</div>
        </div>
        <div className="card summary-card" style={{ background: 'var(--text-main)', color: 'var(--bg-color)' }}>
          <div className="stat-label" style={{ color: 'rgba(255,255,255,0.6)' }}>Projected Annual</div>
          <div className="stat-value">$32,536</div>
        </div>
      </div>

      <div className="charts-row">
        <div className="chart-card">
          <div className="chart-label">
            <span className="cube-icon" style={{ width: '12px', height: '12px', marginRight: 0 }}></span> 
            Allocation Breakdown
          </div>
          <div className="donut-wrap">
            <svg className="donut-svg" width="150" height="150" viewBox="0 0 150 150">
              <circle cx="75" cy="75" r="55" fill="none" stroke="var(--border-color)" strokeWidth="26"></circle>
              <circle cx="75" cy="75" r="55" fill="none" stroke="var(--accent-gold)" strokeWidth="26" strokeDasharray="172.8 345.6" strokeDashoffset="86.4" strokeLinecap="butt"></circle>
              <circle cx="75" cy="75" r="55" fill="none" stroke="var(--accent-lavender)" strokeWidth="26" strokeDasharray="100.2 345.6" strokeDashoffset="-86.4" strokeLinecap="butt"></circle>
              <circle cx="75" cy="75" r="55" fill="none" stroke="#D1D5DB" strokeWidth="26" strokeDasharray="72.6 345.6" strokeDashoffset="-186.6" strokeLinecap="butt"></circle>
              <text x="75" y="69" textAnchor="middle" fontFamily="Impact, Arial Black, sans-serif" fontSize="20" fill="var(--text-main)">3</text>
              <text x="75" y="86" textAnchor="middle" fontFamily="-apple-system, sans-serif" fontSize="9" fill="var(--text-secondary)" fontWeight="700" letterSpacing="0.5">VAULTS</text>
            </svg>
            <div className="donut-legend">
              {allocationData.map((item, index) => (
                <div key={index} className="legend-row">
                  <div className="legend-left">
                    <span className="legend-dot" style={{ background: item.color }}></span>
                    <span className="legend-name">{item.name}</span>
                  </div>
                  <span className="legend-pct">{item.pct}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="chart-card">
          <div className="chart-label">
            <span className="cube-icon" style={{ width: '12px', height: '12px', marginRight: 0 }}></span> 
            APY by Vault
          </div>
          <div className="bar-chart-rows">
            {apyData.map((item, index) => (
              <div key={index} className="bar-row">
                <div className="bar-meta">
                  <span className="bar-asset">{item.name}</span>
                  <span className="bar-apy">{item.apy}%</span>
                </div>
                <div className="bar-track">
                  <div className="bar-fill" style={{ width: `${(item.apy / 14.2) * 100}%`, background: item.color }}></div>
                </div>
              </div>
            ))}
            <div style={{ marginTop: '8px', paddingTop: '12px', borderTop: '1px dashed var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', fontWeight: '600' }}>Blended Avg. APY</span>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem' }}>11.42%</span>
            </div>
          </div>
        </div>
      </div>

      <div className="ai-banner">
        <div className="insight-tag">AI Insight</div>
        <p style={{ fontSize: '0.9rem', fontWeight: '500' }}>
          Your exposure to BRZ is optimal. Consider rebalancing 5% of USDC into Euro-E for better currency diversification this quarter.
        </p>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 'var(--spacing-md)' }}>
        <div style={{ fontWeight: '700', display: 'flex', alignItems: 'center' }}>
          <span className="cube-icon"></span> Active Vault Positions
        </div>
        <div className="nav-pill" style={{ fontSize: '0.8rem', padding: '4px 12px' }}>Manage Assets</div>
      </div>

      <table className="portfolio-table">
        <thead>
          <tr>
            <th>Asset & Protocol</th>
            <th>Position Value</th>
            <th>Earnings (30D)</th>
            <th>APY</th>
            <th>Performance</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {portfolioData.map((item) => (
            <tr 
              key={item.id} 
              className="vault-row"
              onClick={() => navigate(`/vault/${item.poolId}`)}
            >
              <td>
                <div className="asset-info">
                  <div className="asset-icon" style={{ background: getAccentColor(item.accent) }}>
                    {item.region}
                  </div>
                  <div>
                    <div className="asset-name">{item.name}</div>
                    <div className="asset-subtitle">{item.platform} • {item.regionFull}</div>
                  </div>
                </div>
              </td>
              <td>
                <div style={{ fontWeight: '700' }}>{item.positionValue}</div>
                <div className="asset-subtitle">{item.positionAmount}</div>
              </td>
              <td className="trend-up" style={{ fontWeight: '700' }}>{item.earnings}</td>
              <td style={{ fontWeight: '700' }}>{item.apy}</td>
              <td>
                <div className="sparkline">
                  {item.sparkline.map((height, i) => (
                    <div 
                      key={i} 
                      className="spark-bar" 
                      style={{ 
                        height: `${height}%`,
                        background: i === item.sparkline.length - 1 ? getAccentColor(item.accent) : 'var(--accent-gold-dim)'
                      }}
                    ></div>
                  ))}
                </div>
              </td>
              <td style={{ textAlign: 'right' }}>
                <div className="nav-pill" style={{ display: 'inline-block', padding: '4px 12px', fontSize: '0.75rem' }}>Details →</div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
