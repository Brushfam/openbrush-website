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
              <div className={banner.illustrationConstructor}>
                  <div className={banner.illustrationContainer}>
                      <img src='/img/ink.svg' alt='ink' />
                      <span className={banner.ink}>ink!</span>
                  </div>
                  <img src='/img/plus.svg' alt='plus' />
                  <div className={banner.illustrationContainer}>
                     <img src='/img/brush.svg' alt='brush' />
                      <span className={banner.openbrush}>OpenBrush</span>
                  </div>
                  <img src='/img/equals.svg' alt='equals' />
                  <div className={banner.illustrationContainer}>
                    <img src='/img/contract.svg' alt='ink' />
                    <span className={banner.contracts}>Smart Contracts</span>
                  </div>
              </div>
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
