import Link from 'next/link'
import footer from './../styles/Footer.module.scss'

const Footer = ({ nav }) => {
  return (
    <footer className={`${footer['footer']} footer`}>
      <div className={footer.footerContainer}>
        <div className={footer.footerLogoContainer}>
          <img src="/img/logo.png" alt="logo" />
        </div>
        <div className={footer.footerNavigationWrapper}>
          {nav &&
            nav.map((item, i) => {
              return (
                <div key={i} className={footer.navigationColumn}>
                  <p className={footer.navigationColumnName}>{item.columnName}</p>
                  <nav className={footer.navigationColumnLinks}>
                    <ul>
                      {item.links &&
                        item.links.map((link, i) => {
                          return (
                            <li key={i}>
                              <Link href={link.link}>
                                <a>{link.label}</a>
                              </Link>
                            </li>
                          )
                        })}
                    </ul>
                  </nav>
                </div>
              )
            })}
        </div>
      </div>
    </footer>
  )
}

export default Footer
