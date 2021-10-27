import banner from './../styles/Banner.module.scss'

const Banner = ({ title, illustration }) => {
  return (
    <div className={banner.bannerContainer}>
      <div className={banner.bannerInnerContentHolder}>
        <div>
          <div>
            <div className={banner.headlineBlock}>
              <h1>{title}</h1>
            </div>
              <img src={illustration} alt='illustration' />
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
