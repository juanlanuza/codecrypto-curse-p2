import { useEffect, useState } from 'react';
// @mui
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
// services
import { address } from './services/config';
import * as r from './services/read';
import * as w from './services/write';

// ----------------------------------------------------------------------

export function UserTable() {
  const [data, setData] = useState({
    balanceBeneficiary: 0
  });

  useEffect(() => {
    async function getData() {
      await r.balance().then((res) => setData((prev) => ({ ...prev, balanceBeneficiary: res })));
    }
    getData();
  }, []);

  const handleIncrement = () => {
    w.increment().then((success) => {
      if (success) {
        setData((prev) => ({ ...prev, balanceBeneficiary: prev.balanceBeneficiary + 1 }));
      }
    });
  };

  const handleDecrement = () => {
    w.decrement().then((success) => {
      if (success) {
        setData((prev) => ({ ...prev, balanceBeneficiary: prev.balanceBeneficiary - 1 }));
      }
    });
  };

  return (
    <Container style={{ display: 'flex', flexFlow: 'column', alignItems: 'center' }}>
      <TableContainer component={Paper} sx={{ maxWidth: '800px' }}>
        <Table sx={{ minWidth: 600 }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: 'white' }}>Contrato</TableCell>
              <TableCell sx={{ color: 'white' }}>Decrementar</TableCell>
              <TableCell sx={{ color: 'white' }}>Balance</TableCell>
              <TableCell sx={{ color: 'white' }}>Incrementar</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            <TableRow>
              <TableCell>{address}</TableCell>
              <TableCell>
                <Button variant='outlined' size='small' onClick={handleDecrement}>
                  {'-'}
                </Button>
              </TableCell>
              <TableCell>{data.balanceBeneficiary}</TableCell>
              <TableCell>
                <Button variant='outlined' size='small' onClick={handleIncrement}>
                  {'+'}
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
