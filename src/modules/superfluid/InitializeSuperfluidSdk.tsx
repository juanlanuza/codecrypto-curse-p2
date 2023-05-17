import { useState } from 'react';
import { Box, Button, Stack, Typography } from '@mui/material';
import { chains } from './wagmiAndRainbowKit';
import { ethers, Signer } from 'ethers';
import { FC, ReactElement, useCallback, useEffect } from 'react';
import { Framework } from '@superfluid-finance/sdk-core';
import { JsonRpcProvider, Web3Provider } from '@ethersproject/providers';
import { setFrameworkForSdkRedux } from '@superfluid-finance/sdk-redux';
import { useNetwork, useProvider, useSigner } from 'wagmi';
import WalletConnectProvider from '@walletconnect/web3-provider';
import Web3Modal from 'web3modal';

//https://mumbaifaucet.com/
//https://faucet.polygon.technology/
interface Props {
  onSuperfluidSdkInitialized: (
    sf: Framework,
    provider: ethers.providers.Provider,
    signer: Signer
  ) => void;
}

// Enter a valid infura key here to avoid being rate limited
// You can get a key for free at https://infura.io/register
const INFURA_ID = '90db0e566ddf4de7b05ed1e57306bbe4';

export const InitializeSuperfluidSdk: FC<Props> = ({
  onSuperfluidSdkInitialized
}): ReactElement => {
  const setInfuraProviders = useCallback(() => {
    // Configure Infura Providers when environment variable is present.
    const infuraProviders = !!INFURA_ID
      ? chains.map(({ id: chainId }) => ({
          chainId,
          frameworkGetter: () =>
            Framework.create({
              chainId,
              provider: new ethers.providers.InfuraProvider(chainId, INFURA_ID)
            })
        }))
      : [];

    infuraProviders.map((x) => setFrameworkForSdkRedux(x.chainId, x.frameworkGetter));
  }, []);

  const { chain } = useNetwork();
  const { data: signer } = useSigner();
  const provider = useProvider();
  const validChanId: number[] = chains.flatMap((x) => x.id);
  const [chainId, setChainId] = useState<number | null>(null);

  useEffect(() => {
    if (chain && signer && provider) {
      setInfuraProviders();
      Framework.create({
        chainId: chain.id,
        provider: provider
      }).then((sdk) => {
        setFrameworkForSdkRedux(chain.id, sdk);
        onSuperfluidSdkInitialized(sdk, provider, signer);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chain, signer, provider]);

  const handleWeb3Modal = async () => {
    const providerOptions = {
      walletconnect: {
        package: WalletConnectProvider,
        options: {
          infuraId: INFURA_ID
        }
      }
    };

    setInfuraProviders();

    const web3Modal = new Web3Modal({
      cacheProvider: false,
      providerOptions
    });

    const web3ModalProvider = await web3Modal.connect();

    let ethersWeb3Provider = new Web3Provider(web3ModalProvider);
    let currentNetwork = await ethersWeb3Provider.getNetwork();

    const superfluidSdk = await Framework.create({
      chainId: currentNetwork.chainId,
      provider: ethersWeb3Provider
    });

    // Set active provider & signer from MetaMask
    setFrameworkForSdkRedux(currentNetwork.chainId, superfluidSdk);

    onSuperfluidSdkInitialized(superfluidSdk, ethersWeb3Provider, ethersWeb3Provider.getSigner());

    web3ModalProvider.on('accountsChanged', (accounts: string[]) => {
      onSuperfluidSdkInitialized(superfluidSdk, ethersWeb3Provider, ethersWeb3Provider.getSigner());
    });

    web3ModalProvider.on('chainChanged', async (chainId: number) => {
      const chainIdDecimal = Number(chainId);
      setChainId(chainIdDecimal);
      if (!validChanId.includes(chainIdDecimal)) return;

      ethersWeb3Provider = new Web3Provider(web3ModalProvider);
      currentNetwork = await ethersWeb3Provider.getNetwork();

      const newSdk = await Framework.create({
        chainId: chainIdDecimal,
        provider: ethersWeb3Provider
      });

      setInfuraProviders();

      // Set active provider & signer from MetaMask
      setFrameworkForSdkRedux(chainIdDecimal, newSdk);

      onSuperfluidSdkInitialized(newSdk, ethersWeb3Provider, ethersWeb3Provider.getSigner());
    });
  };

  return !chainId ? (
    <Button variant='contained' onClick={handleWeb3Modal} sx={{ my: 2 }}>
      Connect
    </Button>
  ) : !validChanId.includes(chainId) ? (
    <Typography variant='h6' sx={{ my: 2 }}>
      Por favor, conectate a una de las redes soportadas!
    </Typography>
  ) : (
    <Box m={2} />
  );
};
