import axiosConfig from "./axiosConfig";

const searchCategory = (text) => {
  return new Promise((resolve, reject) => {
    const data = new FormData();
    data.append("text", text);
    axiosConfig
      .post("/api/questions/search-category/", data)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export default searchCategory;
