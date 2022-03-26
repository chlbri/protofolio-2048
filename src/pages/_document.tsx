import { Head, Html, Main, NextScript } from 'next/document';
import type { FC } from 'react';

const Document: FC = () => {
  return (
    <Html>
      <Head></Head>
      <body className="min-h-screen min-w-[350px] scroll-smooth text-white">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
