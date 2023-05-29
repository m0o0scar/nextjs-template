import Head from 'next/head';

export const Header = () => {
  return (
    <Head>
      <title>My App</title>
      <meta name="description" content="Bla bla bla" />
      <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
      {/* <link rel="icon" href="/favicon.png" /> */}
      {/* <link rel="apple-touch-icon" href="/favicon.jpeg" /> */}
    </Head>
  );
};
