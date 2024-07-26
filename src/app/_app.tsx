import { AppProps } from 'next/app';
import { ThemeProvider } from 'next-themes';
import Head from 'next/head';

import '../styles/globals.css'; 

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class">
      <Head>
        <link rel="icon" href="/public/favicon.ico" />
        <title>WeatherSplash</title>
      </Head>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
