import type { AppProps } from 'next/app';
import React from 'react';
import Provider from '../Providers/machine/Provider';
import '../styles/global.css';

function App({ Component, pageProps }: AppProps) {
  return (
    <Provider>
      <Component {...pageProps} />;
    </Provider>
  );
}

export default App;
