import { Box, Container } from '@mui/system';
import Footer from './Footer';
import Menu from './Menu';
import WelcomeModal from '../components/WelcomeModal';
import { Toaster } from 'react-hot-toast';

// ----------------------------------------------------------------------

export default function MainLayout({ children }: { children: JSX.Element }) {
  return (
    <>
      <WelcomeModal />
      <Toaster />
      <Box
        display='flex'
        flexDirection='column'
        justifyContent='space-between'
        minHeight='100vh'
        bgcolor={'#f5f5f5'}
      >
        <Menu />
        <Container sx={{ flexGrow: 2 }}>{children}</Container>
        <Footer />
      </Box>
    </>
  );
}
