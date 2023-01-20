import Document, { Head, Html, Main, NextScript } from 'next/document'
import StructuredData from "../components/StructuredData";

const structuredData = {
    '@context': "https://schema.org",
    '@type': "WebSite",
    copyrightNotice: "Copyright © 2021 OpenBrush, Supercolony.net",
    copyrightYear: "2021",
    dateCreated: "2021-09-13",
    description: "OpenBrush is a library for smart contract development on ink! It provides standard contracts (based on PSP), as well as useful contracts and macros to help you build ink! smart contracts.",
    isFamilyFriendly: true,
    isAccessibleForFree: true,
    keywords: "Brushfam, Polkadot, ink, rust, smart contract, WASM, web3, ink audit",
    funder: [
        {
            '@type': "Organization",
            name: "web3 foundation grants program"
        }
    ],
    maintainer: [
        {
            '@type': "Organization",
            legalName: "Brushfam",
            logo: "https://global-uploads.webflow.com/639a6545886590339a99c4d0/63b6df96fec17ce7e3c10208_Brushfam.svg",
            url: "https://www.brushfam.io/"
        },
    ],
};

class MyDocument extends Document {
    render() {
    return (
      <Html lang="en">
        <Head>
          <link href="/fonts/fonts.css" rel="stylesheet" />
          <link rel="shortcut icon" href="favicons/icon.svg" />
          <meta name="description" content="OpenBrush is a library for smart contract development on ink! It provides standard contracts (based on PSP),
            as well as useful contracts and macros to help you build ink! smart contracts." />
          <meta name="keywords" content="Brushfam, Polkadot, ink, rust, smart contract, WASM, web3, ink audit" />
          <StructuredData data={structuredData} />
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
