import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang='es'>
      <title>Blockchain training</title>
      <Head>
        <meta name='description' content='Blockchain training' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <body style={{ margin: 0 }}>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
