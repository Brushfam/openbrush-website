import Head from 'next/head';
import Banner from './../components/Banner';
import SyntaxHighlighter from 'react-syntax-highlighter';
import Partners from '../components/Partners';
import FAQSwitcher  from '../components/FAQSwitcher';
import SingleTestimonial from '../components/SingleTestimonial';

import { partnersList } from './../data/partnersList';
import { faq } from '../data/faq';
import { testimonials } from '../data/testimonials';
import Wizard from "../components/Wizard";


export default function Home() {
  
  const code = `fn what_is (open: Brush) {
    "OpenBrush provides security products to build, automate, and operate decentralized applications. We also protect leading organizations by performing security audits on their systems and products."
  }`;

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
              <SyntaxHighlighter language="rust" wrapLongLines={true} useInlineStyles={false}>
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
