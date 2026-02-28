import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { usePrivy, useWallets } from '@privy-io/react-auth';

const markets = [
  { ticker: 'BRZ', name: 'Brazilian Real', tvl: '$142,402,190', strategy: 'Curve V2', apy: '8.92%' },
  { ticker: 'JPYC', name: 'Japanese Yen', tvl: '$89,000,000', strategy: 'Uniswap V3', apy: '14.2%' },
  { ticker: 'cNGN', name: 'Nigerian Naira', tvl: '$45,000,000', strategy: 'Aave V3', apy: '12.5%' },
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
      overflowX: 'hidden'
    }}>
      <nav style={{ 
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '80px',
        background: 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid #F3F4F6',
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 2rem'
      }}>
        <div style={{ width: '100%', maxWidth: '1280px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ 
              width: '32px', 
              height: '32px', 
              background: '#000', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              transform: 'rotate(45deg)'
            }}>
              <div style={{ width: '8px', height: '8px', background: '#fff', borderRadius: '50%' }}></div>
            </div>
            <span style={{ fontWeight: 800, fontSize: '1.25rem', letterSpacing: '-0.02em' }}>RegioYield</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
            <Link to="/pools" style={{ fontSize: '0.875rem', fontWeight: 600, color: '#666', cursor: 'pointer', textDecoration: 'none' }}>Protocol</Link>
            <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#666', cursor: 'pointer' }}>Governance</span>
            <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#666', cursor: 'pointer' }}>Security</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button style={{ background: 'transparent', border: '1px solid #E5E5E5', padding: '0.625rem 1.25rem', borderRadius: '2rem', fontSize: '0.875rem', fontWeight: 700, cursor: 'pointer' }}>Documentation</button>
            <button 
              onClick={handleWalletClick}
              style={{ background: '#000', color: '#fff', border: 'none', padding: '0.625rem 1.25rem', borderRadius: '2rem', fontSize: '0.875rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
            >
              {ready && user ? 'Launch App' : 'Connect Wallet'}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14m-7-7 7 7-7 7"/></svg>
            </button>
          </div>
        </div>
      </nav>

      <main>
        <section className="grid-bg" style={{ 
          minHeight: 'calc(100vh - 80px)', 
          padding: '100px 2rem 40px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <div style={{ width: '100%', maxWidth: '1280px', display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '4rem', alignItems: 'center' }}>
            <div style={{ gridColumn: 'span 6', display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
              <h1 style={{ 
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 'clamp(3rem, 6vw, 5.5rem)', 
                fontWeight: 700, 
                lineHeight: 1, 
                letterSpacing: '-0.04em',
                color: '#000'
              }}>
                GLOBAL<br />
                YIELDS,<br />
                <span style={{ color: '#9CA3AF' }}>LOCAL<br />
                CONTEXT.</span>
              </h1>

              <p style={{ fontSize: '1.25rem', color: '#666', lineHeight: 1.6, maxWidth: '540px' }}>
                The first aggregation layer for local stablecoin liquidity pools. Earn up to 14.2% APY on non-USD assets with automated delta-neutral hedging.
              </p>

              <div style={{ display: 'flex', gap: '1rem' }}>
                <button 
                  onClick={handleWalletClick}
                  style={{ background: '#000', color: '#fff', border: 'none', padding: '1.25rem 2.5rem', borderRadius: '3rem', fontSize: '1.125rem', fontWeight: 800, cursor: 'pointer', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
                >
                  Start Earning
                </button>
                <button style={{ background: '#fff', color: '#000', border: '1px solid #E5E5E5', padding: '1.25rem 2.5rem', borderRadius: '3rem', fontSize: '1.125rem', fontWeight: 800, cursor: 'pointer' }}>
                  How it works
                </button>
              </div>
            </div>

            <div style={{ gridColumn: 'span 6', position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              {/* Background Circular Visual */}
              <div style={{ 
                position: 'absolute', 
                width: '600px', 
                height: '600px', 
                background: 'radial-gradient(circle, rgba(243, 244, 246, 0.8) 0%, rgba(255, 255, 255, 0) 70%)',
                border: '1px solid #F3F4F6',
                borderRadius: '50%',
                zIndex: 0
              }}></div>

              {/* Main JPYC Strategy Card */}
              <div className="animate-float" style={{ 
                width: '420px', 
                background: '#fff', 
                border: '1px solid #E5E5E5', 
                borderRadius: '2.5rem', 
                padding: '2rem', 
                boxShadow: '0 40px 80px -20px rgba(0,0,0,0.15)',
                zIndex: 20,
                position: 'relative'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 800 }}>JP</div>
                    <div>
                      <div style={{ fontWeight: 800, fontSize: '1.25rem' }}>JPYC Strategy</div>
                      <div style={{ fontSize: '0.875rem', color: '#666' }}>Uniswap V3 • Tokyo</div>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ color: '#16A34A', fontWeight: 800, fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.25rem', justifyContent: 'flex-end' }}>↑ 14.2%</div>
                    <div style={{ fontSize: '0.75rem', color: '#999', fontWeight: 600 }}>Projected APY</div>
                  </div>
                </div>

                {/* Bars Chart */}
                <div style={{ height: '100px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '0.75rem', marginBottom: '2rem' }}>
                  <div style={{ flex: 1, background: '#F3F4F6', height: '40%', borderRadius: '4px' }}></div>
                  <div style={{ flex: 1, background: '#F3F4F6', height: '65%', borderRadius: '4px' }}></div>
                  <div style={{ flex: 1, background: '#F3F4F6', height: '50%', borderRadius: '4px' }}></div>
                  <div style={{ flex: 1, background: '#000', height: '90%', borderRadius: '4px' }}></div>
                  <div style={{ flex: 1, background: '#F3F4F6', height: '70%', borderRadius: '4px' }}></div>
                  <div style={{ flex: 1, background: '#F3F4F6', height: '60%', borderRadius: '4px' }}></div>
                  <div style={{ flex: 1, background: '#F3F4F6', height: '85%', borderRadius: '4px' }}></div>
                </div>

                <div style={{ display: 'flex', gap: '1rem' }}>
                  <div style={{ flex: 1, background: '#F9FAFB', borderRadius: '1.25rem', padding: '1.25rem', border: '1px solid #F3F4F6' }}>
                    <div style={{ fontSize: '0.65rem', color: '#999', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>Hedging</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', fontWeight: 700 }}>
                      <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#16A34A' }}></div>
                      Delta Neutral
                    </div>
                  </div>
                  <div style={{ flex: 1, background: '#F9FAFB', borderRadius: '1.25rem', padding: '1.25rem', border: '1px solid #F3F4F6' }}>
                    <div style={{ fontSize: '0.65rem', color: '#999', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>Risk Score</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', fontWeight: 700 }}>
                      <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#16A34A' }}></div>
                      Low (A+)
                    </div>
                  </div>
                </div>
              </div>

              {/* Smaller floating card: Regions */}
              <div className="animate-float" style={{ 
                position: 'absolute', 
                bottom: '-15%', 
                left: '-25%', 
                background: '#fff', 
                border: '1px solid #E5E5E5', 
                borderRadius: '1.5rem', 
                padding: '1.25rem', 
                boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                zIndex: 30,
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                animationDelay: '1s'
              }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#E0E7FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4F46E5" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                </div>
                <div>
                  <div style={{ fontSize: '0.65rem', fontWeight: 800, color: '#999', textTransform: 'uppercase' }}>Regions</div>
                  <div style={{ fontWeight: 800, fontSize: '1.125rem' }}>Global Coverage</div>
                </div>
              </div>

              {/* Smaller floating card: Compounding */}
              <div className="animate-float" style={{ 
                position: 'absolute', 
                top: '5%', 
                right: '-25%', 
                background: '#fff', 
                border: '1px solid #E5E5E5', 
                borderRadius: '1.5rem', 
                padding: '1.25rem', 
                boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                zIndex: 10,
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                animationDelay: '2s'
              }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#FEF3C7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#D97706" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                </div>
                <div>
                  <div style={{ fontSize: '0.65rem', fontWeight: 800, color: '#999', textTransform: 'uppercase' }}>Auto-Compound</div>
                  <div style={{ fontWeight: 800, fontSize: '1.125rem' }}>Every 4 Hours</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Scrolling Ticker */}
        <div style={{ borderTop: '1px solid #E5E5E5', borderBottom: '1px solid #E5E5E5', background: '#fff', padding: '1.5rem 0', overflow: 'hidden' }}>
          <div style={{ display: 'flex', whiteSpace: 'nowrap', animation: 'ticker 40s linear infinite' }}>
            {[...markets, ...markets, ...markets].map((market, idx) => (
              <div key={idx} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', marginRight: '3rem', opacity: 0.8 }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#16A34A' }}></span>
                <span style={{ fontWeight: 700, fontSize: '1.125rem', color: '#000' }}>{market.ticker} Pool</span>
                <span style={{ background: '#000', color: '#fff', fontSize: '0.75rem', padding: '0.25rem 0.5rem', borderRadius: '9999px', fontFamily: 'monospace' }}>{market.apy} APY</span>
              </div>
            ))}
          </div>
        </div>

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

        {/* What It Does */}
        <section style={{ padding: '5rem 1.5rem', background: '#fff', borderTop: '1px solid #E5E5E5' }}>
          <div style={{ maxWidth: '80rem', margin: '0 auto' }}>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '2.5rem', fontWeight: 700, marginBottom: '3rem', color: '#000' }}>What It Does</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
              <div style={{ padding: '1.5rem', background: '#F9FAFB', borderRadius: '1rem', border: '1px solid #E5E5E5' }}>
                <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>🌍</div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem', color: '#000' }}>Local Yield, Global Scale</h3>
                <p style={{ color: '#666', lineHeight: 1.6 }}>Earn yield on your local currency stablecoins. No conversions, no slippage, just pure yield.</p>
              </div>
              <div style={{ padding: '1.5rem', background: '#F9FAFB', borderRadius: '1rem', border: '1px solid #E5E5E5' }}>
                <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>⚡</div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem', color: '#000' }}>Auto-Compounding</h3>
                <p style={{ color: '#666', lineHeight: 1.6 }}>Automated yield strategies that compound every 4 hours. Set it and forget it.</p>
              </div>
              <div style={{ padding: '1.5rem', background: '#F9FAFB', borderRadius: '1rem', border: '1px solid #E5E5E5' }}>
                <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>📊</div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem', color: '#000' }}>Real-Time Analytics</h3>
                <p style={{ color: '#666', lineHeight: 1.6 }}>Live APY, TVL, and risk scores for informed decision making.</p>
              </div>
            </div>
          </div>
        </section>

        {/* The Problem It Solves */}
        <section style={{ padding: '5rem 1.5rem', background: '#000', color: '#fff' }}>
          <div style={{ maxWidth: '80rem', margin: '0 auto' }}>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '2.5rem', fontWeight: 700, marginBottom: '3rem' }}>The Problem It Solves</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
              <div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem', color: '#fff' }}>USD Dominance</h3>
                <p style={{ color: '#999', lineHeight: 1.8, fontSize: '1.125rem' }}>Global DeFi is dollar-denominated. Local users lose 2-5% on conversion slippage and face constant currency exposure.</p>
              </div>
              <div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem', color: '#fff' }}>FX Risk</h3>
                <p style={{ color: '#999', lineHeight: 1.8, fontSize: '1.125rem' }}>Your yield should match your spending power. Stop losing money to currency fluctuations.</p>
              </div>
              <div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem', color: '#fff' }}>Technical Complexity</h3>
                <p style={{ color: '#999', lineHeight: 1.8, fontSize: '1.125rem' }}>Multiple chains, bridges, and AMMs create barriers to entry and security risks.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Technologies Used */}
        <section style={{ padding: '5rem 1.5rem', background: '#F9FAFB', borderTop: '1px solid #E5E5E5' }}>
          <div style={{ maxWidth: '80rem', margin: '0 auto', textAlign: 'center' }}>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '2.5rem', fontWeight: 700, marginBottom: '3rem', color: '#000' }}>Technologies Used</h2>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '3rem', flexWrap: 'wrap' }}>
              <div style={{ padding: '1.5rem 2rem', background: '#fff', borderRadius: '1rem', border: '1px solid #E5E5E5', minWidth: '150px' }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>⚛️</div>
                <div style={{ fontWeight: 700, color: '#000' }}>React + Vite</div>
              </div>
              <div style={{ padding: '1.5rem 2rem', background: '#fff', borderRadius: '1rem', border: '1px solid #E5E5E5', minWidth: '150px' }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🔐</div>
                <div style={{ fontWeight: 700, color: '#000' }}>Privy</div>
              </div>
              <div style={{ padding: '1.5rem 2rem', background: '#fff', borderRadius: '1rem', border: '1px solid #E5E5E5', minWidth: '150px' }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>⬡</div>
                <div style={{ fontWeight: 700, color: '#000' }}>Polygon PoS</div>
              </div>
              <div style={{ padding: '1.5rem 2rem', background: '#fff', borderRadius: '1rem', border: '1px solid #E5E5E5', minWidth: '150px' }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📈</div>
                <div style={{ fontWeight: 700, color: '#000' }}>Viem</div>
              </div>
            </div>
          </div>
        </section>

        {/* What's Next */}
        <section style={{ padding: '5rem 1.5rem', background: '#fff', borderTop: '1px solid #E5E5E5' }}>
          <div style={{ maxWidth: '80rem', margin: '0 auto', textAlign: 'center' }}>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '2.5rem', fontWeight: 700, marginBottom: '1.5rem', color: '#000' }}>What's Next for RegioYield</h2>
            <p style={{ color: '#666', fontSize: '1.25rem', maxWidth: '600px', margin: '0 auto 3rem', lineHeight: 1.6 }}>
              Expanding to more regions, adding more stablecoins, and building cross-chain liquidity pools. Join us in revolutionizing global DeFi access.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              <span style={{ padding: '0.5rem 1rem', background: '#F3F4F6', borderRadius: '9999px', color: '#666', fontSize: '0.875rem' }}>More Regions</span>
              <span style={{ padding: '0.5rem 1rem', background: '#F3F4F6', borderRadius: '9999px', color: '#666', fontSize: '0.875rem' }}>Cross-Chain</span>
              <span style={{ padding: '0.5rem 1rem', background: '#F3F4F6', borderRadius: '9999px', color: '#666', fontSize: '0.875rem' }}>Governance Token</span>
              <span style={{ padding: '0.5rem 1rem', background: '#F3F4F6', borderRadius: '9999px', color: '#666', fontSize: '0.875rem' }}>Mobile App</span>
            </div>
          </div>
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
