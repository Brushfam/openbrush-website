import Link from 'next/link'
import footer from './../styles/Footer.module.scss'
import { githubLink, linkedinLink, twitterLink } from '../data/headerNavigation'

const Footer = ({ nav }) => {
  return (
    <footer className={`${footer['footer']} footer`}>
      <div className={footer.footerContainer}>
        <div className={footer.socials}>
          <Link href={twitterLink}>
            <a className={`${footer.link} ${footer.Twitter}`} target="_blank">
              Twitter
            </a>
          </Link>
          <Link href={linkedinLink}>
            <a className={`${footer.link} ${footer.LinkedIn}`} target="_blank">
              LinkedIn
            </a>
          </Link>
          <Link href={githubLink}>
            <a className={`${footer['link']} ${footer['GitHub']}`}>GitHub</a>
          </Link>
          <Link href={'https://www.brushfam.io'}>
            <a className={`${footer.link} ${footer.Website}`} target="_blank">
              Brushfam
            </a>
          </Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer
