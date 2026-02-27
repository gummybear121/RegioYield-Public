import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { usePrivy, useWallets } from '@privy-io/react-auth';

const navItems = [
  { label: 'Dashboard', path: '/app' },
  { label: 'Pools', path: '/pools' },
  { label: 'Analysis', path: '/analysis' },
  { label: 'My Portfolio', path: '/portfolio' },
];

export default function Nav() {
  const location = useLocation();
  const { isDark, toggleTheme } = useTheme();
  const { login, logout, user, ready } = usePrivy();
  const { wallets } = useWallets();

  const formatAddress = (address) => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

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
    setTimeout(switchToPolygon, 500);
  };

  return (
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
          <button className="btn-primary" onClick={() => { switchToPolygon(); logout(); }}>
            {formatAddress(user.wallet?.address)}
          </button>
        ) : (
          <button className="btn-primary" onClick={handleLogin}>
            Connect Wallet
          </button>
        )}
      </div>
    </nav>
  );
}
