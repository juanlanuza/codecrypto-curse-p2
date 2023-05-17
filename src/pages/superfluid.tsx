import { Box, Container, Typography } from '@mui/material';
import { chains, wagmiClient } from 'modules/superfluid/wagmiAndRainbowKit';
import { ethers, Signer } from 'ethers';
import { Framework } from '@superfluid-finance/sdk-core';
import { InitializeSuperfluidSdk } from 'modules/superfluid/InitializeSuperfluidSdk';
import { Provider } from 'react-redux';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { SignerContext } from 'modules/superfluid/SignerContext';
import { store } from 'modules/superfluid/redux/store';
import { Streams } from 'modules/superfluid/Stream';
import { useState } from 'react';
import { WagmiConfig } from 'wagmi';
import CircularProgress from '@mui/material/CircularProgress';
import List from '@mui/material/List';
import ListSubheader from '@mui/material/ListSubheader';

export default function Superfluid() {
  const [superfluidSdk, setSuperfluidSdk] = useState<Framework | undefined>();
  const [signerAddress, setSignerAddress] = useState<string | undefined>();
  const [signer, setSigner] = useState<Signer>();
  const [chainId, setChainId] = useState<number | undefined>();

  const onSuperfluidSdkInitialized = async (
    superfluidSdk: Framework,
    provider: ethers.providers.Provider,
    signer: Signer
  ) => {
    setSuperfluidSdk(superfluidSdk);
    setSigner(signer);
    signer.getAddress().then((address) => setSignerAddress(address));
    provider.getNetwork().then((network) => setChainId(network.chainId));
  };

  return (
    <Container
      style={{
        display: 'flex',
        flexFlow: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Provider store={store}>
        <WagmiConfig client={wagmiClient}>
          <RainbowKitProvider chains={chains}>
            <Box
              sx={{
                mt: 8,
                alignItems: 'center',
                justifyContent: 'center',
                display: 'flex',
                flexFlow: 'column'
              }}
            >
              <Typography>BlockChain Disponibles (nombre, chainId):</Typography>
              {chains.map((chain) => (
                <Typography key={chain.name} sx={{ mx: 10 }}>
                  {chain.name}: {chain.id}
                </Typography>
              ))}

              <InitializeSuperfluidSdk onSuperfluidSdkInitialized={onSuperfluidSdkInitialized} />
              {!!superfluidSdk && (!chainId || !signerAddress || !signer) && <CircularProgress />}
              {!!chainId && !!signerAddress && !!signer && (
                <SignerContext.Provider value={[chainId, signerAddress, signer]}>
                  <Box
                    maxWidth='sm'
                    sx={{
                      mb: 4,
                      alignItems: 'center',
                      justifyContent: 'center',
                      display: 'flex',
                      flexFlow: 'column'
                    }}
                  >
                    <Typography variant='h3' color='green'>
                      Conectado
                    </Typography>
                    <Typography>
                      <b>{signerAddress}</b>
                    </Typography>
                    <Typography>
                      Red id: <b>{chainId}</b>
                    </Typography>
                    <Typography></Typography>
                  </Box>

                  <List
                    component='nav'
                    aria-labelledby='nested-list-subheader'
                    subheader={
                      <ListSubheader
                        component='div'
                        id='nested-list-subheader'
                        sx={{
                          justifyContent: 'center',
                          display: 'flex'
                        }}
                      >
                        Servicio de Streaming
                      </ListSubheader>
                    }
                  >
                    <Box
                      maxWidth='sm'
                      sx={{
                        my: 2,
                        alignItems: 'center',
                        justifyContent: 'center',
                        display: 'flex',
                        flexFlow: 'column'
                      }}
                      title='Stream'
                    >
                      <Streams />
                    </Box>
                  </List>
                </SignerContext.Provider>
              )}
            </Box>
          </RainbowKitProvider>
        </WagmiConfig>
      </Provider>
    </Container>
  );
}
