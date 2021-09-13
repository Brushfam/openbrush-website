import partners from './../styles/Partners.module.scss'
import Link from 'next/link'

const Partners = ({ title, data }) => {
  return (
    <div className={partners.partnersContainer}>
      <h2 className="primaryHeadline">{title}</h2>
      <div className={partners.logoWrapper}>
        {data &&
          data.map((item, i) => (
            <Link key={i} href={item.link}>
              <a>
                <img src={item.src} alt={item.alt} />
              </a>
            </Link>
          ))}
      </div>

      <div className={partners.partnersContainerDecor}></div>
    </div>
  )
}

export default Partners
