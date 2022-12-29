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
          <Link href={'https://www.supercolony.net'}>
            <a className={`${footer.link} ${footer.Website}`} target="_blank">
              Supercolony
            </a>
          </Link>
        </div>
        <p>Copyright © 2021 OpenBrush, Supercolony.net</p>
        <p className={footer.createdBy}>
          created by
          <a href="https://www.supercolony.net" target="_blank">
            <img src="/img/new-supercolony.svg" className={footer.supercolony} />
          </a>
        </p>
      </div>
    </footer>
  )
}

export default Footer
