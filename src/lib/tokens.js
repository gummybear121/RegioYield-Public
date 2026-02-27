import { createPublicClient, http, getContract } from 'viem';
import { polygon } from 'viem/chains';

const ERC20_ABI = [
  {
    constant: true,
    inputs: [{ name: '_owner', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: 'balance', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', type: 'uint8' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', type: 'string' }],
    stateMutability: 'view',
    type: 'function',
  },
];

const POLYGON_RPC = 'https://polygon-bor.publicnode.com';

const publicClient = createPublicClient({
  chain: polygon,
  transport: http(POLYGON_RPC),
});

export async function getTokenBalance(tokenAddress, walletAddress) {
  if (!tokenAddress || !walletAddress) {
    return null;
  }

  try {
    const [balance, decimals, symbol] = await Promise.all([
      publicClient.readContract({
        address: tokenAddress,
        abi: ERC20_ABI,
        functionName: 'balanceOf',
        args: [walletAddress],
      }),
      publicClient.readContract({
        address: tokenAddress,
        abi: ERC20_ABI,
        functionName: 'decimals',
      }),
      publicClient.readContract({
        address: tokenAddress,
        abi: ERC20_ABI,
        functionName: 'symbol',
      }),
    ]);

    const formattedBalance = Number(balance) / Math.pow(10, decimals);

    return {
      raw: balance,
      formatted: formattedBalance,
      decimals,
      symbol,
    };
  } catch (error) {
    console.error('Error fetching token balance:', error.message);
    return null;
  }
}

export async function getMultipleTokenBalances(tokens, walletAddress) {
  if (!walletAddress) return {};

  const results = {};
  
  await Promise.all(
    tokens.map(async (token) => {
      if (token.contractAddress) {
        const balance = await getTokenBalance(token.contractAddress, walletAddress);
        results[token.id] = balance;
      }
    })
  );

  return results;
}
