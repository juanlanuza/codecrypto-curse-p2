import { useEffect, useState } from 'react';
// @mui
import { Backdrop, CircularProgress, Typography, Button, Stack } from '@mui/material';
// hooks
import { useMetaMask } from 'metamask-react';
// components
import { UserTable } from 'modules/contract/UserTable';
// services
import { setAccount } from 'modules/contract/services/config';
import { switchChainToBSC } from 'common/utils/switchChainToBSC';

// ----------------------------------------------------------------------

export default function Contract() {
  const { status, chainId } = useMetaMask();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    status === 'initializing' || status === 'connecting' ? setIsLoading(true) : setIsLoading(false);
  }, [status]);

  return (
    <Stack sx={{ display: 'flex', flexFlow: 'column', align: 'center' }}>
      <Typography variant='h4' m={2} align='center'>
        Bienvenido a tu primera App en BlockChain
      </Typography>
      <Connection />
      {status === 'connected' && chainId === '0x61' && <UserTable />}
      <Backdrop open={isLoading}>
        <CircularProgress />
      </Backdrop>
    </Stack>
  );
}

function Connection() {
  const { status, chainId, connect, account } = useMetaMask();

  useEffect(() => {
    setAccount(account ?? '');
  }, [account]);

  return (
    <Stack direction='column' alignItems='center' justifyContent='space-between' m={2}>
      {status !== 'connected' && status !== 'unavailable' ? (
        <Button
          disabled={status === 'initializing' || status === 'connecting'}
          variant='contained'
          onClick={connect}
        >
          {status === 'notConnected' ? 'Conecta tu cartera' : status + '...'}
        </Button>
      ) : (
        !!account && (
          <>
            <Typography>
              Cartera conectada: {account.substring(0, 5)}...
              {account.substring(account.length - 4)}
            </Typography>
            {chainId !== '0x61' && (
              // BNB Mainnet(chainId === '0x38' ? (
              <Stack alignItems='center' gap={2}>
                <Typography>Por Favor, cambia a Smart Chain - Testnet</Typography>
                <Button variant='contained' onClick={switchChainToBSC}>
                  Cambia la red
                </Button>
              </Stack>
            )}
          </>
        )
      )}
    </Stack>
  );
}
