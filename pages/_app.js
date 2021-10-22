import Layout from '../components/Layout';
import '../styles/globals.scss';
import '../styles/base/typography.scss';
import Head from 'next/head';


function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Component {...pageProps} />
    </Layout>
  ) 
}

export default MyApp;
