import Box from '@mui/material/Box';
import CustomCard from 'common/components/CustomCard';

// ----------------------------------------------------------------------

export default function HomePage() {
  return (
    <Box display={'flex'} justifyContent={'space-evenly'} flexWrap={'wrap'} gap={2} m={4}>
      <CustomCard
        title='Web3'
        description='Introducción a la tecnología de Web3'
        logo='https://financefeeds.com/wp-content/uploads/2022/02/115079_318c89f9840ff963_001full-300x150.jpg'
        link='/contract'
      />
      <CustomCard
        title='Superfluid'
        description='Introducción a la plataforma de Superfluid'
        logo='https://raw.githubusercontent.com/superfluid-finance/protocol-monorepo/dd5bf4bb7f39ac666bf51c7520c7defde04245a1/sf-logo.png'
        link='/superfluid'
      />
    </Box>
  );
}
