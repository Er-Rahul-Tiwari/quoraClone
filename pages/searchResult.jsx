import React, { useState, useEffect } from "react";
import axiosConfig from "../src/Utils/axiosConfig";
import NavbarSearch from "../src/Layouts/NavbarSearch";
import { Avatar, makeStyles, Modal, Fade, Button } from "@material-ui/core";
import AlertboxComponent from "../src/Components/alertboxComponent/alertboxComponent";
import styles from "../styles/Home.module.css";
import SearchResultSkeleton from "../src/Skeletons/SearchResult";
import timeElapsed from "../src/Utils/timeElapsed";
import { Skeleton } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(2),
    fontSize: "13px",
    cursor: "pointer",
    borderBottom: "1px solid #ccc",
  },
  avatar: {
    width: theme.spacing(4),
    height: theme.spacing(4),
  },
  avatarLarge: {
    width: theme.spacing(6),
    height: theme.spacing(6),
    ['@media (max-width:62.5em)']:{
      width: theme.spacing(3),
      height: theme.spacing(3)
    } 
  },
}));

function SearchResult(props) {
  const active = "#4F4F4F";
  const inactive = "#E5E5E5";
  const classes = useStyles();
  const [searchResults, setSearchResults] = useState({
    type: "question",
    results: [],
  });
  const [popUsers, setPopUsers] = useState([]);
  const [popKeywords, setPopkeywords] = useState([]);
  const [text, setText] = useState("");
  const [activeKeyword, setActiveKeyword] = useState("");
  const [activeFilter, setActiveFilter] = useState("question");
  const [change, setChange] = useState();
  const [promptOpen, setPromptOpen] = useState(false);
  const [resultSkeleton, setResultSkeleton] = useState(false);
  const [wait, setWait] = useState(true);

  const handlePromptOpen = () => {
    setPromptOpen(true);
    document.getElementById("modalbackground").style.filter = "blur(5px)";
  };

  const handlePromptClose = () => {
    setPromptOpen(false);
    window.location.href = "/signin";
    document.getElementById("modalbackground").style.filter = "none";
  };

  const changeFilter = async (type) => {
    if (text) {
      let searchResults = [];
      document.getElementById(activeFilter).className =
        "searchResult__link  bpLarge__none";
      document.getElementById(type).className =
        "searchResult__link  bpLarge__none searchResult__link--active";
      await search2(text, type)
        .then((resolve) => {
          setActiveFilter(type);
          let data = {
            type: type,
            results: resolve,
          };
          setSearchResults(data);
          if (change) setChange();
          else setChange(1);
        })
        .catch((reject) => {});
    }
  };

  useEffect(() => {
    const getData = async () => {
      const query = window.location.search;
      if (query) {
        let params = query.split("?")[1];
        params = params.split("&");
        const text = params[0].split("=")[1];
        const type = params[1].split("=")[1];
        await search(text, type)
          .then((resolve) => {
            let data = {
              type: "question",
              results: resolve.data.body,
            };
            setSearchResults(data);
          })
          .catch((reject) => {});
      }
      await getPopularKeywords()
        .then((resolve) => {
          setPopkeywords(resolve);
        })
        .catch((reject) => {
          alert(reject);
        });
      await getPopularUsers()
        .then((resolve) => {
          setPopUsers(resolve);
        })
        .catch((reject) => {
          alert(reject);
        });
    };
    getData();
    setWait(false);
  }, []);

  const search = (text, type) => {
    let arr = text.split("+");
    let properText = "";
    for (let i = 0; i < arr.length; i++) {
      if (i == arr.length - 1) {
        properText = properText + arr[i];
      } else {
        properText = properText + arr[i] + " ";
      }
    }
    document.getElementById("MainSearchbar").value = properText;
    setText(properText);
    return new Promise((resolve, reject) => {
      setResultSkeleton(true);
      const data = new FormData();
      data.append("text", properText);
      data.append("type", type);
      axiosConfig
        .post("/api/questions/search-questions/", data)
        .then((response) => {
          if (response.status != 200) throw new Error();
          let data = {
            type: "question",
            results: response.data.body,
          };
          setSearchResults(data);
          resolve(response);
          setResultSkeleton(false);
          document.getElementById(activeFilter).className =
            "searchResult__link  bpLarge__none";
          document.getElementById(type).className =
            "searchResult__link  bpLarge__none searchResult__link--active";
          setActiveFilter(type);
          if (change) setChange();
          else setChange(1);
        })
        .catch((error) => {
          if (error.response.status == 401) {
            reject(error.response);
            handlePromptOpen();
          } else {
            reject(error);
          }
        });
    });
  };

  const search2 = (text, type) => {
    return new Promise((resolve, reject) => {
      setResultSkeleton(true);
      const data = new FormData();
      data.append("text", text);
      data.append("type", type);
      axiosConfig
        .post("/api/questions/search-questions/", data)
        .then((response) => {
          if (response.status != 200) throw new Error();
          resolve(response.data.body);
          setResultSkeleton(false);
        })
        .catch((error) => {
          if (error.response.status == 401) {
            reject(error.response);
            handlePromptOpen();
          } else {
            reject(error);
          }
        });
    });
  };

  const getPopularUsers = () => {
    return new Promise((resolve, reject) => {
      axiosConfig
        .get("/api/auth/get-Popular-Users/")
        .then((response) => {
          if (response.status != 200) throw new Error();
          let popularUsers = response.data.body;
          let users = popularUsers.splice(0, 8);
          resolve(users);
        })
        .catch((error) => {
          if (error.response) {
            reject(error);
          } else {
            console.log("Something went wrong");
            reject(error);
          }
        });
    });
  };

  const results = () => {
    if (resultSkeleton) {
      return (
        <div className="resultCards">
          <div className="resultCard">
            <Skeleton variant="rect" height={100} className="resultCard__img" />
            <div className="resultCard__cart">
              <Skeleton height={40} className="resultCard__icon" />
            </div>
            <div className="resultCard__items">
              <Skeleton
                variant="rect"
                style={{ width: "85%" }}
                className="heading-4"
              />
              <Skeleton
                variant="rect"
                style={{ width: "85%" }}
                className="resultCard__para"
              />
              <Skeleton
                variant="rect"
                style={{ width: "85%" }}
                className="resultCard__email"
              />
            </div>
            <Skeleton
              variant="rect"
              width={100}
              className="btn__small btn--black resultCard__btn"
            />
          </div>

          {/* 2 */}
          <div className="resultCard">
            <Skeleton variant="rect" height={100} className="resultCard__img" />
            <div className="resultCard__cart">
              <Skeleton height={40} className="resultCard__icon" />
            </div>
            <div className="resultCard__items">
              <Skeleton
                variant="rect"
                style={{ width: "85%" }}
                className="heading-4"
              />
              <Skeleton
                variant="rect"
                style={{ width: "85%" }}
                className="resultCard__para"
              />
              <Skeleton
                variant="rect"
                style={{ width: "85%" }}
                className="resultCard__email"
              />
            </div>
            <Skeleton
              variant="rect"
              width={100}
              className="btn__small btn--black resultCard__btn"
            />
          </div>
          {/* 3 */}
          <div className="resultCard">
            <Skeleton variant="rect" height={100} className="resultCard__img" />
            <div className="resultCard__cart">
              <Skeleton height={40} className="resultCard__icon" />
            </div>
            <div className="resultCard__items">
              <Skeleton
                variant="rect"
                style={{ width: "85%" }}
                className="heading-4"
              />
              <Skeleton
                variant="rect"
                style={{ width: "85%" }}
                className="resultCard__para"
              />
              <Skeleton
                variant="rect"
                style={{ width: "85%" }}
                className="resultCard__email"
              />
            </div>
            <Skeleton
              variant="rect"
              width={100}
              className="btn__small btn--black resultCard__btn"
            />
          </div>
          {/* 4 */}
          <div className="resultCard">
            <Skeleton variant="rect" height={100} className="resultCard__img" />
            <div className="resultCard__cart">
              <Skeleton height={40} className="resultCard__icon" />
            </div>
            <div className="resultCard__items">
              <Skeleton
                variant="rect"
                style={{ width: "85%" }}
                className="heading-4"
              />
              <Skeleton
                variant="rect"
                style={{ width: "85%" }}
                className="resultCard__para"
              />
              <Skeleton
                variant="rect"
                style={{ width: "85%" }}
                className="resultCard__email"
              />
            </div>
            <Skeleton
              variant="rect"
              width={100}
              className="btn__small btn--black resultCard__btn"
            />
          </div>
        </div>
      );
    } else {
      if (searchResults.results && searchResults.results.length != 0) {
        if (searchResults.type === "user") {
          return searchResults.results.map((item) => {
            let image =
              "https://hoptheque.in/testing/project/Nexter/img/realtor-1.jpeg";
            if (item.profileURL) {
              image = item.profileURL.split("?")[0];
            }
            return (
              <div className="resultCard">
                <img className="resultCard__img" src={image} />
                <div className="resultCard__cart">
                  <svg className="resultCard__icon" viewBox="0 0 19 28">
                    <path
                      d="M18.0476 0.912109H1.54746C1.12208 0.912109 0.777222 1.25697 0.777222 1.68235V26.4326C0.777222 26.7442 0.964903 27.025 1.25271 27.1442C1.34802 27.1837 1.4481 27.2029 1.5473 27.2029C1.74772 27.2029 1.94475 27.1247 2.09207 26.9772L9.79767 19.2717L17.503 26.9772C17.7233 27.1976 18.0545 27.2634 18.3424 27.1442C18.6302 27.025 18.8179 26.7442 18.8179 26.4326V1.68235C18.8179 1.25697 18.4731 0.912109 18.0476 0.912109Z"
                      fill="#E5E5E5"
                    />
                  </svg>
                </div>
                <div className="resultCard__items">
                  <h4
                    className="heading-4"
                    style={{ cursor: "pointer" }}
                    onClick={() =>
                      (window.location.href = "user/" + item.userID)
                    }
                  >
                    {item.user.username}
                  </h4>
                  <p className="resultCard__para">{item.bio}</p>
                  <p className="resultCard__email">{item.user.email}</p>
                </div>
                <button className="btn__small btn--black resultCard__btn">
                  See more
                </button>
              </div>
            );
          });
        } else if (searchResults.type === "question") {
          return searchResults.results.map((q) => {
            if (q.question_type === "normal") {
              const aggVotes = q.upvote_count - q.downvote_count;
              const keywords = q.keywords.map((key) => (
                <label className="homeCard__link">{key.name}</label>
              ));
              const upvoteColor = q.reaction === "upvote" ? active : inactive;
              const downvoteColor =
                q.reaction === "downvote" ? active : inactive;
              const bookmarkColor =
                q.is_bookmarked === "True" ? active : inactive;
              let image = q.category;
              if (image) {
                image = image.category_svg;
                if (image) image = image.split("?")[0];
              }
              const topAnswer = () => {
                if (q.Answer.Answer) {
                  return <p className=" homeCard__topAnswer">Top answer</p>;
                }
                return <div></div>;
              };
              const question_detail = "/question/" + q.id;
              let elapsed = timeElapsed(new Date(q.created_at));
              return (
                <div className="homeCard">
                  <Avatar className={classes.avatarLarge} src={image} />
                  <div className="homeCard__cart">
                    <svg
                      className="homeCard__icon"
                      viewBox="0 0 19 28"
                      style={{ fill: bookmarkColor }}
                    >
                      <path d="M18.0476 0.912109H1.54746C1.12208 0.912109 0.777222 1.25697 0.777222 1.68235V26.4326C0.777222 26.7442 0.964903 27.025 1.25271 27.1442C1.34802 27.1837 1.4481 27.2029 1.5473 27.2029C1.74772 27.2029 1.94475 27.1247 2.09207 26.9772L9.79767 19.2717L17.503 26.9772C17.7233 27.1976 18.0545 27.2634 18.3424 27.1442C18.6302 27.025 18.8179 26.7442 18.8179 26.4326V1.68235C18.8179 1.25697 18.4731 0.912109 18.0476 0.912109Z" />
                    </svg>
                  </div>
                  <div className="homeCard__items">
                    <a
                      href={question_detail}
                      className="homeCard__heading line-height-1 para--dark-3"
                    >
                      {q.content}
                    </a>
                    <p className="para--size-10 para--dark">{elapsed}</p>
                  </div>
                  {topAnswer()}
                  <div className="homeCard__reply">{q.Answer.Answer}</div>
                  <div className="homeCard__countReply">
                    <svg
                      className="homeCard__upPolygon"
                      viewBox="0 0 27 24"
                      style={{ fill: upvoteColor }}
                    >
                      <path d="M12.7207 0.720705C13.1056 0.054038 14.0678 0.0540364 14.4527 0.720703L26.6374 21.8251C27.0223 22.4918 26.5412 23.3251 25.7714 23.3251H1.40206C0.632264 23.3251 0.151137 22.4918 0.536037 21.8251L12.7207 0.720705Z" />
                    </svg>
                    <p className="para--size-10">{aggVotes}</p>
                    <svg
                      className="homeCard__downPolygon"
                      viewBox="0 0 27 24"
                      style={{ fill: downvoteColor }}
                    >
                      <path d="M13.2036 22.6396C13.5885 23.3063 14.5507 23.3063 14.9356 22.6396L27.1203 1.53522C27.5052 0.868547 27.0241 0.0352135 26.2543 0.0352135H1.88497C1.11517 0.0352135 0.634047 0.868547 1.01895 1.53521L13.2036 22.6396Z" />
                    </svg>
                  </div>
                  <div className="homeCard__links" style={{ width: "90%" }}>
                    {keywords}
                  </div>
                  <button className="btn__small btn--black homeCard__btn">
                    <a
                      href={question_detail}
                      className={styles.font}
                      style={{ color: "white" }}
                    >
                      {q.answer_count} Answers
                    </a>
                  </button>
                </div>
              );
            }
            const upvoteColor = q.reaction === "upvote" ? active : inactive;
            const downvoteColor = q.reaction === "downvote" ? active : inactive;
            const bookmarkColor =
              q.is_bookmarked === "True" ? active : inactive;
            const aggVotes = q.upvote_count - q.downvote_count;
            let image = q.category;
            if (image) {
              image = image.category_svg;
              if (image) image = image.split("?")[0];
            }
            let elapsed = timeElapsed(new Date(q.created_at));
            const Options = q.Options.map((option) => {
              let percentStr = option.option_percentage + "%";
              let percent = option.option_percentage;
              if (percent === 0) {
                percent = 1;
                percentStr = "0%";
              }
              return (
                <div
                  className="homeCard__progress homeCard__progress--progress"
                  style={{ width: percent + "%", cursor: "pointer" }}
                >
                  <p className="homeCard__progress--name">
                    {option.option_name}
                  </p>
                  <p className="homeCard__progress--value">{percentStr}</p>
                </div>
              );
            });
            const keywords = q.keywords.map((key) => (
              <label className="homeCard__link">{key.name}</label>
            ));
            return (
              <div className="homeCard">
                <Avatar className={classes.avatarLarge} src={image} />
                <div className="homeCard__cart">
                  <svg
                    className="homeCard__icon"
                    viewBox="0 0 19 28"
                    style={{ fill: bookmarkColor }}
                  >
                    <path d="M18.0476 0.912109H1.54746C1.12208 0.912109 0.777222 1.25697 0.777222 1.68235V26.4326C0.777222 26.7442 0.964903 27.025 1.25271 27.1442C1.34802 27.1837 1.4481 27.2029 1.5473 27.2029C1.74772 27.2029 1.94475 27.1247 2.09207 26.9772L9.79767 19.2717L17.503 26.9772C17.7233 27.1976 18.0545 27.2634 18.3424 27.1442C18.6302 27.025 18.8179 26.7442 18.8179 26.4326V1.68235C18.8179 1.25697 18.4731 0.912109 18.0476 0.912109Z" />
                  </svg>
                </div>
                <div className="homeCard__items">
                  <p className="homeCard__heading line-height-1 para--dark-3">
                    {q.content}
                  </p>
                  <p className="para--size-10 para--dark">{elapsed}</p>
                </div>
                <div className="homeCard__box">{Options}</div>
                <div className="homeCard__countReply">
                  <svg
                    className="homeCard__upPolygon"
                    viewBox="0 0 27 24"
                    style={{ fill: upvoteColor }}
                  >
                    <path d="M12.7207 0.720705C13.1056 0.054038 14.0678 0.0540364 14.4527 0.720703L26.6374 21.8251C27.0223 22.4918 26.5412 23.3251 25.7714 23.3251H1.40206C0.632264 23.3251 0.151137 22.4918 0.536037 21.8251L12.7207 0.720705Z" />
                  </svg>
                  <p className="para--size-10">{aggVotes}</p>
                  <svg
                    className="homeCard__downPolygon"
                    viewBox="0 0 27 24"
                    style={{ fill: downvoteColor }}
                  >
                    <path d="M13.2036 22.6396C13.5885 23.3063 14.5507 23.3063 14.9356 22.6396L27.1203 1.53522C27.5052 0.868547 27.0241 0.0352135 26.2543 0.0352135H1.88497C1.11517 0.0352135 0.634047 0.868547 1.01895 1.53521L13.2036 22.6396Z" />
                  </svg>
                </div>
                <div className="homeCard__links">{keywords}</div>
                <button className="btn__small btn--black homeCard__btn">
                  <label className={styles.font} style={{ cursor: "pointer" }}>
                    {q.answer_count} votes
                  </label>
                </button>
              </div>
            );
          });
        } else if (searchResults.type === "answer") {
          return searchResults.results.map((q) => {
            const aggVotes = q.upvote_count - q.downvote_count;
            const keywords = q.keywords.map((key) => (
              <label className="homeCard__link">{key.name}</label>
            ));
            const upvoteColor = q.reaction === "upvote" ? active : inactive;
            const downvoteColor = q.reaction === "downvote" ? active : inactive;
            const bookmarkColor =
              q.is_bookmarked === "True" ? active : inactive;
            let image = q.category.category_svg;
            if (image) {
              image = image.split("server.collectanea.co")[1];
              if (image) image = image.split("?")[0];
            }
            let elapsed = timeElapsed(new Date(q.created_at));
            const topAnswer = () => {
              if (q.Answer.Answer) {
                return <p className=" homeCard__topAnswer">Top answer</p>;
              }
              return <div></div>;
            };
            const question_detail = "/question/" + q.id;
            return (
              <div className="homeCard">
                <Avatar className={classes.avatarLarge} src={image} />
                <div className="homeCard__cart">
                  <svg
                    className="homeCard__icon"
                    viewBox="0 0 19 28"
                    style={{ fill: bookmarkColor }}
                  >
                    <path d="M18.0476 0.912109H1.54746C1.12208 0.912109 0.777222 1.25697 0.777222 1.68235V26.4326C0.777222 26.7442 0.964903 27.025 1.25271 27.1442C1.34802 27.1837 1.4481 27.2029 1.5473 27.2029C1.74772 27.2029 1.94475 27.1247 2.09207 26.9772L9.79767 19.2717L17.503 26.9772C17.7233 27.1976 18.0545 27.2634 18.3424 27.1442C18.6302 27.025 18.8179 26.7442 18.8179 26.4326V1.68235C18.8179 1.25697 18.4731 0.912109 18.0476 0.912109Z" />
                  </svg>
                </div>
                <div className="homeCard__items">
                  <a
                    href={question_detail}
                    className="homeCard__heading line-height-1 para--dark-3"
                  >
                    {q.content}
                  </a>
                  <p className="para--size-10 para--dark">{elapsed}</p>
                </div>
                {topAnswer()}
                <div className="homeCard__reply">{q.Answer.Answer}</div>
                <div className="homeCard__countReply">
                  <svg
                    className="homeCard__upPolygon"
                    viewBox="0 0 27 24"
                    style={{ fill: upvoteColor }}
                  >
                    <path d="M12.7207 0.720705C13.1056 0.054038 14.0678 0.0540364 14.4527 0.720703L26.6374 21.8251C27.0223 22.4918 26.5412 23.3251 25.7714 23.3251H1.40206C0.632264 23.3251 0.151137 22.4918 0.536037 21.8251L12.7207 0.720705Z" />
                  </svg>
                  <p className="para--size-10">{aggVotes}</p>
                  <svg
                    className="homeCard__downPolygon"
                    viewBox="0 0 27 24"
                    style={{ fill: downvoteColor }}
                  >
                    <path d="M13.2036 22.6396C13.5885 23.3063 14.5507 23.3063 14.9356 22.6396L27.1203 1.53522C27.5052 0.868547 27.0241 0.0352135 26.2543 0.0352135H1.88497C1.11517 0.0352135 0.634047 0.868547 1.01895 1.53521L13.2036 22.6396Z" />
                  </svg>
                </div>
                <div className="homeCard__links" style={{ width: "90%" }}>
                  {keywords}
                </div>
                <button className="btn__small btn--black homeCard__btn">
                  <a
                    href={question_detail}
                    className={styles.font}
                    style={{ color: "white" }}
                  >
                    {q.answer_count} Answers
                  </a>
                </button>
              </div>
            );
          });
        } else if (searchResults.type === "comment") {
        }
      }
      return (
        <h3
          style={{
            textAlign: "center",
            marginTop: "100px",
          }}
        >
          No results
        </h3>
      );
    }
  };

  const getPopularKeywords = () => {
    return new Promise((resolve, reject) => {
      const params = new URLSearchParams();
      params.append("limit", "10");
      params.append("offset", "0");
      axiosConfig
        .get("/api/questions/get-popular-keyword/", params)
        .then((response) => {
          if (response.status != 200) throw new Error();
          let popularKeywords = response.data.body;
          let keywords = popularKeywords.splice(0, 12);
          resolve(keywords);
          setActiveKeyword(keywords[0].id + "keyword");
        })
        .catch((error) => {
          if (error.response) {
          } else {
            console.log("Something went wrong");
          }
          reject(error);
        });
    });
  };

  const topKeywords = popKeywords.map((key) => {
    if (popKeywords.indexOf(key) != 0) {
      return (
        <a
          className="keyword__link"
          style={{ cursor: "pointer" }}
          onClick={() => {
            window.location.href = "/?keyword=" + key.id;
          }}
        >
          {key.name}
        </a>
      );
    }
    return <a className="keyword__link keyword__link--active">{key.name}</a>;
  });

  const topUsers = popUsers.map((user) => {
    const answers = () => {
      if (user.answers) {
        return "(" + user.answers + "Answers)";
      }
    };
    const image = user.profileURL
      ? user.profileURL.split("?")[0]
      : "https://hoptheque.in/testing/project/Nexter/img/realtor-1.jpeg";
    return (
      <div className="user__list">
        <Avatar className={classes.avatar} src={image} />
        <a href={"user/" + user.userID} className="para--size-12 para--dark">
          {user.username} {answers()}
        </a>
      </div>
    );
  });

  const loginPrompt = () => {
    return (
      <Modal open={promptOpen} onClose={handlePromptClose}>
        <Fade in={promptOpen}>
          <AlertboxComponent
            close={handlePromptClose}
            message="You need to log in to perform this action"
          >
            <div style={{ textAlign: "center", paddingBottom: "20px" }}>
              <Button
                variant="contained"
                style={{ backgroundColor: "#3ABD98", color: "floralwhite" }}
                onClick={() => (window.location.href = "/signin")}
              >
                <b>Okay</b>
              </Button>
            </div>
          </AlertboxComponent>
        </Fade>
      </Modal>
    );
  };

  if (wait) {
    return <SearchResultSkeleton />;
  }

  return (
    <div className="searchResults" id="modalbackground">
      {loginPrompt()}
      <NavbarSearch search={search} />
      <div className="searchResult">
        <div className="searchResult__items searchResult__items--end">
          <a
            id="question"
            className="searchResult__link  bpLarge__none searchResult__link--active"
            style={{ marginLeft: "auto", cursor: "pointer" }}
            onClick={() => changeFilter("question")}
          >
            questions
          </a>
          <a
            id="answer"
            style={{ cursor: "pointer" }}
            className="searchResult__link  bpLarge__none"
            onClick={() => changeFilter("answer")}
          >
            answers
          </a>
          <a
            id="comment"
            style={{ cursor: "pointer" }}
            className="searchResult__link  bpLarge__none"
            onClick={() => changeFilter("comment")}
          >
            comments
          </a>
          <a
            id="user"
            style={{ cursor: "pointer" }}
            className="searchResult__link bpLarge__none"
            onClick={() => changeFilter("user")}
          >
            users
          </a>
        </div>

        <div className="resultCards">{results()}</div>
      </div>

      <div className="users">
        {/* 1 */}
        <div className="user">
          <h4 className="heading-4 weight-600 heading-4--dark">Top users</h4>
          {topUsers}
        </div>

        <div className="keyword">
          <h4 className="heading-4 weight-600 heading-4--dark">Top keywords</h4>
          <div className="keyword__list">{topKeywords}</div>
        </div>
      </div>
    </div>
  );
}

export default SearchResult;
