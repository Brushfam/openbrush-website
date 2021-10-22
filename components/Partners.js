import partners from './../styles/Partners.module.scss'
import Link from 'next/link'

<<<<<<< HEAD
const Partners = ({title, data}) => {
    return (
        <div className={partners.partnersContainer}>
            <h2 className='primaryHeadline'>{title}</h2>
            <div className={partners.logoWrapper}>
                {data && data.map((item, i) => {
                    return(
                        <Link key={i.toString()} href={item.link}>
                            <a><img key={i} src={item.src} alt={item.alt} /></a>
                        </Link>
                    )
                })}
            </div>
=======
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
>>>>>>> e2f7731f45335cf428cf56554427860792a45fef

      <div className={partners.partnersContainerDecor}></div>
    </div>
  )
}

export default Partners
