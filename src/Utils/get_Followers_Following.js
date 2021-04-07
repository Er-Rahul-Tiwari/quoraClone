import axiosConfig from './axiosConfig';

export const getFollowerslist = () => {
  return new Promise((resolve, reject) => {
    axiosConfig
      .get("/api/auth/get-followers-list/")
      .then((response) => {
        resolve(response.data.body);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const getFollowingsList = () => {
  return new Promise((resolve, reject) => {
    axiosConfig
      .get("/api/auth/get-followings-list/")
      .then((response) => {
        resolve(response.data.body);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
