import Head from 'next/head'
import Banner from './../components/Banner'
import Partners from '../components/Partners'
import FAQSwitcher from '../components/FAQSwitcher'
import SingleTestimonial from '../components/SingleTestimonial'

import { partnersList } from './../data/partnersList'
import { faq } from '../data/faq'
import { testimonials } from '../data/testimonials'

import Prism from 'prismjs'
import { useEffect } from 'react'
import { WHAT_IS_OPEN_BRUSH } from '../data/code'

export default function Home() {
  useEffect(() => {
    Prism.highlightAll()
  }, [])

  return (
    <div>
      {/* TODO: make reusable Head component */}
      <Head>
        <title>Openbrush</title>
        <meta name="keywords" content="openbrush"></meta>
      </Head>

      <Banner
        title={[
          'The standard for',
          <span key="polkadot" style={{ color: '#E6007A' }}>
            {' '}
            Polkadot{' '}
          </span>,
          'blockchain applications'
        ]}
      >
        <pre className="language-rust">
          <code className="language-rust">{WHAT_IS_OPEN_BRUSH}</code>
        </pre>
      </Banner>

      <Partners title="The world’s leading projects trust OpenBrush" data={partnersList} />

      <FAQSwitcher data={faq} />

      <SingleTestimonial testimonial={testimonials[0]} />
    </div>
  )
}
