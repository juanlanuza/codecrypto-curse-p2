import { memo } from 'react';
// @mui
import { Box, Typography } from '@mui/material';
import { colors } from './theme';

// ----------------------------------------------------------------------

function Footer() {
  return (
    <Box bgcolor={colors.black} py={2}>
      <Typography align='center' color={'white'}>
        © 2023 CODECRYPTO TODOS LOS DERECHOS RESERVADOS
      </Typography>
    </Box>
  );
}

export default memo(Footer);
