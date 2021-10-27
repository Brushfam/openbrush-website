import burgerMenu from './../../styles/BurgerMenu.module.scss'
import { useState } from 'react'
import Link from 'next/link'

const BurgerMenu = ({ nav }) => {
  const [open, setOpen] = useState(false)

  return (
    <div className={burgerMenu.BurgerMenuContainer}>
      <div className={`${burgerMenu['burgerMenu']} ${open ? burgerMenu['opened'] : ''}`} onClick={() => setOpen(!open)}>
        <div />
        <div />
        <div />
      </div>
      <div className={`${burgerMenu['MenuWrapper']} wrapper ${open ? burgerMenu['opened'] : ''}`}>
        <div className={burgerMenu.Menu}>
          <nav className={burgerMenu.Nav}>
            <ul className={burgerMenu.headerNavList}>
              {nav &&
                nav.map((nav, i) => {
                  return (
                    <li onClick={() => setOpen(false)} key={i}>
                      <Link href={nav.link}>
                        <a className="commonText">{nav.label}</a>
                      </Link>
                    </li>
                  )
                })}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  )
}

export default BurgerMenu
