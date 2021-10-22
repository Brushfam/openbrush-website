import Head from 'next/head'
import Banner from './../components/Banner'
import Partners from '../components/Partners'
import FAQSwitcher from '../components/FAQSwitcher'
import SingleTestimonial from '../components/SingleTestimonial'

import { partnersList } from './../data/partnersList';
import { faq } from '../data/faq';
import { testimonials } from '../data/testimonials';
import Wizard from "../components/Wizard";

import Prism from 'prismjs'
import { useEffect } from 'react'
import { WHAT_IS_OPEN_BRUSH } from '../data/code'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';


export default function Home() {
  const code = `fn what_is (open: Brush) {
    "OpenBrush provides security products to build, automate, and operate decentralized applications. We also protect leading organizations by performing security audits on their systems and products."
  }`;

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

        <Banner title={['The standard for', 
                <span key={''} style={{color: '#E6007A'}}> Polkadot </span>,
                'blockchain applications']}>

              {/* TODO: customize syntax highlighter in appropriate way*/} 
              <SyntaxHighlighter language="rust" wrapLongLines={true}>
                {code}
              </SyntaxHighlighter>
    
        </Banner>

        <Partners title="The world’s leading projects trust OpenBrush" data={partnersList} />

        {/* <FAQSwitcher data={faq} /> */}

        <Wizard />

        {/* <SingleTestimonial testimonial={testimonials[0]} /> */}
        
    </div>
  )
}
