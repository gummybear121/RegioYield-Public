import { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import Nav from '../components/Nav';

const poolData = [
  {
    id: 1,
    poolId: 'brz',
    region: 'BR',
    regionClass: 'region-br',
    name: 'BRZ Stablecoin',
    platform: 'Curve Finance',
    regionFull: 'LATAM',
    apy: '8.92%',
    tvl: '$142.4M',
    risk: 'A+',
    accent: 'gold',
    status: 'Live Monitoring',
  },
  {
    id: 2,
    poolId: 'usdc',
    region: 'US',
    regionClass: 'region-us',
    name: 'USDC Reserve',
    platform: 'Aave V3',
    regionFull: 'Global',
    apy: '5.12%',
    tvl: '$892.1M',
    risk: 'AA',
    accent: 'lavender',
    status: 'Live Monitoring',
  },
  {
    id: 3,
    poolId: 'eur',
    region: 'EU',
    regionClass: 'region-eu',
    name: 'Euro Stable',
    platform: 'Balancer',
    regionFull: 'EMEA',
    apy: '4.85%',
    tvl: '$64.2M',
    risk: 'A',
    accent: 'green',
    status: 'Live Monitoring',
  },
  {
    id: 4,
    poolId: 'ars',
    region: 'AR',
    regionClass: 'region-ar',
    name: 'ARS Arbitrage',
    platform: 'Uniswap V3',
    regionFull: 'LATAM',
    apy: '24.5%',
    tvl: '$12.8M',
    risk: 'B+',
    accent: 'gold',
    status: 'High Volatility',
    riskBg: '#e11d48',
  },
  {
    id: 5,
    poolId: 'mxn',
    region: 'MX',
    regionClass: 'region-mx',
    name: 'MXN Liquidity',
    platform: 'Curve Finance',
    regionFull: 'LATAM',
    apy: '11.2%',
    tvl: '$38.5M',
    risk: 'A-',
    accent: 'gold',
    status: 'Live Monitoring',
  },
  {
    id: 6,
    poolId: 'eth',
    region: 'Ξ',
    regionClass: 'region-eth',
    name: 'ETH LST Basket',
    platform: 'Lido/Rocket',
    regionFull: 'Global',
    apy: '3.95%',
    tvl: '$1.2B',
    risk: 'A',
    accent: 'lavender',
    status: 'Live Monitoring',
  },
];

const filters = ['All Markets', 'Stablecoins', 'LATAM', 'EMEA'];

export default function Pools() {
  const [activeFilter, setActiveFilter] = useState('All Markets');
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const filteredPools = poolData.filter(pool => {
    const matchesSearch = pool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         pool.platform.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         pool.regionFull.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const getAccentColor = (accent) => {
    switch(accent) {
      case 'gold': return 'var(--accent-gold)';
      case 'lavender': return 'var(--accent-lavender)';
      case 'green': return '#80e0a0';
      default: return 'var(--accent-gold)';
    }
  };

  return (
    <div className="layout">
      <Nav />
      
      <header className="page-header">
        <h1>YIELD POOLS</h1>
        <p style={{ color: 'var(--text-secondary)', fontWeight: '500' }}>
          Discover institutional-grade liquidity vaults across global markets.
        </p>
      </header>

      <div className="filter-bar">
        <input 
          type="text" 
          className="search-input" 
          placeholder="Search by asset, protocol or region..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div style={{ display: 'flex', gap: '8px' }}>
          {filters.map((filter) => (
            <button
              key={filter}
              className={`nav-pill ${activeFilter === filter ? 'active' : ''}`}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      <main className="pools-grid">
        {filteredPools.map((pool) => (
          <div 
            key={pool.id}
            className="pool-card"
            onClick={() => navigate(`/vault/${pool.poolId}`)}
            style={{ cursor: 'pointer' }}
          >
            <div className="pool-card-header">
              <div className="pool-identity">
                <div 
                  className="region-flag-sm" 
                  style={{ background: getAccentColor(pool.accent) }}
                >
                  {pool.region}
                </div>
                <div className="pool-title">
                  <h3>{pool.name.toUpperCase()}</h3>
                  <p>{pool.platform} • {pool.regionFull}</p>
                </div>
              </div>
              <div 
                className="risk-tag"
                style={pool.riskBg ? { background: pool.riskBg } : {}}
              >
                {pool.risk}
              </div>
            </div>
            <div className="pool-metrics">
              <div className="metric-item">
                <div className="label">Net APY</div>
                <div className="value" style={{ color: '#22c55e' }}>{pool.apy}</div>
              </div>
              <div className="metric-item">
                <div className="label">TVL</div>
                <div className="value">{pool.tvl}</div>
              </div>
            </div>
            <div className="pool-footer">
              <div className="status-pill">
                <span 
                  className="status-dot"
                  style={pool.status === 'High Volatility' ? { background: '#fbbf24' } : {}}
                ></span> 
                {pool.status}
              </div>
              <div 
                className="cube-icon-sm"
                style={{ background: getAccentColor(pool.accent) }}
              ></div>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}
