# RegioYield Protocol

RegioYield is the first decentralized liquidity layer for non-USD stablecoins. Earn native yield on EUR, JPY, and BRL stablecoins without FX risk.

## Problem

Global DeFi is dollar-denominated. Local users lose 2-5% on conversion slippage and face constant currency exposure. Your yield should match your spending power.

## Solution

Native Stablecoin Vaults - Mint and deposit BRZ, EURC, and JPYC directly. Zero conversion fees. Auto-compounding native yield strategies.

## Features

- **Local Yield, Global Scale** - Earn yield on your local currency stablecoins
- **Multi-Chain Support** - Currently deployed on Polygon PoS
- **Multiple Vaults** - EURC, BRZ, JPYC and more
- **Auto-Compounding** - Automated yield strategies
- **Real-Time Analytics** - Live APY, TVL, and risk scores

## Supported Stablecoins

| Token | Region | Strategy | APY |
|-------|--------|----------|-----|
| EURC | Europe | Curve/Convex Loop | 8.42% |
| BRZ | Brazil | Aave V3 Leverage | 12.05% |
| JPYC | Japan | Uniswap V3 Delta Neutral | 4.18% |

## Tech Stack

- React + Vite
- Privy (Wallet Connection)
- Polygon Network

## Getting Started

```bash
npm install
npm run dev
```

## Connect Wallet

The app uses Privy for wallet connection. On connect, it automatically switches to Polygon network.

## License

MIT
