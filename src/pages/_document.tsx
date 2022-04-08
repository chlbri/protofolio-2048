import { Head, Html, Main, NextScript } from 'next/document';
import type { FC } from 'react';

const Document: FC = () => {
  return (
    <Html className="scroll-smooth">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=PT+Sans+Narrow&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body className="min-w-[350px] bg-yellow-50">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
