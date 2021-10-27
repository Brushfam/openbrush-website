import Document, { Head, Html, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link href="/fonts/fonts.css" rel="stylesheet" />
          <link rel="shortcut icon" href="favicons/icon.svg" />
          <meta name="description" content="Smart contract library for Polkadot on Rust" />
          <meta name="keywords" content="polkadot, ink, rust, smart contract" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
