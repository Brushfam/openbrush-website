import SyntaxHighlighter from 'react-syntax-highlighter';
import faqStyles from './../styles/FAQswitcher.module.scss';
import { useState } from 'react';



const FAQSwitcher = ({data}) => {
    const [selectedQuestionIndex, setselectedQuestionIndex] = useState(0);


    return (
        <div className={faqStyles.faqContainer}>
            <div className={faqStyles.questionsHolder}>
            {data && data.map((item, i) => {
                return (
                    <div onClick={() => setselectedQuestionIndex(i)} className={faqStyles.questionBlock} key={i}>
                        {item.question}
                        <img className={faqStyles.pointerArrow} alt='arrow icon' src={selectedQuestionIndex === i ? '/icons/arrow-rt-active.svg' : '/icons/arrow-rt.svg'}/>
                    </div>
                )
            })}
            </div>
            <div className={faqStyles.answerContainer}>
                {data && data.map((item, i) => {
                    return (
                        <div key={i} className={faqStyles.infoBlock}>
                            {selectedQuestionIndex === i ? 
                            <SyntaxHighlighter language="rust" wrapLongLines={true} useInlineStyles={false}>
                                {item.code}
                            </SyntaxHighlighter> : null}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default FAQSwitcher;