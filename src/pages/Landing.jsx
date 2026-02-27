import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { usePrivy, useWallets } from '@privy-io/react-auth';

const markets = [
  { ticker: 'BRZ', name: 'Brazilian Real', tvl: '$142,402,190', strategy: 'Curve V2', apy: '8.92%' },
  { ticker: 'JPYC', name: 'Japanese Yen', tvl: '$89,000,000', strategy: 'Uniswap V3', apy: '14.2%' },
  { ticker: 'XSGD', name: 'Singapore Dollar', tvl: '$10,650,000', strategy: 'StraitsX', apy: '4.18%' },
  { ticker: 'XIDR', name: 'Indonesian Rupiah', tvl: '$5,200,000', strategy: 'StraitsX', apy: '5.2%' },
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
      backgroundColor: '#FFFFFF', 
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
              background: '#000'
            }}>
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '8px',
                height: '8px',
                background: '#fff',
                borderRadius: '50%'
              }}></div>
            </div>
            <span style={{ color: '#000' }}>RegioYield Protocol</span>
          </div>
          <div className="landing-nav-links">
            <Link to="/pools" className="type-label hover-invert" style={{ textDecoration: 'none', color: '#666' }}>Markets</Link>
            <span className="type-label cursor-pointer hover-invert" style={{ color: '#666' }}>Governance</span>
            <span className="type-label cursor-pointer hover-invert" style={{ color: '#666' }}>Developers</span>
          </div>
          <div className="landing-nav-actions">
            <button 
              className="type-label hover-opacity" 
              style={{ 
                background: '#000', 
                border: 'none', 
                color: '#fff', 
                cursor: 'pointer',
                fontFamily: "'Inter', sans-serif",
                padding: '0.5rem 1rem',
                borderRadius: '2rem'
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
                marginBottom: '2rem',
                color: '#000'
              }}>
                LOCAL<br />
                YIELD<br />
                GLOBAL<br />
                SCALE
              </h1>
            </div>

            <div className="landing-hero-right animate-enter delay-100">
              <div className="landing-hero-text">
                <p className="hero-description" style={{ color: '#666' }}>
                  The first decentralized liquidity layer for non-USD stablecoins. Earn native yield on EUR, JPY, and BRL.
                </p>
              </div>

              <div className="landing-hero-buttons">
                <Link 
                  to={ready && user ? '/app' : '#'} 
                  className="btn-brutal landing-btn"
                  style={{ animation: 'blink 1.5s infinite', textDecoration: 'none', background: '#000', color: '#fff', border: '1px solid #000' }}
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
                <button className="btn-brutal landing-btn" style={{ background: '#fff', color: '#000', border: '1px solid #E5E5E5' }}>
                  Documentation
                </button>
                <div className="landing-secured">
                  <span className="type-label" style={{ color: '#999' }}>Secured by</span>
                  <span className="landing-secured-name" style={{ color: '#666' }}>Polygon PoS</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="landing-problem-solution">
          <div className="landing-problem animate-enter delay-200" style={{ background: '#F9FAFB', border: '1px solid #E5E5E5' }}>
            <span className="type-label" style={{ color: '#666' }}>The Friction</span>
            <h2 style={{ color: '#000' }}>USD Dominance creates FX Risk for 90% of the world.</h2>
            <p style={{ color: '#666' }}>
              Global DeFi is dollar-denominated. Local users lose 2-5% on conversion slippage and face constant currency exposure. Your yield should match your spending power.
            </p>
          </div>
          
          <div className="landing-solution animate-enter delay-300" style={{ background: '#000', color: '#fff', border: '1px solid #000' }}>
            <span className="type-label hover-invert-light" style={{ color: '#999', cursor: 'pointer' }}>The Solution</span>
            <h2 className="hover-invert-light" style={{ color: '#fff', cursor: 'pointer' }}>Native Stablecoin Vaults.</h2>
            <p className="hover-invert-light" style={{ color: '#999', cursor: 'pointer' }}>
              Mint and deposit BRZ, EURC, and JPYC directly. Zero conversion fees. Auto-compounding native yield strategies.
            </p>
          </div>
        </section>

        <section className="landing-markets" style={{ background: '#FFFFFF' }}>
          <div className="landing-markets-header">
            <h3 style={{ color: '#000' }}>Markets</h3>
            <span className="type-label" style={{ color: '#666' }}>Live APY</span>
          </div>

          {markets.map((market, idx) => (
            <div 
              key={market.ticker}
              className={`landing-market-row ${hoveredMarket === idx ? 'hovered' : ''}`}
              onMouseEnter={() => setHoveredMarket(idx)}
              onMouseLeave={() => setHoveredMarket(null)}
              style={{ borderBottom: '1px solid #E5E5E5' }}
            >
              <div className="market-name">
                <span className="market-ticker" style={{ color: '#000' }}>{market.ticker}</span>
                <span className="market-fullname" style={{ color: '#666' }}>{market.name}</span>
              </div>
              <div className="market-tvl">
                <span className="type-label" style={{ color: '#999' }}>TVL</span>
                <span className="market-value" style={{ color: '#000' }}>{market.tvl}</span>
              </div>
              <div className="market-strategy">
                <span className="type-label" style={{ color: '#999' }}>Strategy</span>
                <span className="strategy-name" style={{ color: '#666' }}>{market.strategy}</span>
              </div>
              <div className="market-apy">
                <span className="apy-value" style={{ color: '#16A34A' }}>{market.apy}</span>
              </div>
            </div>
          ))}
        </section>

        <footer className="landing-footer" style={{ background: '#F9FAFB', borderTop: '1px solid #E5E5E5' }}>
          <div className="landing-footer-inner">
            <div className="landing-footer-left">
              <span className="type-label" style={{ color: '#666' }}>System Status: <span className="status-ok" style={{ color: '#16A34A' }}>● OPERATIONAL</span></span>
              <span className="type-label" style={{ color: '#999' }}>Block: 1402294</span>
            </div>
            
            <div className="landing-footer-right">
              <span className="type-label cursor-pointer hover-invert" style={{ color: '#666' }}>Twitter</span>
              <span className="type-label cursor-pointer hover-invert" style={{ color: '#666' }}>Discord</span>
              <span className="type-label cursor-pointer hover-invert" style={{ color: '#666' }}>Github</span>
            </div>
          </div>
        </footer>
        
        <div className="landing-footer-spacer"></div>
      </main>
    </div>
  );
}
