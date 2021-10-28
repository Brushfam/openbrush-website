import Link from 'next/link'
import footer from './../styles/Footer.module.scss'
import {githubLink, linkedinLink, twitterLink} from "../data/headerNavigation";

const Footer = ({ nav }) => {
  return (
    <footer className={`${footer['footer']} footer`}>
      <div className={footer.footerContainer}>
          <div className={footer.socials}>
              <Link href={twitterLink}>
                <a className={`${footer['link']} ${footer['Twitter']}`}>Twitter</a>
              </Link>
              <Link href={linkedinLink}>
                <a className={`${footer['link']} ${footer['LinkedIn']}`}>LinkedIn</a>
              </Link>
              <Link href={githubLink}>
                  <a className={`${footer['link']} ${footer['GitHub']}`}>GitHub</a>
              </Link>
              <Link href={'https://www.supercolony.net/'}>
                <a className={`${footer['link']} ${footer['Website']}`}>Website</a>
              </Link>
          </div>
        <p>Copyright © 2021 OpenBrush, Supercolony.net</p>
      </div>
    </footer>
  )
}

export default Footer
