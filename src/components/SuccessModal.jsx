import { useEffect, useState } from 'react';

export default function SuccessModal({ isOpen, onClose, depositData }) {
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShowConfetti(true);
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
    { date: 'TODAY', yield: 'Start', completed: true },
    { date: 'DEC 15', yield: '+31.2 BRZ', completed: false },
    { date: 'JAN 15', yield: '+62.4 BRZ', completed: false },
    { date: 'FEB 15', yield: '+93.6 BRZ', completed: false },
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
        {showConfetti && (
          <Confetti />
        )}
        
        <div className="check-container">
          <span className="check-icon">✓</span>
        </div>
        
        <h2>DEPOSIT SUCCESS</h2>
        <p className="subtitle">Your capital is now earning yield</p>
        
        <div className="summary-card">
          <div className="summary-row">
            <span className="summary-label">Amount Deposited</span>
            <span className="summary-value">{depositData?.amount || '4,000.00 BRZ'}</span>
          </div>
          <div className="summary-row">
            <span className="summary-label">Vault</span>
            <span className="summary-value">{depositData?.vault || 'BRZ Stablecoin (Curve)'}</span>
          </div>
          <div className="summary-row">
            <span className="summary-label">Transaction ID</span>
            <span className="summary-value" style={{ fontFamily: 'monospace' }}>0x8f2...e1d4</span>
          </div>
        </div>

        <div className="timeline-container">
          <div className="timeline-label">
            <span className="cube-icon"></span> Projected Earnings Timeline
          </div>
          <div className="timeline-track">
            {timelinePoints.map((point, index) => (
              <div key={index} className="timeline-point">
                <div className={`timeline-dot ${point.completed ? 'completed' : ''}`}></div>
                <div className="timeline-date">{point.date}</div>
                <div className="timeline-yield">{point.yield}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="action-group">
          <button className="btn btn-outline">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
              <polyline points="16 6 12 2 8 6"></polyline>
              <line x1="12" y1="2" x2="12" y2="15"></line>
            </svg>
            Share
          </button>
          <button className="btn btn-black" onClick={onClose}>
            View Position
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
