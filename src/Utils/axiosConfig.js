import axios from "axios";
import * as CryptoJS from "crypto-js";
import { getCookie, setCookie, checkCookie } from '../../redux/localstorage';

const axiosConfig = axios.create({
  baseURL: "https://server.collectanea.co",
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

axiosConfig.interceptors.request.use(
  function (config) {
    const Token = decryptData();        
    if (Token) config.headers["Authorization"] = "Token " + Token;

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export const decryptData = () => {
  try {
    let cookie;
    if(checkCookie("secret")){
      cookie = getCookie("secret");      
    } 
    const bytes = CryptoJS.AES.decrypt(
      cookie,
      "gje0u49mcw094rm-0r23"
    );
    if (bytes.toString()) {
      return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    }    
  } catch (e) {
    return null;
  }
};

export const axioslogin = axios.create({
  baseURL: "https://server.collectanea.co",
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

export default axiosConfig;
