import type { AppProps } from 'next/app';
import { FC } from 'react';
import Provider from '../Providers/machine/Provider';
import '../styles/global.css';

const App: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <Provider>
      <Component {...pageProps} />;
    </Provider>
  );
};

export default App;
