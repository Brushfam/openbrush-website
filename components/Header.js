import header from './../styles/Header.module.scss'
import Link from 'next/link'
import BurgerMenu from './BurgerMenu/BurgerMenu'
import {headerSocials} from "../data/headerNavigation";

const Header = ({ nav }) => {
  return (
    <header className={`${header['header']} header`}>
      <div className={header.headerContainer}>
        <Link href="/">
          <a>
            <div className={header.logoContainer}>
              <img src="/icons/logo.svg" alt="openbrush logo" />
            </div>
          </a>
        </Link>
        <div className={header.navigationContainer}>
          <nav className={header.headerNav}>
            <ul className={header.headerNavList}>
              {nav &&
                nav.map((nav, i) => {
                  return (
                    <li key={i.toString()}>
                      <Link href={nav.link}>
                        <a className="commonText">{nav.label}</a>
                      </Link>
                    </li>
                  )
                })}
              {headerSocials.map((social, i) => (
                  <Link key={i.toString()} href={social.link}>
                    <li className={`${header['socialsNav']} ${header[social.label]} header`}>
                    </li>
                  </Link>
              ))}
            </ul>
          </nav>
        </div>
        <BurgerMenu nav={nav} />
      </div>
    </header>
  )
}

export default Header
