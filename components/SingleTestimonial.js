import testimonial from './../styles/SingleTestimonial.module.scss';
import SyntaxHighlighter from 'react-syntax-highlighter';

const SingleTestimonial = () => {
    return (
        <div className={testimonial.testimonial}>
            <div className={testimonial.testimonialContainer}>
                {/* TODO: customize syntax highlighter in appropriate way*/} 
                <SyntaxHighlighter language="rust" wrapLongLines={true} useInlineStyles={false}>
                    {`fn quote() {`}
                </SyntaxHighlighter>
                <SyntaxHighlighter customStyle={{marginLeft: '50px', padding: '25px 0 15px'}} language="rust" wrapLongLines={true} useInlineStyles={false}  lineProps={{style: {color: '#B4BE68', lineHeight: '140%'}}}>
                    {`println!(“OpenBrush provides security products to build, automate, and operate decentralized applications. We also protect leading organizations by performing security audits on their systems and products.”) `}
                </SyntaxHighlighter>
                <SyntaxHighlighter language="rust" wrapLongLines={true} useInlineStyles={false}>
                    {`}`}
                </SyntaxHighlighter>
            </div>
        </div>
    )
}

export default SingleTestimonial;