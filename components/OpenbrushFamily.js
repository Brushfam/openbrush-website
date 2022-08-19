import obFam from './../styles/OpenbrushFamily.module.scss';
import Link from 'next/link';

const OpenbrushFamily = ({title, data}) => {
    return (
        <div className={obFam.obFamContainer}>
            <div className={obFam.logoWrapper}>
                <h3>{title}</h3>
                {data && data.map((item, i) => {
                    return(
                        <Link key={i.toString()} href={item.link}>
                            <a><img key={i} src={item.src} alt={item.alt} /></a>
                        </Link>
                    )
                })}
            </div>

            {<div className={obFam.obFamContainerDecor}></div>}
        </div>
    )
}

export default OpenbrushFamily
