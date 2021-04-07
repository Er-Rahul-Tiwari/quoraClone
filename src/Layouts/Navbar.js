import React from "react";

function Navbar(props) {
  return (
    <>
    <div className="nav__backArrow bpLarge__display" id="modalbackground">
      <a href="">
        <svg className="arrNav__icon" viewBox="0 0 25 13" fill="none">
          <path d="M23.9277 6.71484H1.39802" />
          <path d="M6.16601 11.8755L1.04245 6.82883L6.16601 1.34288" />
        </svg>
      </a>
    </div>

    <a href="/" className="nav__logo">
      <h4>Collectnea</h4>
    </a>

    <div className="nav">
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

  </>
  );
}

export default Navbar;
