import partners from './../styles/Partners.module.scss';

const Partners = ({title, data}) => {
    return (
        <div className={partners.partnersContainer}>
            <h2 className='primaryHeadline'>{title}</h2>
            <div className={partners.logoWrapper}>
                {data && data.map((item, i) => {
                    return(
                        <img key={i} src={item.src} alt={item.alt} />
                    )
                })}
            </div>

            <div className={partners.partnersContainerDecor}>

            </div>
        </div>
    )
}

export default Partners;