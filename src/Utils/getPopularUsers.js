import React from "react";
import axiosConfig from './axiosConfig';

const getPopularUsers = () => {
  return new Promise((resolve, reject) => {
    axiosConfig
      .get("/api/auth/get-Popular-Users/?limit=8&offset=0")
      .then((response) => {
        if (response.status != 200) throw new Error();
        let popularUsers = response.data.body;
        resolve(popularUsers);
      })
      .catch((error) => {
        if (error.response) {
          reject(error);
        } else {
          reject(error);
        }
      });
  });
};

export default getPopularUsers;
