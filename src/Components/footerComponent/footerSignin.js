import styles from "./footerComponent.module.css";

function FooterSignin() {
  return (
    <div className={styles.footer}>
      <div className={styles.footerInside}>
        <div className={styles.forgotPassword}>
          <div className={styles.footerTextPrimary}>
            <p>Forgot your password?</p>
          </div>
          <div className={styles.footerTextSecondary}>
            <p>Click here</p>
          </div>
        </div>
        <div className={styles.agreeWith}>
          <div className={styles.footerTextPrimary}>
            <p>Agree with</p>
          </div>
          <div className={styles.footerTextSecondary}>
            <p>Terms & conditions</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FooterSignin;
