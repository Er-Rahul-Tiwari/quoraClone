import styles from "./footerComponent.module.css";

function FooterComponent() {
  return (
    <div className={styles.footer}>
      <div className={styles.footerInside}>
        <div className={styles.alreadyAccount}>
          <div className={styles.footerTextPrimary}>
            <p>Already have an account?</p>
          </div>
          <div className={styles.footerTextSecondary}>
            <p>Sign in here</p>
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

export default FooterComponent;
