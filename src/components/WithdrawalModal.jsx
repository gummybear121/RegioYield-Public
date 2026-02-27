import { useEffect, useState } from 'react';

export default function WithdrawalModal({ isOpen, onClose, withdrawalData }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const timelinePoints = [
    { date: 'TODAY', yield: 'Initiated', active: true },
    { date: 'EST. 5 MIN', yield: 'Pending', active: false },
    { date: 'EST. 10 MIN', yield: 'Arrived', active: false },
  ];

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0,0,0,0.6)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: '20px',
      }}
      onClick={onClose}
    >
      <div className="success-modal" onClick={e => e.stopPropagation()}>
        <Confetti />
        
        <div className="check-container" style={{ background: 'var(--accent-gold)' }}>
          <span className="check-icon">↓</span>
        </div>
        
        <h2>WITHDRAWAL SUCCESS</h2>
        <p className="subtitle">Your funds are on their way back</p>
        
        <div className="summary-card">
          <div className="summary-row">
            <span className="summary-label">Amount Withdrawn</span>
            <span className="summary-value">{withdrawalData?.amount || '4,000.00 BRZ'}</span>
          </div>
          <div className="summary-row">
            <span className="summary-label">Vault</span>
            <span className="summary-value">{withdrawalData?.vault || 'BRZ Stablecoin (Curve)'}</span>
          </div>
          <div className="summary-row">
            <span className="summary-label">Transaction ID</span>
            <span className="summary-value" style={{ fontFamily: 'monospace' }}>0x3a4...f92b</span>
          </div>
        </div>

        <div className="timeline-container">
          <div className="timeline-label">
            <span className="cube-icon" style={{ background: 'var(--accent-lavender)' }}></span> Funds Return Timeline
          </div>
          <div className="timeline-track">
            {timelinePoints.map((point, index) => (
              <div key={index} className="timeline-point">
                <div className={`timeline-dot ${point.active ? 'active' : ''}`}></div>
                <div className="timeline-date">{point.date}</div>
                <div className={`timeline-yield ${point.active ? 'highlight' : ''}`}>{point.yield}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="action-group">
          <button className="btn btn-outline">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="2" y1="12" x2="22" y2="12"></line>
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
            </svg>
            View on Explorer
          </button>
          <button className="btn btn-black" onClick={onClose}>
            Back to Vault
          </button>
        </div>
      </div>
    </div>
  );
}

function Confetti() {
  const colors = ['var(--accent-gold)', 'var(--accent-lavender)', 'var(--success-green)'];
  const confettiPieces = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    color: colors[i % 3],
    delay: Math.random() * 0.5,
    duration: 1 + Math.random(),
  }));

  return (
    <>
      {confettiPieces.map((piece) => (
        <div
          key={piece.id}
          className="confetti"
          style={{
            left: `${piece.left}%`,
            top: `${piece.top}%`,
            background: piece.color,
            animation: `confettiFall ${piece.duration}s ease-out ${piece.delay}s forwards`,
          }}
        />
      ))}
      <style>{`
        @keyframes confettiFall {
          0% { transform: translate(0, 0) rotate(0); opacity: 1; }
          100% { transform: translate(${(Math.random() - 0.5) * 200}px, ${(Math.random() - 0.5) * 200}px) rotate(${Math.random() * 360}deg); opacity: 0; }
        }
      `}</style>
    </>
  );
}
