import banner from './../styles/Banner.module.scss'
import Link from "next/link";


export default function Banner({ title, illustration }) {
    const handleClick = event => {
        event.preventDefault();
        document.getElementById('wizard')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };


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
                  <img className={banner.brushImg} src='/img/brush.svg' alt='brush' />
                  <span className={banner.openbrush}>OpenBrush</span>
              </div>

              <img src='/img/equals.svg' alt='equals' />

              <div className={banner.illustrationContainer}>
                <img src='/img/contract.svg' alt='ink' />
                <span className={banner.contracts}>Smart Contracts</span>
              </div>

            </div>

            <div className={banner.ctaContainer} >
              <Link href='/#wizard' >
                <a onClick={handleClick}>TRY IT OUT</a>
              </Link>
            </div>

          </div>
        </div>

      </div>

      <p className={banner.createdBy}>
        created by<a href="https://www.supercolony.net" target='_blank'>
          <img src="/img/supercolony.svg" className={banner.supercolonyImg} />
        </a>
      </p>

      <div className={banner.bannerContainerDecorWrapper}>
        <div className={banner.leftBottom} />
        <div className={banner.rightBottom}>
          <div />
        </div>
      </div>

    </div>
  )
}
