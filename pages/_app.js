import "../styles/globals.css";
import "../src/Components/contactUsComponent/sass/index.scss";
import "../src/Components/faqComponent/sass/index.scss";
import "../src/Components/reportComponent/sass/index.scss";
import "../src/Components/shareComponent/sass/index.scss";
import "../src/Components/signUpComponent/sass/index.scss";
import "../src/Components/signInComponent/sass/index.scss";
import "../src/Components/continueAccount/sass/index.scss";
import "../src/Components/category/sass/index.scss";
import "../src/Components/searchResult/sass/index.scss";
import "../src/Components/editProfile/sass/index.scss";
import "../src/Components/profile/sass/index.scss";
import "../src/Components/home/sass/index.scss";
import "../src/Components/allAnswer/sass/index.scss";
import "../src/Components/allReply/sass/index.scss";
import "../src/Components/allLike/sass/index.scss";
import "../src/Components/allBookMark/sass/index.scss";
import "../src/Components/allNotification/sass/index.scss";
import "../src/Components/answer/sass/index.scss";
import "../src/Components/follower/sass/index.scss";
import "../src/Components/following/sass/index.scss";
import "../src/Components/searchResult/sass/index.scss";
import styles from "../styles/Home.module.css";
import { Provider } from "react-redux";
import { ConfigureStore } from "../redux/configureStore";

function MyApp({ Component, pageProps }) {
  const store = ConfigureStore();

  return (
    <Provider store={store}>
      <div className={styles.font}>
        <Component {...pageProps} />
      </div>
    </Provider>
  );
}

export default MyApp;
