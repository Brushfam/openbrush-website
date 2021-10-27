import Header from './Header'
import Footer from './Footer'
import { headerNavigation } from '../data/headerNavigation'
import { footerNavigation } from '../data/footerNavigation'

const Layout = ({ children }) => {
  return (
    <>
      <Header nav={headerNavigation} />
      <main className="wrapper">{children}</main>
      <Footer nav={footerNavigation} />
    </>
  )
}

export default Layout
