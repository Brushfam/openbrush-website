import faq from './../styles/FAQSwitcher.module.scss'
import { useState } from 'react'
import Link from 'next/link'
import Prism from 'prismjs'

const FAQSwitcher = ({ data }) => {
  const [selectedQuestionIndex, setselectedQuestionIndex] = useState(0)

  return (
    <div className={faq.faqContainer}>
      <div className={faq.desktopConrainer}>
        <div className={faq.desktop}>
          <div className={faq.questionsHolder}>
            {data &&
              data.map((item, i) => {
                return (
                  <div onClick={() => setselectedQuestionIndex(i)} className={faq.questionBlock} key={i}>
                    <span className="commonText">{item.question}</span>
                    <img
                      className={faq.pointerArrow}
                      alt="arrow icon"
                      src={selectedQuestionIndex === i ? '/icons/arrow-rt-active.svg' : '/icons/arrow-rt.svg'}
                    />
                  </div>
                )
              })}
          </div>
          <div className={faq.answerContainer}>
            {data &&
              data.map((item, i) => (
                <div key={i} className={faq.infoBlock}>
                  {selectedQuestionIndex === i ? (
                    <pre className="language-rust">
                      <code
                        className="language-rust"
                        dangerouslySetInnerHTML={{
                          __html: Prism.highlight(item.code, Prism.languages.rust, 'rust')
                        }}
                      ></code>
                    </pre>
                  ) : null}
                </div>
              ))}
            <Link href="/">
              <a>
                <div className={faq.wizardLinkBox}>
                  <p>Wizard</p>
                  <img src="/icons/arrow-rt-short.svg" alt="arrow icon" />
                </div>
              </a>
            </Link>
          </div>
        </div>

        <div className={faq.mobile}>
          <div className={faq.questionsHolder}>
            {data &&
              data.map((item, i) => {
                return (
                  <div key={i}>
                    <div className={faq.questionBlock}>
                      <span className="commonText">{item.question}</span>
                    </div>
                    <div className={faq.answerContainer}>
                      <div className={faq.infoBlock}>
                        <pre className="language-rust">
                          <code className="language-rust">{item.code}</code>
                        </pre>
                      </div>
                    </div>
                  </div>
                )
              })}
            <Link href="/">
              <a>
                <div className={faq.wizardLinkBox}>
                  <p>Wizard</p>
                  <img src="/icons/arrow-rt-short.svg" alt="arrow icon" />
                </div>
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FAQSwitcher
