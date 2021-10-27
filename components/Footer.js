import Link from 'next/link'
import footer from './../styles/Footer.module.scss'

const Footer = ({ nav }) => {
  return (
    <footer className={`${footer['footer']} footer`}>
      <div className={footer.footerContainer}>
        <p>Copyright © 2021 OpenBrush, Supercolony.net.</p>
      </div>
    </footer>
  )
}

export default Footer
