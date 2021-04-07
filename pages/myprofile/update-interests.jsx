import React, { useState, useEffect } from "react";
import NavbarIcon from "../../src/Layouts/NavbarIcon";
import axiosConfig from "../../src/Utils/axiosConfig";
import { Button, Fab, Modal, makeStyles } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import { useRouter } from "next/router";
import AlertboxComponent from "../../src/Components/alertboxComponent/alertboxComponent";
import styles from "../../styles/Home.module.css";
import { removeCookie } from "../../redux/localstorage";

const useStyles = makeStyles((theme) => ({
  skeleton: {
    height: "100%",
  },
}));

function category() {
  const classes = useStyles();
  const [categories, setCategories] = useState();
  const [storeCategories, setStore] = useState([]);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const [message, setMessage] = useState("");

  useEffect(() => {
    axiosConfig
      .get("/api/questions/get-categories/")
      .then((response) => {
        setCategories(response.data.body);
      })
      .catch((error) => {
        alert(error.message);
      });
  }, []);

  const handleOpen = () => {
    setOpen(true);
    document.getElementById("modalbackground").style.filter = "blur(3px)";
  };

  const handleClose = () => {
    setOpen(false);
    document.getElementById("modalbackground").style.filter = "none";
  };

  const categoryClicked = (id) => {
    if (storeCategories.indexOf(id) != -1) {
      document.getElementById(id).style.backgroundColor = "white";
      storeCategories.splice(storeCategories.indexOf(id), 1);
      setStore(storeCategories);
    } else {
      document.getElementById(id).style.backgroundColor = "#4BB297";
      storeCategories.push(id);
      setStore(storeCategories);
    }
  };

  const divide = () => {
    if (categories) {
      let main = [];
      let count = 0;
      let temp = [];
      for (let i = 0; i <= categories.length; i++) {
        if (count == 11 || i == categories.length) {
          main.push(temp);
          count = 0;
          temp = [];
        }
        temp.push(categories[i]);
        count++;
      }
      return main;
    }
  };

  const items = (category) => {
    return category.map((cat) => {
      let i = category.indexOf(cat) + 1;
      let cl = "category__grids__border category__grids__border--" + i;
      const style = { cursor: "pointer" };
      return (
        <div
          id={cat.id}
          className={cl}
          style={style}
          onClick={() => categoryClicked(cat.id)}
        >
          <label className="category__grids__link">{cat.name}</label>
        </div>
      );
    });
  };

  const categoryTiles = () => {
    if (categories) {
      const array = divide();
      const main = [];
      for (let i = 0; i < array.length; i++) {
        const oneCat = () => (
          <div className="category__grids">{items(array[i])}</div>
        );
        main.push(oneCat());
      }
      return main;
    }
  };

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

  const proceed = () => {
    if (storeCategories.length < 6 || storeCategories.length > 30) {
      setMessage("Add 6-30 topics of your interests");
      handleOpen();
    } else {
      const data = new FormData();
      for (let i in storeCategories) {
        data.append("category", storeCategories[i]);
      }
      axiosConfig
        .patch("/api/auth/update-interests/", data)
        .then((response) => {
          if (response.status != 200) {
            setMessage(response.message);
            handleOpen();
          }
          removeCookie("state");
          //window.location.reload(false);
          
        })
        .catch((error) => {
          setMessage("Something went wrong");
          handleOpen();
        });
    }
  };

  const skeletonTiles = () => {
    return (
      <div className="category__grids">
        <Skeleton
          variant="rect"
          height="100%"
          className="category__grids__border--1"
        />
        <Skeleton
          variant="rect"
          height="100%"
          className="category__grids__border--2"
        />
        <Skeleton
          variant="rect"
          height="100%"
          className="category__grids__border--3"
        />
        <Skeleton
          variant="rect"
          height="100%"
          className="category__grids__border--4"
        />
        <Skeleton
          variant="rect"
          height="100%"
          className="category__grids__border--5"
        />
        <Skeleton
          variant="rect"
          height="100%"
          className="category__grids__border--6"
        />
        <Skeleton
          variant="rect"
          height="100%"
          className="category__grids__border--7"
        />
        <Skeleton
          variant="rect"
          height="100%"
          className="category__grids__border--8"
        />
        <Skeleton
          variant="rect"
          height="100%"
          className="category__grids__border--9"
        />
        <Skeleton
          variant="rect"
          height="100%"
          className="category__grids__border--10"
        />
        <Skeleton
          variant="rect"
          height="100%"
          className="category__grids__border--11"
        />
      </div>
    );
  };

  const failureModal = () => {
    return (
      <Modal open={open} onClose={handleClose}>
        <AlertboxComponent close={handleClose} message={message} />
      </Modal>
    );
  };

  if (!categories) {
    return (
      <div className="categories" id="modalbackground">
        {failureModal()}
        <NavbarIcon />
        <div className="arrNavs">
          <div className="">
            <h2 className="heading-2 weight-600">
              <label className={styles.font}>What are you interested in?</label>
            </h2>
          </div>
        </div>

        <form
          className="nav__search_up nav__search_up__grid-3"
          style={{ width: "100%", marginLeft: "25%" }}          
        >
          <svg className="nav__search_up__icon" viewBox="0 0 15 15" fill="none">
            <circle
              cx="7.6156"
              cy="7.31202"
              r="4.29962"
              transform="rotate(-59.841 7.6156 7.31202)"
              stroke="#312E2E"
              strokeWidth="1.4"
            />
            <path
              d="M10.3757 10.3086L13.1489 13.2068"
              stroke="#312E2E"
              strokeWidth="1.4"
            />
          </svg>

          <input
            type="text"
            id="MainSearchbar"
            className="nav__search_up__input"
            placeholder="Cooking, UX Design, Health, Photography, Books"
          />

          <button
            className="btn btn--black nav__search_up__btn"
            style={{ cursor: "pointer" }}            
          >
            <label className={styles.font} style={{ cursor: "pointer" }}>
              Search
            </label>
          </button>
        </form>

        {skeletonTiles()}
      </div>
    );
  }
  return (
    <div className="categories" id="modalbackground">
      {failureModal()}
      <NavbarIcon />
      <div className="arrNavs">
        <div className="">
          <h2 className="heading-2 weight-600">
            <label className={styles.font}>What are you interested in?</label>
          </h2>
        </div>
      </div>

      <form
        className="nav__search_up nav__search_up__grid-3"
        style={{ width: "100%", marginLeft: "25%" }}
        onSubmit={async (e) => {
          e.preventDefault();
          let text = document.getElementById("MainSearchbar").value;
          await searchCategory(text)
            .then((resolve) => {
              setCategories(resolve.data.body);
            })
            .catch((reject) => {});
        }}
      >
        <svg className="nav__search_up__icon" viewBox="0 0 15 15" fill="none">
          <circle
            cx="7.6156"
            cy="7.31202"
            r="4.29962"
            transform="rotate(-59.841 7.6156 7.31202)"
            stroke="#312E2E"
            strokeWidth="1.4"
          />
          <path
            d="M10.3757 10.3086L13.1489 13.2068"
            stroke="#312E2E"
            strokeWidth="1.4"
          />
        </svg>

        <input
          type="text"
          id="MainSearchbar"
          className="nav__search_up__input"
          placeholder="Cooking, UX Design, Health, Photography, Books"
        />

        <button
          className="btn btn--black nav__search_up__btn"
          style={{ cursor: "pointer" }}
          type="submit"
        >
          <label className={styles.font} style={{ cursor: "pointer" }}>
            Search
          </label>
        </button>
      </form>

      {categoryTiles()}
      <Fab
        variant="extended"
        style={{
          backgroundColor: "#4f4f4f",
          color: "floralwhite",
          bottom: "15px",
          position: "fixed",
          left: "48%",
          right: "48%",
        }}
        onClick={() => proceed()}
      >
        Proceed
      </Fab>
    </div>
  );
}

export default category;
