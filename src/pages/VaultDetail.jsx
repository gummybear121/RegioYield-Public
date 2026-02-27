import { useState } from 'react';
import { useParams, useNavigate, Link, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { usePrivy, useWallets } from '@privy-io/react-auth';
import SuccessModal from '../components/SuccessModal';
import WithdrawalModal from '../components/WithdrawalModal';

const poolData = {
  brz: {
    id: 'brz',
    name: 'BRZ Stablecoin',
    ticker: 'BRZ',
    contractAddress: '0x4eD141110F6EeeAbA9A1df36d8c26f684d2475Dc',
    decimals: 18,
    region: 'BR',
    regionClass: 'region-br',
    flagLargeClass: 'region-br',
    platform: 'Curve Finance',
    peg: 'BRL Pegged',
    regionFull: 'LATAM',
    tvl: '$142,402,190',
    apy: '8.92%',
    risk: 'A+',
    accent: 'gold',
    chartAccent: 'gold',
    protocol: 'Curve V2',
    tokenStandard: 'ERC-20',
    lpFee: '0.04%',
    inflation: '+3.2% Real',
    volatility: '0.08%',
    audit: 'VeriShield ✅',
    balance: '4,500.00 BRZ',
    projectedMonthly: '~32.40 BRZ',
    gasEstimate: '$4.12',
    protocolFee: '0.00%',
    aiInsight: 'BRZ liquidity is deepening in LATAM pools. High correlation with SELIC rates suggests yield stability for the next 45 days.',
  },
  jpyc: {
    id: 'jpyc',
    name: 'JPYC Coin',
    ticker: 'JPYC',
    contractAddress: '0x431D5dfF03120AFA4bDf332c61A6e1766eF37BDB',
    decimals: 18,
    region: 'JP',
    regionClass: 'region-jp',
    flagLargeClass: 'region-jp',
    platform: 'Uniswap V3',
    peg: 'JPY Pegged',
    regionFull: 'APAC',
    tvl: '$89,000,000',
    apy: '14.2%',
    risk: 'B+',
    accent: 'lavender',
    chartAccent: 'lavender',
    protocol: 'Uniswap V3',
    tokenStandard: 'ERC-20',
    lpFee: '0.30%',
    inflation: '+1.8% Real',
    volatility: '0.12%',
    audit: 'Halborn ✅',
    balance: '12,500.00 JPYC',
    projectedMonthly: '~148.00 JPYC',
    gasEstimate: '$6.50',
    protocolFee: '0.00%',
    aiInsight: 'JPYC pools show arbitrage opportunity due to recent forex volatility. Suggest allocation increase of 15%.',
  },
  eur: {
    id: 'eur',
    name: 'Euro Coin',
    ticker: 'EURC',
    contractAddress: null, // Not deployed on Polygon
    decimals: 6,
    region: 'EU',
    regionClass: 'region-eu',
    flagLargeClass: 'region-eu',
    platform: 'Aave V3',
    peg: 'EUR Pegged',
    regionFull: 'EMEA',
    tvl: '$620,000,000',
    apy: '4.5%',
    risk: 'A',
    accent: 'lavender',
    chartAccent: 'lavender',
    protocol: 'Aave V3',
    tokenStandard: 'ERC-20',
    lpFee: '0.09%',
    inflation: '+0.5% Real',
    volatility: '0.03%',
    audit: 'OpenZeppelin ✅',
    balance: '2,100.00 EURC',
    projectedMonthly: '~7.88 EURC',
    gasEstimate: '$5.25',
    protocolFee: '0.00%',
    aiInsight: 'EUR stablecoin shows lowest volatility. ECB rate cuts may increase yields in coming months.',
    note: 'Not on Polygon - available on Ethereum, Avalanche, Base',
  },
  xsgd: {
    id: 'xsgd',
    name: 'XSGD',
    ticker: 'XSGD',
    contractAddress: '0xDC3326e71D45186F113a2F448984CA0e8D201995',
    decimals: 6,
    region: 'SG',
    regionClass: 'region-jp',
    flagLargeClass: 'region-jp',
    platform: 'StraitsX',
    peg: 'SGD Pegged',
    regionFull: 'APAC',
    tvl: '$10,650,000',
    apy: '4.18%',
    risk: 'A',
    accent: 'lavender',
    chartAccent: 'lavender',
    protocol: 'StraitsX',
    tokenStandard: 'ERC-20',
    lpFee: '0.00%',
    inflation: '+0.1% Real',
    volatility: '0.01%',
    audit: 'Quantstamp ✅',
    balance: '0.00 XSGD',
    projectedMonthly: '~0.00 XSGD',
    gasEstimate: '$3.50',
    protocolFee: '0.00%',
    aiInsight: 'Singapore Dollar stablecoin backed 1:1 by SGD reserves. Licensed by MAS.',
  },
  xidr: {
    id: 'xidr',
    name: 'XIDR',
    ticker: 'XIDR',
    contractAddress: '0x2c826035c1C36986117A0e949bD6ad4baB54afE2',
    decimals: 6,
    region: 'ID',
    regionClass: 'region-jp',
    flagLargeClass: 'region-jp',
    platform: 'StraitsX',
    peg: 'IDR Pegged',
    regionFull: 'APAC',
    tvl: '$5,200,000',
    apy: '5.2%',
    risk: 'B+',
    accent: 'gold',
    chartAccent: 'gold',
    protocol: 'StraitsX',
    tokenStandard: 'ERC-20',
    lpFee: '0.00%',
    inflation: '+2.5% Real',
    volatility: '0.15%',
    audit: 'Quantstamp ✅',
    balance: '0.00 XIDR',
    projectedMonthly: '~0.00 XIDR',
    gasEstimate: '$3.50',
    protocolFee: '0.00%',
    aiInsight: 'Indonesian Rupiah stablecoin. Licensed by Bank Indonesia.',
  },
  real: {
    id: 'real',
    name: 'RealToken',
    ticker: 'REAL',
    region: 'BR',
    regionClass: 'region-br',
    flagLargeClass: 'region-br',
    platform: 'Balancer',
    peg: 'BRL Pegged',
    regionFull: 'LATAM',
    tvl: '$45,000,000',
    apy: '11.1%',
    risk: 'C+',
    accent: 'gold',
    chartAccent: 'gold',
    protocol: 'Balancer V2',
    tokenStandard: 'ERC-20',
    lpFee: '0.50%',
    inflation: '+3.2% Real',
    volatility: '0.18%',
    audit: 'Trail of Bits ✅',
    balance: '8,200.00 REAL',
    projectedMonthly: '~75.95 REAL',
    gasEstimate: '$8.00',
    protocolFee: '0.10%',
    aiInsight: 'Higher risk/reward profile. RealToken provides exposure to Brazilian real estate tokenization market.',
  },
  usdc: {
    id: 'usdc',
    name: 'USDC Reserve',
    ticker: 'USDC',
    region: 'US',
    regionClass: 'region-us',
    flagLargeClass: 'region-jp',
    platform: 'Aave V3',
    peg: 'USD Pegged',
    regionFull: 'Global',
    tvl: '$892,100,000',
    apy: '5.12%',
    risk: 'AA',
    accent: 'lavender',
    chartAccent: 'lavender',
    protocol: 'Aave V3',
    tokenStandard: 'ERC-20',
    lpFee: '0.09%',
    inflation: '+0.1% Real',
    volatility: '0.01%',
    audit: 'OpenZeppelin ✅',
    balance: '10,000.00 USDC',
    projectedMonthly: '~42.67 USDC',
    gasEstimate: '$5.50',
    protocolFee: '0.00%',
    aiInsight: 'USDC reserve offers highest stability with institutional-grade backing. Ideal for risk-averse allocations.',
  },
  ars: {
    id: 'ars',
    name: 'ARS Arbitrage',
    ticker: 'ARS',
    region: 'AR',
    regionClass: 'region-ar',
    flagLargeClass: 'region-br',
    platform: 'Uniswap V3',
    peg: 'ARS Pegged',
    regionFull: 'LATAM',
    tvl: '$12,800,000',
    apy: '24.5%',
    risk: 'B+',
    accent: 'gold',
    chartAccent: 'gold',
    protocol: 'Uniswap V3',
    tokenStandard: 'ERC-20',
    lpFee: '0.30%',
    inflation: '+140% Real',
    volatility: '2.5%',
    audit: 'CertiK ✅',
    balance: '5,000.00 ARS',
    projectedMonthly: '~102.08 ARS',
    gasEstimate: '$12.00',
    protocolFee: '0.15%',
    aiInsight: 'High volatility pool with significant arbitrage opportunities. Only for experienced traders.',
  },
  mxn: {
    id: 'mxn',
    name: 'MXN Liquidity',
    ticker: 'MXN',
    region: 'MX',
    regionClass: 'region-mx',
    flagLargeClass: 'region-br',
    platform: 'Curve Finance',
    peg: 'MXN Pegged',
    regionFull: 'LATAM',
    tvl: '$38,500,000',
    apy: '11.2%',
    risk: 'A-',
    accent: 'gold',
    chartAccent: 'gold',
    protocol: 'Curve V2',
    tokenStandard: 'ERC-20',
    lpFee: '0.04%',
    inflation: '+4.0% Real',
    volatility: '0.15%',
    audit: 'VeriShield ✅',
    balance: '15,000.00 MXN',
    projectedMonthly: '~140.00 MXN',
    gasEstimate: '$4.50',
    protocolFee: '0.00%',
    aiInsight: 'Mexican peso pools showing strong performance. Good diversification option for LATAM exposure.',
  },
  eth: {
    id: 'eth',
    name: 'ETH LST Basket',
    ticker: 'ETH',
    region: 'Ξ',
    regionClass: 'region-eth',
    flagLargeClass: 'region-jp',
    platform: 'Lido/Rocket',
    peg: 'ETH Pegged',
    regionFull: 'Global',
    tvl: '$1,200,000,000',
    apy: '3.95%',
    risk: 'A',
    accent: 'lavender',
    chartAccent: 'lavender',
    protocol: 'Lido + Rocket Pool',
    tokenStandard: 'ERC-20',
    lpFee: '0.10%',
    inflation: 'N/A',
    volatility: '0.05%',
    audit: 'Sigma Prime ✅',
    balance: '2.5 ETH',
    projectedMonthly: '~0.082 ETH',
    gasEstimate: '$15.00',
    protocolFee: '0.00%',
    aiInsight: 'ETH LST basket provides diversified staking yields. Excellent for long-term holders seeking yield on ETH holdings.',
  },
};

const chartBars = [45, 52, 48, 60, 75, 68, 82, 78, 85, 90, 88, 92];
const chartLabels = ['OCT 01', 'OCT 15', 'OCT 30'];
const timeFilters = ['1W', '1M', 'ALL'];

export default function VaultDetail() {
  const { poolId } = useParams();
  const navigate = useNavigate();
  const pool = poolData[poolId] || poolData.brz;
  const [activeTab, setActiveTab] = useState('Deposit');
  const [activeFilter, setActiveFilter] = useState('1M');
  const [showSuccess, setShowSuccess] = useState(false);
  const [showWithdrawal, setShowWithdrawal] = useState(false);
  const { isDark, toggleTheme } = useTheme();
  const { login, logout, user, ready } = usePrivy();
  const { wallets } = useWallets();

  const isConnected = ready && !!user;

  const formatAddress = (address) => address ? `${address.slice(0, 6)}...${address.slice(-4)}` : '';

  const switchToPolygon = async () => {
    const polygonChainId = '0x89'; // 137 in hex
    try {
      for (const wallet of wallets) {
        if (wallet.chainId !== polygonChainId) {
          await wallet.switchChain(polygonChainId);
        }
      }
    } catch (error) {
      console.log('Could not switch network automatically:', error);
    }
  };

  const handleLogin = async () => {
    await login();
    // Give a moment for wallet to be ready then switch to Polygon
    setTimeout(switchToPolygon, 500);
  };

  const navItems = [
    { label: 'Dashboard', path: '/app' },
    { label: 'Pools', path: '/pools' },
    { label: 'Analysis', path: '/analysis' },
    { label: 'Governance', path: '/governance' },
  ];
  const location = useLocation();

  return (
    <div className="layout">
      <nav className="nav">
        <Link to="/" className="brand" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div className="brand-icon"></div>
          RegioYield Protocol
        </Link>
        <div className="nav-links">
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.path}
              className={`nav-pill ${location.pathname === item.path ? 'active' : ''}`}
            >
              {item.label}
            </Link>
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div className="theme-toggle" onClick={toggleTheme}>
            <span id="theme-label">{isDark ? 'Dark' : 'Light'}</span>
            <div className="toggle-track">
              <div className="toggle-thumb"></div>
            </div>
          </div>
          {ready && user ? (
            <button className="wallet-btn" onClick={() => { switchToPolygon(); logout(); }}>
              {formatAddress(user.wallet?.address)}
            </button>
          ) : (
            <button className="wallet-btn" onClick={handleLogin}>
              Connect Wallet
            </button>
          )}
        </div>
      </nav>

      <main>
        <a className="back-btn" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
          ← Back to Overview
        </a>
        
        <section className="hero-section">
          <div className="vault-title-group">
            <div className={`region-flag-large ${pool.flagLargeClass}`}>
              {pool.region}
            </div>
            <div className="vault-name">
              <h1>{pool.name.toUpperCase()}</h1>
              <p>{pool.platform} • {pool.peg} • {pool.regionFull} Region</p>
            </div>
          </div>
          <p>
            Access high-yield opportunities in the {pool.regionFull} market. Connect your wallet to view live performance data, risk analytics, and manage your positions.
          </p>
        </section>

        <div className="content-overlay-container">
          {!isConnected && (
            <div className="connect-cta-overlay">
              <div className="cta-card">
                <div className="brand-icon" style={{ width: '40px', height: '40px', margin: '0 auto 24px', borderWidth: '2px' }}></div>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', marginBottom: '12px', textTransform: 'uppercase' }}>Wallet Connection Required</h2>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '32px' }}>Connect your Web3 wallet to start earning {pool.apy} APY on your {pool.ticker} stablecoins.</p>
                <button 
                  className="btn-primary btn-large" 
                  style={{ boxShadow: '6px 6px 0px var(--text-main)', marginTop: 'var(--spacing-md)' }}
                  onClick={login}
                >
                  Connect Wallet Now
                </button>
              </div>
            </div>
          )}

          <div className={isConnected ? 'content-grid' : 'blurred-content'}>
          <div className="main-column">
            <div className="card">
              <div className="stats-summary">
                <div className="stat-item">
                  <div className="stat-label">Current TVL</div>
                  <div className="stat-value">{pool.tvl}</div>
                </div>
                <div className="stat-item">
                  <div className="stat-label">Net APY</div>
                  <div className="stat-value" style={{ color: '#22c55e' }}>{pool.apy}</div>
                </div>
                <div className="stat-item">
                  <div className="stat-label">Risk Score</div>
                  <div className="stat-value">{pool.risk}</div>
                </div>
              </div>

              <div className="section-header">
                <div style={{ fontWeight: '700', display: 'flex', alignItems: 'center' }}>
                  <span className="cube-icon" style={{ background: pool.accent === 'gold' ? 'var(--accent-gold)' : 'var(--accent-lavender)' }}></span> 
                  Yield Performance (30D)
                </div>
                <div className="filter-group">
                  {timeFilters.map((filter) => (
                    <button
                      key={filter}
                      className={`nav-pill ${activeFilter === filter ? 'active' : ''}`}
                      style={{ padding: '4px 12px', fontSize: '0.7rem' }}
                      onClick={() => setActiveFilter(filter)}
                    >
                      {filter}
                    </button>
                  ))}
                </div>
              </div>

              <div className="chart-container">
                {chartBars.map((height, index) => (
                  <div
                    key={index}
                    className={`chart-bar ${pool.chartAccent === 'lavender' ? 'lavender' : ''} ${index === 11 ? 'active' : ''}`}
                    style={{ height: `${height}%` }}
                  ></div>
                ))}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '12px', fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: '600' }}>
                {chartLabels.map((label) => (
                  <span key={label}>{label}</span>
                ))}
              </div>
            </div>

            <div className="card">
              <div style={{ fontWeight: '700', marginBottom: 'var(--spacing-md)', display: 'flex', alignItems: 'center' }}>
                <span className="cube-icon" style={{ background: 'var(--accent-lavender)' }}></span> 
                Protocol Breakdown
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-lg)' }}>
                <div>
                  <div className="info-row">
                    <span className="info-label">Underlying Platform</span>
                    <span className="info-value">{pool.protocol}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Token Standard</span>
                    <span className="info-value">{pool.tokenStandard}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Liquidity Provider Fee</span>
                    <span className="info-value">{pool.lpFee}</span>
                  </div>
                </div>
                <div>
                  <div className="info-row">
                    <span className="info-label">Inflation Adjustment</span>
                    <span className="info-value" style={{ color: '#22c55e' }}>{pool.inflation}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Volatility (30D)</span>
                    <span className="info-value">{pool.volatility}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Smart Contract Audit</span>
                    <span className="info-value">{pool.audit}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="transaction-card">
            <div className="card">
              <div className="tab-group">
                <button 
                  className={`tab-btn ${activeTab === 'Deposit' ? 'active' : ''}`}
                  onClick={() => setActiveTab('Deposit')}
                >
                  Deposit
                </button>
                <button 
                  className={`tab-btn ${activeTab === 'Withdraw' ? 'active' : ''}`}
                  onClick={() => setActiveTab('Withdraw')}
                >
                  Withdraw
                </button>
              </div>
              
              <div className="input-group">
                <div style={{ display: 'flex', justifyContent: 'space-between', margin: '16px 0 8px', fontSize: '0.8rem', fontWeight: '600' }}>
                  <span>Amount</span>
                  <span style={{ color: 'var(--text-secondary)' }}>Balance: {pool.balance}</span>
                </div>
                <div className="input-wrapper">
                  <input type="text" className="vault-input" placeholder="0.00" />
                  <span className="input-suffix">{pool.ticker}</span>
                </div>
              </div>

              <div className="vault-details">
                <div className="info-row">
                  <span className="info-label">Projected Monthly</span>
                  <span className="info-value">{pool.projectedMonthly}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Gas Estimate</span>
                  <span className="info-value">{pool.gasEstimate}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Protocol Fee</span>
                  <span className="info-value">{pool.protocolFee}</span>
                </div>
              </div>

              <button 
                className="btn-primary" 
                style={{ width: '100%', padding: '16px', fontWeight: '700', boxShadow: '4px 4px 0px #000' }}
                onClick={() => activeTab === 'Deposit' ? setShowSuccess(true) : setShowWithdrawal(true)}
              >
                {activeTab === 'Deposit' ? 'Approve & Deposit' : 'Confirm Withdrawal'}
              </button>
            </div>

            <div className="card" style={{ background: pool.accent === 'gold' ? 'var(--accent-gold-dim)' : 'var(--accent-lavender-dim)' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: '700', textTransform: 'uppercase', marginBottom: '8px' }}>AI Insight</div>
              <p style={{ fontSize: '0.85rem', lineHeight: '1.5' }}>
                {pool.aiInsight}
              </p>
            </div>
          </div>
          </div>
        </div>
      </main>

      <SuccessModal 
        isOpen={showSuccess} 
        onClose={() => setShowSuccess(false)} 
        depositData={{
          amount: '4,000.00 BRZ',
          vault: `${pool.name} (${pool.platform})`
        }}
      />

      <WithdrawalModal 
        isOpen={showWithdrawal} 
        onClose={() => setShowWithdrawal(false)} 
        withdrawalData={{
          amount: '4,000.00 BRZ',
          vault: `${pool.name} (${pool.platform})`
        }}
      />
    </div>
  );
}
