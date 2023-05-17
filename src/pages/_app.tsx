import { MetaMaskProvider } from 'metamask-react';
import { ThemeProvider } from '@mui/material';
import MainLayout from 'common/layout/MainLayout';
import theme from 'common/layout/theme';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <MainLayout>
        <MetaMaskProvider>
          <Component {...pageProps} />
        </MetaMaskProvider>
      </MainLayout>
    </ThemeProvider>
  );
}
