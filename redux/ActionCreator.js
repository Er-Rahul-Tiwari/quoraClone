import * as Actions from "./Actions";
import axiosConfig from "../src/Utils/axiosConfig";
import { loadState, saveState, getCookie, setCookie, checkCookie } from "./localstorage";

export const getProfile = (dispatch) => {
  return new Promise((resolve, reject) => {
    if (checkCookie("secret")) {      
      if (checkCookie("state")) {
        const data = loadState();
        resolve(data);
        return dispatch(addProfile(data));
      } 
      return axiosConfig
        .get("/api/auth/get-my-profile/") 
        .then((response) => {
          if (response.status != 200) throw new Error();
          const data = response.data;
          dispatch(addProfile(data));
          resolve(data);
          saveState(data);
        })
        .catch((error) => {
          if (error.response) {
            let data = {
              unauthenticated: true,
            };
            reject(data);
            return dispatch(addProfile(data));
          } else {
            reject(data);
            console.log(error.message);
          }
        });
    } else {
      let data = {
        unauthenticated: true,
      };
      reject(data);
      return dispatch(addProfile(data));
    }
  });
};

export const addProfile = (data) => ({
  type: Actions.ADD_PROFILE_INFO,
  payload: data,
});

