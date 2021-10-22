import Layout from '../components/Layout'
import '../styles/globals.scss'
import '../styles/base/typography.scss'
import Prism from 'prismjs'
import 'prismjs/components/prism-rust'
import './prism-vsDark.css'
import Head from 'next/head'

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Head>
<<<<<<< HEAD
          <meta name="viewport" content="width=device-width, initial-scale=1" />
=======
        <meta name="viewport" content="width=device-width, initial-scale=1" />
>>>>>>> e2f7731f45335cf428cf56554427860792a45fef
      </Head>
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp
