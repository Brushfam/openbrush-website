import testimonial from './../styles/SingleTestimonial.module.scss';
import SyntaxHighlighter from 'react-syntax-highlighter';

const SingleTestimonial = () => {
    return (
        <div className={testimonial.testimonial}>
            <div className={testimonial.testimonialContainer}>
                <div className={testimonial.innerContainer}>
                    {/* TODO: customize syntax highlighter in appropriate way*/}
                    <div className={testimonial.codeQuote}>
                        <SyntaxHighlighter language="rust" wrapLongLines={true} useInlineStyles={false}>
                            {`fn quote() {`}
                        </SyntaxHighlighter>
                        <SyntaxHighlighter customStyle={{marginLeft: '50px', padding: '25px 0 15px'}} language="rust" wrapLongLines={true} useInlineStyles={false}  lineProps={{style: {color: '#B4BE68', lineHeight: '140%'}}}>
                            {`println!("I have a very high opinion of the {OpenZeppelin} team and their work." , OpenZeppelin = "OpenBrush") `}
                        </SyntaxHighlighter>
                        <SyntaxHighlighter language="rust" wrapLongLines={true} useInlineStyles={false}>
                            {`}`}
                        </SyntaxHighlighter>
                    </div>
                    <div className={testimonial.authorBlock}>
                        <img src='/img/Brendan_Eich.png' alt='Brendan Eich'/>
                        <p className='commonText'>Brendan Eich | Founder of Mozilla and Brave, Javascript creator.</p>
                    </div> 
                </div>
            </div>
        </div>
    )
}

export default SingleTestimonial;