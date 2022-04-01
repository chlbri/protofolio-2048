import type { AppProps } from 'next/app';
import { FC } from 'react';
import MachineProvider from '../Providers/machine';
import '../styles/global.css';

const App: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <MachineProvider>
      <Component {...pageProps} />;
    </MachineProvider>
  );
};

export default App;
