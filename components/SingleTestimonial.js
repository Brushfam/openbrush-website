import singleTestimonial from './../styles/SingleTestimonial.module.scss';
import SyntaxHighlighter from 'react-syntax-highlighter';

const SingleTestimonial = ({testimonial}) => {
    return (
        <div className={singleTestimonial.testimonial}>
            <div className={singleTestimonial.testimonialContainer}>
                <div className={singleTestimonial.innerContainer}>
                    {/* TODO: customize syntax highlighter in appropriate way*/}
                    <div className={singleTestimonial.codeQuote}>
                        <SyntaxHighlighter language="rust" wrapLongLines={true} useInlineStyles={false}>
                            {testimonial.code}
                        </SyntaxHighlighter>
                    </div>
                    <div className={singleTestimonial.authorBlock}>
                        <img src={testimonial.authPhoto} alt={testimonial.authDescription}/>
                        <p className='commonText'>{testimonial.authDescription}</p>
                    </div> 
                </div>
            </div>
        </div>
    )
}

export default SingleTestimonial;