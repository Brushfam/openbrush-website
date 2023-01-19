import ModStyle from './../styles/FundedBy.module.scss'
import Link from 'next/link'

const FundedBy = ({ title, data }) => {
  return (
    <div className={ModStyle.partnersContainer} title={"Openbrush funded by web3 foundation and AllianceBlock"}>
      <h2 className="primaryHeadline">{title}</h2>
      <div className={ModStyle.logoWrapper}>
        {data &&
          data.map((item, i) => {
            return (
              <Link key={i.toString()} href={item.link}>
                <a>
                  <img key={i} src={item.src} alt={item.alt} />
                </a>
              </Link>
            )
          })}
      </div>
    </div>
  )
}

export default FundedBy
