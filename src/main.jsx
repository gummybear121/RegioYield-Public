import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { PrivyProvider } from '@privy-io/react-auth'
import './index.css'
import App from './App.jsx'

const POLYGON_CHAIN_ID = '0x89' // 137 in hex

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PrivyProvider
      appId={import.meta.env.VITE_PRIVY_APP_ID}
      config={{
        appearance: {
          theme: 'light',
          accentColor: '#7A33FF',
        },
        defaultChain: {
          id: 137,
          name: 'Polygon',
          currency: 'MATIC',
          rpcUrl: 'https://polygon-rpc.com',
          blockExplorerUrl: 'https://polygonscan.com',
        },
      }}
    >
      <App />
    </PrivyProvider>
  </StrictMode>,
)
