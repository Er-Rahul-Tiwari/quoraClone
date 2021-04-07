import styles from "../../styles/Home.module.css";
import NavbarSearch from "../../src/Layouts/NavbarSearch";
import { Skeleton } from "@material-ui/lab";

function Terms() {
  return (
    <div className="faqs">
      <NavbarSearch />

      <div className="arrNavs faq__mt">
        <div className="arrNav">
          <svg
            className="arrNav__icon"
            viewBox="0 0 25 13"
            fill="none"
            style={{ cursor: "pointer" }}
            onClick={() => history.back()}
          >
            <path d="M23.9277 6.71484H1.39802" />
            <path d="M6.16601 11.8755L1.04245 6.82883L6.16601 1.34288" />
          </svg>
          <h2 className="heading-2 weight-600 faq__mt font">
            Terms and conditions
          </h2>
        </div>
      </div>

      <div className="faq">
        <div style={{ width: "50%" }}>
          <div style={{ width: "100%" }}>
            <Skeleton
              variant="circle"
              width={50}
              height={50}
              style={{ display: "inline-block" }}
            />
            <Skeleton
              variant="rect"
              width={250}
              height={10}
              style={{
                display: "inline-block",
                margin: "20px 0px 20px 10px",
                borderRadius: "10px",
              }}
            />
          </div>
          <div style={{ width: "100%" }}>
            <Skeleton
              variant="circle"
              width={50}
              height={50}
              style={{ display: "inline-block" }}
            />
            <Skeleton
              variant="rect"
              width={250}
              height={10}
              style={{
                display: "inline-block",
                margin: "20px 0px 20px 10px",
                borderRadius: "10px",
              }}
            />
          </div>
          <div style={{ width: "100%" }}>
            <Skeleton
              variant="circle"
              width={50}
              height={50}
              style={{ display: "inline-block" }}
            />
            <Skeleton
              variant="rect"
              width={250}
              height={10}
              style={{
                display: "inline-block",
                margin: "20px 0px 20px 10px",
                borderRadius: "10px",
              }}
            />
          </div>
        </div>
        <div>
          <div style={{ display: "inline-block" }}>
            <Skeleton
              variant="rect"
              width={350}
              height={5}
              style={{
                display: "block",
                borderRadius: "10px",
                margin: "10px 0px 0px 0px",
              }}
            />
            <Skeleton
              variant="rect"
              width={350}
              height={5}
              style={{
                display: "block",
                borderRadius: "10px",
                margin: "10px 0px 0px 0px",
              }}
            />
            <Skeleton
              variant="rect"
              width={350}
              height={5}
              style={{
                display: "block",
                borderRadius: "10px",
                margin: "10px 0px 0px 0px",
              }}
            />
            <Skeleton
              variant="rect"
              width={350}
              height={5}
              style={{
                display: "block",
                borderRadius: "10px",
                margin: "10px 0px 0px 0px",
              }}
            />
            <Skeleton
              variant="rect"
              width={350}
              height={5}
              style={{
                display: "block",
                borderRadius: "10px",
                margin: "10px 0px 0px 0px",
              }}
            />
            <Skeleton
              variant="rect"
              width={350}
              height={5}
              style={{
                display: "block",
                borderRadius: "10px",
                margin: "10px 0px 0px 0px",
              }}
            />
            <Skeleton
              variant="rect"
              width={350}
              height={5}
              style={{
                display: "block",
                borderRadius: "10px",
                margin: "10px 0px 0px 0px",
              }}
            />
            <Skeleton
              variant="rect"
              width={350}
              height={5}
              style={{
                display: "block",
                borderRadius: "10px",
                margin: "10px 0px 0px 0px",
              }}
            />
            <button
              style={{
                backgroundColor: "#4f4f4f",
                color: "floralwhite",
                borderRadius: "2px",
                margin: "10px 10px 10px 10px",
              }}
              className="btn btn--black"
            >
              <label className={styles.font} style={{ lineHeight: "3px" }}>
                Agree
              </label>
            </button>
          </div>
          <div
            style={{
              display: "inline-block",
              verticalAlign: "Top",
              width: "50%",
            }}
          >
            <h3 style={{ textAlign: "center" }}>Illustration</h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Terms;
