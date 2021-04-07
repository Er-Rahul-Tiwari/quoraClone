import * as CryptoJS from "crypto-js";

export const encryptData = (data) => {
  try {
    return CryptoJS.AES.encrypt(
      JSON.stringify(data),
      "gje0u49mcw094rm-0r23"
    ).toString();
  } catch (e) {
    console.log(e);
  }
};

export const decryptData = (data) => {
  try {
    const bytes = CryptoJS.AES.decrypt(data, "gje0u49mcw094rm-0r23");
    if (bytes.toString()) {
      return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    }
    return data;
  } catch (e) {
    return e
  }
};
