import banner from './../styles/Banner.module.scss'

const Banner = ({ title, children }) => {
  return (
    <div className={banner.bannerContainer}>
      <div className={banner.bannerInnerContentHolder}>
        <div>
          <div>
            <div className={banner.headlineBlock}>
              <h1 className="primaryHeadline">{title}</h1>
            </div>
            {children}
          </div>
        </div>
      </div>

      <div className={banner.bannerContainerDecorWrapper}>
        <div className={banner.leftBottom}></div>
        <div className={banner.rightBottom}>
          <div></div>
        </div>
      </div>
    </div>
  )
}

export default Banner
