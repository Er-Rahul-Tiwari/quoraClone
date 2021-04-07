import styles from "../../styles/Home.module.css";
import NavbarSearch from '../../src/Layouts/NavbarSearch';

function FAQ() {
  return (
    <div className="faqs">
      <NavbarSearch/>

      <div className="arrNavs faq__mt">
        <div className="arrNav">
          <svg className="arrNav__icon bp__small--none" viewBox="0 0 25 13" fill="none">
            <path d="M23.9277 6.71484H1.39802" />
            <path d="M6.16601 11.8755L1.04245 6.82883L6.16601 1.34288" />
          </svg>
          <h2 className="heading-2 weight-600 faq__mt font">
            FAQ's
          </h2>
        </div>
      </div>

      <div className="faq">
        <section class="accordion">
          <input type="checkbox" name="collapse" id="handle1" />
          <h2 class="handle">
            <label for="handle1">Requirement</label>
          </h2>
          <div class="content">
            <p className="para para--size-16 para--dark-2">
              A pale, bitter, highly attenuated and well carbonated Trappist
              ale, showing a fruity-spicy Trappist yeast character, a
              spicy-floral hop profile, and a soft, supportive grainy-sweet malt
              palate.
            </p>
            <p className="para para--size-16 para--dark-2">
              While Trappist breweries have a tradition of brewing a
              lower-strength beer as a monk’s daily ration, the bitter, pale
              beer this style describes is a relatively modern invention
              reflecting current tastes. Westvleteren first brewed theirs in
              1999, but replaced older lower-gravity products.
            </p>
          </div>
        </section>
        <section class="accordion">
          <input type="checkbox" name="collapse" id="handle2" />
          <h2 class="handle">
            <label for="handle2">Descriptions</label>
          </h2>
          <div class="content">
            <p className="para para--size-16 para--dark-2">
              A pale, bitter, highly attenuated and well carbonated Trappist
              ale, showing a fruity-spicy Trappist yeast character, a
              spicy-floral hop profile, and a soft, supportive grainy-sweet malt
              palate.
            </p>
            <p className="para para--size-16 para--dark-2">
              While Trappist breweries have a tradition of brewing a
              lower-strength beer as a monk’s daily ration, the bitter, pale
              beer this style describes is a relatively modern invention
              reflecting current tastes. Westvleteren first brewed theirs in
              1999, but replaced older lower-gravity products.
            </p>
          </div>
        </section>
        <section class="accordion">
          <input type="checkbox" name="collapse" id="handle3" />
          <h2 class="handle">
            <label for="handle3">Event Info</label>
          </h2>
          <div class="content">
            <p className="para para--size-16 para--dark-2">
              A pale, bitter, highly attenuated and well carbonated Trappist
              ale, showing a fruity-spicy Trappist yeast character, a
              spicy-floral hop profile, and a soft, supportive grainy-sweet malt
              palate.
            </p>
            <p className="para para--size-16 para--dark-2">
              While Trappist breweries have a tradition of brewing a
              lower-strength beer as a monk’s daily ration, the bitter, pale
              beer this style describes is a relatively modern invention
              reflecting current tastes. Westvleteren first brewed theirs in
              1999, but replaced older lower-gravity products.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}

export default FAQ;
