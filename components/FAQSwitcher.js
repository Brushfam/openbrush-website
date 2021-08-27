import SyntaxHighlighter from 'react-syntax-highlighter';
import faq from './../styles/FAQSwitcher.module.scss';
import { useState } from 'react';
import Link from 'next/link';


const FAQSwitcher = ({data}) => {
    const [selectedQuestionIndex, setselectedQuestionIndex] = useState(0);

    return (
        <div className={faq.faqContainer}>
            <div className={faq.questionsHolder}>
            {data && data.map((item, i) => {
                return (
                    <div onClick={() => setselectedQuestionIndex(i)}  className={faq.questionBlock} key={i}>
                        <span className='commonText'>{item.question}</span>
                        <img className={faq.pointerArrow} alt='arrow icon' src={selectedQuestionIndex === i ? '/icons/arrow-rt-active.svg' : '/icons/arrow-rt.svg'}/>
                    </div>
                )
            })}
            </div>
            <div className={faq.answerContainer}>
                {data && data.map((item, i) => {
                    return (
                        <div key={i} className={faq.infoBlock}>
                            {selectedQuestionIndex === i ? 
                            <SyntaxHighlighter language="rust" wrapLines={true} wrapLongLines={true} useInlineStyles={false}>
                                {item.code}
                            </SyntaxHighlighter> : null}
                        </div>
                    )
                })}
                <Link href='/'>

                    <a>
                        <div className={faq.wizardLinkBox}>
                            <p>Wizard</p>
                            <img src='/icons/arrow-rt-short.svg' alt='arrow icon'/>
                        </div>
                    </a>
                </Link>
            </div>
        </div>
    )
}

export default FAQSwitcher;