import { configureChains, createClient } from 'wagmi';
import { getDefaultWallets } from '@rainbow-me/rainbowkit';
import { polygon, polygonMumbai, goerli } from '@wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';

// [polygon, polygonMumbai, goerli], https://wagmi.sh/react/chains
export const { chains, provider } = configureChains(
  [polygon, polygonMumbai, goerli],
  [publicProvider()]
);

export const { connectors } = getDefaultWallets({ appName: 'SDK-redux example', chains });

export const wagmiClient = createClient({
  autoConnect: false,
  connectors,
  provider
});
