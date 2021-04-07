import Navbar from "../../src/Layouts/Navbar";
import styles from "../../styles/Home.module.css";

function ContactUs() {
  return (
    <div className='contactUs'>
      

    <a href="/" className="nav__logo bp__small--none">
      <h4 className='bp__small--none'>Collectnea</h4>
    </a>

    <div className="nav bp__small--none">
      <form
        className="nav__search nav__search__grid-3"
        onSubmit={(e) => {
          e.preventDefault();
          submitQuery();
        }}
      >
        <svg className="nav__search__icon" viewBox="0 0 15 15" fill="none">
          <circle
            cx="7.6156"
            cy="7.31202"
            r="4.29962"
            transform="rotate(-59.841 7.6156 7.31202)"
            stroke="#312E2E"
            strokeWidth="1.4"
          />
          <path
            d="M10.3757 10.3086L13.1489 13.2068"
            stroke="#312E2E"
            strokeWidth="1.4"
          />
        </svg>

        <input
          type="text"
          id="MainSearchbar"
          className="nav__search__input font"
          placeholder="search"
        />

        <button
          className="btn btn--black nav__search__btn"
        >
            Search
        </button>
      </form>
    </div>

  
      
      <div className="arrNavs faq__mt">
        {/* <div className="arrNav"> */}
          <svg className="arrNav__icon" viewBox="0 0 25 13" fill="none">
            <path d="M23.9277 6.71484H1.39802" />
            <path d="M6.16601 11.8755L1.04245 6.82883L6.16601 1.34288" />
          </svg>
          <h2 className="heading-2 weight-600 faq__mt">
            <label className={styles.font}>Contact Us</label>
          </h2>
        {/* </div> */}
      </div>
      {/* <div className="backArrow">
        <b className="para--size-22 backArrow__icon">&larr;</b>
        <h2 className={styles.font}>Contact Us</h2>
      </div> */}
      <div className="details">
        <h4>+12334242</h4>
        <h4>examplec.com@gmail.com</h4>
        <h4>UK, London</h4>
      </div>
      <div className="contactForm">
        <h4 className="heading-4">Send us a message</h4>
        <div className="form">
          <div className="form__group">
            <input type="text" className="contactForm__input" placeholder="Name" />
            <input type="text" className="contactForm__input" placeholder="Phone" />
            <input type="text" className="contactForm__input" placeholder="Email" />
          </div>
          <p className="para para--size-10 u-margin-bottom-small u-margin-top-small weight-600">
            Prefferred method of communication
          </p>
          <div className="contactForm__checkBox">
            <input type="radio" id="email" className="conatactForm__radio" />
            <label for="email" className="contactForm__label">
              Email
            </label>
            <input type="radio" id="phone" className="conatactForm__radio" />
            <label for="phone" className="contactForm__label">
              Phone
            </label>
          </div>
          <div className="form__group u-margin-bottom-small">
            <input type="text" className="contactForm__input" placeholder="Message" />
          </div>
          <button className="btn btn--black width--100">Contact Us</button>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
