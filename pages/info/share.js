import NavbarSearch from "../../src/Layouts/NavbarSearch";
import styles from "../../styles/Home.module.css";

function Share() {
  return (
    <div className="reports" id="modalbackground">
      <NavbarSearch />
      <div className="arrNavs report__mt">
        <div className="arrNav">
          <svg
            className="arrNav__icon u-margin-bottom-small bp__small--none"
            viewBox="0 0 25 13"
            fill="none"
            style={{ cursor: "pointer" }}
            onClick={() => history.back()}
          >
            <path d="M23.9277 6.71484H1.39802" />
            <path d="M6.16601 11.8755L1.04245 6.82883L6.16601 1.34288" />
          </svg>
        </div>
        <h2 className="heading-2 weight-600 report__mt font">
          Share the app
        </h2>
      </div>
      <div className="share__cards">
        <div>
          <div className="share__card"></div>
          <p className="share__para">PlayMarket</p>
        </div>
        <div>
          <div className="share__card"></div>
          <p className="share__para">AppStore</p>
        </div>
      </div>
    </div>
  );
}

export default Share;
