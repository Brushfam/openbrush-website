import info from './../styles/Information.module.scss';
import Link from 'next/link';
import partners from "../styles/Partners.module.scss";

const Information = () => {
    return (
        <div className={info.informationBlockWrapper}>
            <h2 className='primaryHeadline'>Openbrush provides:</h2>
            <div className={info.contentWrapper}>
                <div className={info.contentUnit}>
                    <h3>Implementation of <Link href='https://github.com/w3f/PSPs'>
                            <a>Polkadot Standards</a>
                        </Link>:
                    </h3>
                    <img src='/img/logo1.svg' alt='illustration'/>
                    <ul>
                        <li><span>PSP22: Fungible Token</span></li>
                        <li><span>PSP721: Non-Fungible Token</span></li>
                        <li><span>PSP1155: Multi-Token</span></li>
                    </ul>
                </div>

                <div className={info.contentUnit}>
                    <h3>Useful extensions with custom logic:</h3>
                    <img src='/img/logo2.svg' alt='illustration'/>
                    <ul>
                        <li><span>Ownable, Roles</span></li>
                        <li><span>Mintable, Burnable</span></li>
                        <li><span>Timelock, Payment Splitter</span></li>
                    </ul>
                </div>

                <div className={info.contentUnit}>
                    <h3>Useful macro which
                        simplifies development:</h3>
                    <img src='/img/logo3.svg' alt='illustration'/>
                    <ul>
                        <li><span>Function modifiers</span></li>
                        <li><span>Storage definition</span></li>
                        <li><span>Trait definitions</span></li>
                    </ul>
                </div>
            </div>

            <div className={info.informationBlockWrapperDecor}></div>
        </div>
    )
}

export default Information
