import { Head, Html, Main, NextScript } from 'next/document';
import type { FC } from 'react';

const Document: FC = () => {
  return (
    <Html className="scroll-smooth">
      <Head></Head>
      <body className="min-w-[350px] bg-yellow-50">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
