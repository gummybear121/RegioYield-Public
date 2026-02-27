import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { usePrivy, useWallets } from '@privy-io/react-auth';

const markets = [
  { ticker: 'EURC', name: 'Euro Coin', tvl: '€14,204,992', strategy: 'Curve/Convex Loop', apy: '8.42%' },
  { ticker: 'BRZ', name: 'Brazilian Digital Token', tvl: 'R$45,100,230', strategy: 'Aave V3 Leverage', apy: '12.05%' },
  { ticker: 'JPYC', name: 'JPY Coin', tvl: '¥802,440,000', strategy: 'Uniswap V3 Delta Neutral', apy: '4.18%' },
];

export default function Landing() {
  const [hoveredMarket, setHoveredMarket] = useState(null);
  const { login, user, ready } = usePrivy();
  const { wallets } = useWallets();
  const navigate = useNavigate();

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

  const handleWalletClick = () => {
    if (ready && user) {
      switchToPolygon();
      navigate('/app');
    } else {
      login().then(() => setTimeout(switchToPolygon, 500));
    }
  };

  return (
    <div className="landing-page" style={{ 
      backgroundColor: '#7A33FF', 
      minHeight: '100vh',
      fontFamily: "'Inter', sans-serif",
      overflowY: 'auto',
      height: '100%'
    }}>
      <nav className="landing-nav">
        <div className="landing-nav-inner">
          <div className="landing-brand">
            <div style={{ 
              width: '24px', 
              height: '24px', 
              border: '1.5px solid #000', 
              transform: 'rotate(45deg)', 
              position: 'relative',
              background: 'transparent'
            }}>
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '8px',
                height: '8px',
                background: '#000'
              }}></div>
            </div>
            <span>RegioYield Protocol</span>
          </div>
          <div className="landing-nav-links">
            <Link to="/pools" className="type-label hover-opacity" style={{ textDecoration: 'none', color: '#000' }}>Markets</Link>
            <span className="type-label cursor-pointer hover-opacity">Governance</span>
            <span className="type-label cursor-pointer hover-opacity">Developers</span>
          </div>
          <div className="landing-nav-actions">
            <button 
              className="type-label hover-opacity" 
              style={{ 
                background: 'transparent', 
                border: 'none', 
                color: '#000', 
                cursor: 'pointer',
                fontFamily: "'Inter', sans-serif"
              }}
              onClick={handleWalletClick}
            >
              {ready && user ? 'Launch App' : 'Connect Wallet'}
            </button>
          </div>
        </div>
      </nav>

      <main className="landing-main">
        <section className="landing-hero">
          <div className="landing-hero-grid">
            <div className="landing-hero-left animate-enter">
              <h1 style={{ 
                fontFamily: "'Space Grotesk', sans-serif", 
                fontWeight: 700, 
                lineHeight: 0.85, 
                letterSpacing: '-0.04em', 
                textTransform: 'uppercase',
                fontSize: 'clamp(3rem, 14vw, 8rem)',
                marginBottom: '2rem'
              }}>
                LOCAL<br />
                YIELD<br />
                GLOBAL<br />
                SCALE
              </h1>
            </div>

            <div className="landing-hero-right animate-enter delay-100">
              <div className="landing-hero-text">
                <p className="hero-description">
                  The first decentralized liquidity layer for non-USD stablecoins. Earn native yield on EUR, JPY, and BRL.
                </p>
              </div>

              <div className="landing-hero-buttons">
                <Link 
                  to={ready && user ? '/app' : '#'} 
                  className="btn-brutal landing-btn"
                  style={{ animation: 'blink 1.5s infinite', textDecoration: 'none' }}
                  onClick={(e) => {
                    if (!(ready && user)) {
                      e.preventDefault();
                      login().then(() => setTimeout(switchToPolygon, 500));
                    } else {
                      switchToPolygon();
                    }
                  }}
                >
                  Launch App 
                  <span className="btn-arrow">→</span>
                </Link>
                <button className="btn-brutal landing-btn">
                  Documentation
                </button>
                <div className="landing-secured">
                  <span className="type-label">Secured by</span>
                  <span className="landing-secured-name">Polygon PoS</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="landing-problem-solution">
          <div className="landing-problem animate-enter delay-200">
            <span className="type-label">The Friction</span>
            <h2>USD Dominance creates FX Risk for 90% of the world.</h2>
            <p>
              Global DeFi is dollar-denominated. Local users lose 2-5% on conversion slippage and face constant currency exposure. Your yield should match your spending power.
            </p>
          </div>
          
          <div className="landing-solution animate-enter delay-300">
            <span className="type-label">The Solution</span>
            <h2>Native Stablecoin Vaults.</h2>
            <p>
              Mint and deposit BRZ, EURC, and JPYC directly. Zero conversion fees. Auto-compounding native yield strategies.
            </p>
          </div>
        </section>

        <section className="landing-markets">
          <div className="landing-markets-header">
            <h3>Markets</h3>
            <span className="type-label">Live APY</span>
          </div>

          {markets.map((market, idx) => (
            <div 
              key={market.ticker}
              className={`landing-market-row ${hoveredMarket === idx ? 'hovered' : ''}`}
              onMouseEnter={() => setHoveredMarket(idx)}
              onMouseLeave={() => setHoveredMarket(null)}
            >
              <div className="market-name">
                <span className="market-ticker">{market.ticker}</span>
                <span className="market-fullname">{market.name}</span>
              </div>
              <div className="market-tvl">
                <span className="type-label">TVL</span>
                <span className="market-value">{market.tvl}</span>
              </div>
              <div className="market-strategy">
                <span className="type-label">Strategy</span>
                <span className="strategy-name">{market.strategy}</span>
              </div>
              <div className="market-apy">
                <span className="apy-value">{market.apy}</span>
              </div>
            </div>
          ))}
        </section>

        <footer className="landing-footer">
          <div className="landing-footer-inner">
            <div className="landing-footer-left">
              <span className="type-label">System Status: <span className="status-ok">● OPERATIONAL</span></span>
              <span className="type-label">Block: 1402294</span>
            </div>
            
            <div className="landing-footer-right">
              <span className="type-label cursor-pointer hover-opacity">Twitter</span>
              <span className="type-label cursor-pointer hover-opacity">Discord</span>
              <span className="type-label cursor-pointer hover-opacity">Github</span>
            </div>
          </div>
        </footer>
        
        <div className="landing-footer-spacer"></div>
      </main>
    </div>
  );
}
