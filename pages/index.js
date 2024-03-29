import Head from 'next/head'
import Banner from './../components/Banner'
import Partners from '../components/Partners'
import FundedBy from '../components/FundedBy'

import { partnersList } from '../data/partnersList';
import { fundedByList } from '../data/fundedByList';
import { openbrushFamilyList} from "../data/openbrushFamilyList";
import Wizard from "../components/Wizard";

import Prism from 'prismjs'
import { useEffect } from 'react'
import Information from "../components/Information";
import OpenbrushFamily from "../components/OpenbrushFamily";


export default function Home() {
  useEffect(() => {
    Prism.highlightAll()
  }, [])

  return (
    <div>
        <Head>
          <title>Openbrush</title>
          <meta name="keywords" content="openbrush"/>
          <meta name="description" content="openbrush"/>
          <meta name="google-site-verification" content="AniwPaa8GCsl_rUlPjd-Po35bxQNLuNPLFYbSohmrhc" />
        </Head>

        <Banner title={['Smart contracts library for',
                <span key={''} style={{color: '#E6007A'}}> Polkadot </span>,
                'on', <span key={''} style={{color: '#B4BE68'}}> Rust </span>,]}
                illustration='/img/bannerIllustration.svg'
        />

        <OpenbrushFamily title="OpenBrush Family:" data={openbrushFamilyList} />

        <Information />

        <Partners title="The world’s leading projects trust OpenBrush" data={partnersList} />

        <FundedBy title="Funded by:" data={fundedByList} />

        <Wizard />

        {/* <SingleTestimonial testimonial={testimonials[0]} /> */}

    </div>
  )
}
