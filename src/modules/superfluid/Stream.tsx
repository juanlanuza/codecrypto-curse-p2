import { FC, ReactElement, useContext, useEffect, useState } from 'react';
import { GenericDataGrid } from './GenericDataGrid';
import { sfSubgraph } from './redux/store';
import { SignerContext } from './SignerContext';
import { Typography } from '@mui/material';

export const Streams: FC = (): ReactElement => {
  const [chainId, signerAddress] = useContext(SignerContext);
  const [page, setPage] = useState<number>(1);

  const [queryChainId, setQueryChainId] = useState<number>(chainId);

  useEffect(() => {
    setPage(1);
  }, [queryChainId]);

  const plataforma = '0xb1b449155ba70A4dBF6f467560A3AcCE6445231C';

  const queryResult = sfSubgraph.useStreamsQuery({
    chainId: queryChainId,
    filter: {
      sender: signerAddress,
      receiver: plataforma,
      currentFlowRate_gt: '0'
    }
  });

  return (
    <>
      {queryResult.data ? (
        <GenericDataGrid {...queryResult} />
      ) : (
        <Typography>No hay streams</Typography>
      )}
    </>
  );
};
