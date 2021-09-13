import singleTestimonial from './../styles/SingleTestimonial.module.scss'

const SingleTestimonial = ({ testimonial }) => {
  return (
    <div className={singleTestimonial.testimonial}>
      <div className={singleTestimonial.testimonialContainer}>
        <div className={singleTestimonial.innerContainer}>
          {/* TODO: customize syntax highlighter in appropriate way*/}
          <div className={singleTestimonial.codeQuote}>
            <pre className="language-rust">
              <code className="language-rust">{testimonial.code}</code>
            </pre>
          </div>
          <div className={singleTestimonial.authorBlock}>
            <img src={testimonial.authPhoto} alt={testimonial.authDescription} />
            <p className="commonText">{testimonial.authDescription}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SingleTestimonial
