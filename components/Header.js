import header from './../styles/Header.module.scss';
import Link from 'next/link';


const Header = ({nav}) => {
    return (
        <header className={`${header["header"]} header`}>
            <div className={header.headerContainer}>
                <Link href="/">
                    <a>
                        <div className={header.logoContainer}>
                            <img src="/img/logo.png" alt='logo'/>
                        </div>
                    </a>
                </Link>
                <nav className={header.headerNav}>
                    <ul className={header.headerNavList}>
                        {nav && nav.map((nav, i) => {
                            return(
                                <li key={i}>
                                    <Link href={nav.link}>
                                        <a className='commonText'>{nav.label}</a>
                                    </Link>
                                </li>
                            )
                        })}                    
                    </ul>
                </nav>
            </div>
        </header>
    )
} 

export default Header;