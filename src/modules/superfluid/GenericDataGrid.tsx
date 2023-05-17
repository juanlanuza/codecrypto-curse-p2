import _ from 'lodash';
import { FC, ReactElement } from 'react';
import { PagedResult } from '@superfluid-finance/sdk-core';
import { SerializedError } from '@reduxjs/toolkit';
import { Alert, Button, Typography } from '@mui/material';

//Segundos de un mes
var segundos = 2629746;
var base18 = 10 ** 18;
var flujoMes = 0;

export interface GenericDataGridProps {
  data?: PagedResult<any>;
  isLoading: boolean;
  error?: SerializedError;
  refetch?: () => void;
}

export const GenericDataGrid: FC<GenericDataGridProps> = ({
  data,
  isLoading,
  error,
  refetch
}): ReactElement => {
  console.log('Current Flow Rate', data?.data[0]?.currentFlowRate);

  return (
    <>
      {isLoading && <Typography>Loading...</Typography>}
      {error && (
        <>
          <Alert sx={{ m: 1 }} severity='error'>
            {error.message}
          </Alert>
          <Button variant='contained' onClick={() => !!refetch && refetch()}>
            Try again?
          </Button>
        </>
      )}
      {/* Se convierte el flow rate que se recibe en base 18 a decimal  y se multiplica por el numero de segundos del mes (segundos de un mes 2629746)  */}
      {/* Despues comprobamos si el flujo es igual o superior a nuestra mensalidad 50/mes */}
      {(flujoMes = (data?.data[0]?.currentFlowRate / base18) * segundos) >= 50 ? (
        <>
          <Typography variant='h3' color='secondary'>
            Enhorabuena!!
          </Typography>
          <Typography variant='h5' color='secondary'>
            Tu servicio esta <b>Activado!!</b>
          </Typography>
          <Typography variant='h5' color='secondary'>
            Mensalidad: 50$/mes
          </Typography>
          <Typography variant='h5' color='secondary'>
            Pago: {Math.round(flujoMes)} $/mes
          </Typography>
        </>
      ) : (
        <>
          <Typography variant='h3' color='error'>
            Lo Sentimos!!{' '}
          </Typography>
          <Typography variant='h5' color='error'>
            Tu servivio esta <b>Desactivado!!</b>{' '}
          </Typography>
          <Typography variant='h5' color='error'>
            Mensalidad: 50$/mes{' '}
          </Typography>
          <Typography>
            Para seguir disfrutando de tu servicio, activa un flujo de 50$/mes
          </Typography>
        </>
      )}
    </>
  );
};
