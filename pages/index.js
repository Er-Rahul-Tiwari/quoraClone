import React, { useState, useEffect } from "react";
import {
  Popover,
  Typography,
  makeStyles,
  Avatar,
  Modal,
  Fade,
  Button,
} from "@material-ui/core";
import AlertboxComponent from "../src/Components/alertboxComponent/alertboxComponent";
import NavbarSearch from "../src/Layouts/NavbarSearch";
import NavbarIcon from "../src/Layouts/NavbarIcon";
import axiosConfig from "../src/Utils/axiosConfig";
import { getProfile } from "../redux/ActionCreator";
import { connect } from "react-redux";
import HomeSkeleton from "../src/Skeletons/Home";
import { Skeleton } from "@material-ui/lab";
import { useRouter } from "next/router";
import styles from "../styles/Home.module.css";
import InfiniteScroll from "react-infinite-scroller";
import timeElapsed from "../src/Utils/timeElapsed";
import getPopularUsers from '../src/Utils/getPopularUsers';
import searchCategory from '../src/Utils/searchCategory';

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
    ["@media (max-width:62.5em)"]: {
      width: theme.spacing(3),
      height: theme.spacing(3),
    },
  },
}));

const mapStateToProps = (state) => {
  return {
    profileData: state.ProfileData,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getProfile: () => dispatch(getProfile),
});

function Home(props) {
  const router = useRouter();
  const active = "#4F4F4F";
  const inactive = "#E5E5E5";
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [activeKeyword, setActiveKeyword] = useState("");
  const [activeFilter, setActiveFilter] = useState("Popular");
  const [change, setChange] = useState();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const [popUsers, setPopUsers] = useState([]);
  const [popKeywords, setPopkeywords] = useState([]);
  const [feed, setFeed] = useState([]);
  const [currentFeed, setCurrentFeed] = useState("");
  const [skeleton, setSkeleton] = useState(true);
  const [feedSkeleton, setFeedSkeleton] = useState(false);
  const [browseCategories, setBrowseCategories] = useState(false);
  const [categories, setCategories] = useState();
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [promptOpen, setPromptOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState("");
  const [loadNext, setLoadNext] = useState({
    type: "",
    next: false,
    sort_by: "Popular",
  });
  const [hasMore, setHasMore] = useState(false);

  const handlePromptOpen = () => {
    setPromptOpen(true);
    document.getElementById("modalbackground").style.filter = "blur(3px)";
  };

  const handlePromptClose = () => {
    setPromptOpen(false);
    document.getElementById("modalbackground").style.filter = "none";
  };

  const getMyFeed = (type, offset) => {
    return new Promise((resolve, reject) => {
      const data = new FormData();
      if (type) {
        data.append("sort_by", type);
      } else {
        data.append("sort_by", "Popular");
      }
      let url = "/api/questions/my-Feed/?limit=4&offset=" + offset;
      axiosConfig
        .post(url, data)
        .then((response) => {
          if (response.status != 200) throw new Error();
          let links = response.data.links;
          let next = {
            type: "myfeed",
            next: links.next,
            sort_by: type || "Popular",
          };
          setLoadNext(next);
          if (links.next) {
            setHasMore(true);
          } else setHasMore(false);
          resolve(response.data.body);
          setCurrentFeed("feed");
          if (type) {
            document.getElementById(activeFilter).className = "home__link";
            setActiveFilter(type);
            document.getElementById(type).className =
              "home__link home__link--active";
          }
          return response.data.body;
        })
        .catch((error) => {
          if (error.response) {
            if (error.response.status == 401) {              
              setFeedSkeleton(false);
            }
          } 
          reject(error);
          return [];
        });
    });
  };

  const getPopularKeywords = (callback) => {
    axiosConfig
      .get("/api/questions/get-popular-keyword/?limit=12&offset=0")
      .then((response) => {
        if (response.status != 200) throw new Error();
        let popularKeywords = response.data.body;
        let keywords = popularKeywords.splice(0, 12);
        if (window.location.search) {
          let query = window.location.search;
          query = query.split("?")[1];
          query = query.split("=")[1];
          setActiveKeyword(query + "keyword");
        } else {
          setActiveKeyword(keywords[0].id + "keyword");
        }
        setPopkeywords(keywords);
        callback(keywords);
      })
      .catch((error) => {
        if (error.response) {
        } else {
          console.log(error);
        }
      });
  };

  const addBookmark = (id) => {
    return new Promise((resolve, reject) => {
      const data = new FormData();
      data.append("question_id", id);
      axiosConfig
        .post("/api/questions/add-bookmarks/", data)
        .then((response) => {
          if (response.status != 200) throw new Error();
          resolve(response.data.message);
        })
        .catch((error) => {
          if (error.response) {
            if (error.response.status == 401) {
              handlePromptOpen();
            }
          } else {
            console.log("Something went wrong");
          }
          reject(error);
        });
    });
  };

  const reaction = (id, reaction) => {
    return new Promise((resolve, reject) => {
      const data = new FormData();
      data.append("question_id", id);
      data.append("Reaction", reaction);
      axiosConfig
        .post("/api/questions/reaction-question/", data)
        .then((response) => {
          if (response.status != 200) throw new Error();
          resolve(response.data.message);
        })
        .catch((error) => {
          if (error.response) {
            if (error.response.status == 401) {
              handlePromptOpen();
            }
            if (error.response.status == 500) {
              handlePromptOpen(); //This is temporary since unauthorised user wont get a 500 only INS will.
            }
          } else {
            console.log(error);
          }
          reject(error);
        });
    });
  };

  const nullify = (id) => reaction(id, "");

  const submit = (id, option) => {
    return new Promise((resolve, reject) => {
      const data = new FormData();
      data.append("questionID", id);
      data.append("optionID", option);
      axiosConfig
        .post("/api/answers/submit-poll/", data)
        .then((response) => {
          if (response.status != 200) throw new Error();
          resolve(response.data.body);
        })
        .catch((error) => {
          if (error.response) {
            if (error.response.status == 401) {
              handlePromptOpen();
            }
          } else {
            console.log("Something went wrong");
          }
          reject(error);
        });
    });
  };

  const getQuestionByCategory = (type, category, offset) => {
    return new Promise((resolve, reject) => {
      const data = new FormData();
      data.append("category_id", category);
      if (type) {
        data.append("sort_by", type);
      } else {
        data.append("sort_by", "Popular");
      }
      let url = "/api/questions/category-question/?limit=2&offset=" + offset;
      axiosConfig
        .post(url, data)
        .then((response) => {
          if (response.status != 200) throw new Error();
          let links = response.data.links;
          let data = response.data.body;
          if (isAuthenticated) {
            let next = {
              type: "keyword",
              next: links.next,
              sort_by: type || "Popular",
              id: category,
            };
            if (links.next) {
              setHasMore(true);
            } else setHasMore(false);
            setLoadNext(next);
          } else {
            if (data.length > 2) {
              data.splice(2);
            }
          }
          resolve(data);
          setCurrentCategory(category);
          setCurrentFeed("category");
          if (type) {
            document.getElementById(activeFilter).className = "home__link";
            setActiveFilter(type);
            document.getElementById(type).className =
              "home__link home__link--active";
          }
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

  const getQuestionByKeyword = (type, keyword, offset) => {
    return new Promise((resolve, reject) => {
      const data = new FormData();
      data.append("keyword_id", keyword.toString());
      if (type) {
        data.append("sort_by", type);
      } else {
        data.append("sort_by", "Popular");
      }
      let url = "/api/questions/keyword-question/?limit=2&offset=" + offset;
      axiosConfig
        .post(url, data)
        .then((response) => {
          if (response.status != 200) throw new Error();
          let links = response.data.links;
          let data = response.data.body;
          if (isAuthenticated && links) {
            let next = {
              type: "keyword",
              next: links.next,
              sort_by: type || "Popular",
              id: keyword,
            };
            if (links.next) {
              setHasMore(true);
            } else setHasMore(false);
            setLoadNext(next);
          } else {
            if (data.length > 2) {
              data.splice(2);
            }
          }
          resolve(data);
          setCurrentFeed("keyword");
          if (type) {
            document.getElementById(activeFilter).className = "home__link";
            setActiveFilter(type);
            document.getElementById(type).className =
              "home__link home__link--active";
          }
        })
        .catch((error) => {
          if (error.response) {
            console.log(error.response);
          } else {
            console.log(error);
          }
          reject(error);
        });
    });
  };

  useEffect(() => {
    const getData = async () => {
      await props
        .getProfile()
        .then(async (resolve) => {
          setAuthenticated(true);
          if (resolve.body.myInterest.length === 0) {
            window.location.href = "/myprofile/update-interests";
          } else {
            if (window.location.search) {
              getPopularKeywords(async () => {
                let query = window.location.search;
                query = query.split("?")[1];
                query = query.split("=")[1];
                await getQuestionByKeyword("", query, 0)
                  .then((resolve) => {
                    setFeed(resolve);
                    setFeedSkeleton(false);
                  })
                  .catch((reject) => {});
              });
            } else {
              getPopularKeywords(async () => {
                setFeedSkeleton(true);
                await getMyFeed(0)
                  .then((resolve) => {
                    setFeed(resolve);
                    setFeedSkeleton(false);
                  })
                  .catch((reject) => {});
              });
            }
          }
        })
        .catch((reject) => {
          setAuthenticated(false);
          getPopularKeywords(async (keywords) => {
            setFeedSkeleton(true);
            await getQuestionByKeyword("", keywords[0].id, 0)
              .then((resolve) => {
                setFeed(resolve);
                setFeedSkeleton(false);
              })
              .catch((reject) => {});
          });
        });
      await getPopularUsers()
        .then((resolve) => {
          setPopUsers(resolve);
        })
        .catch((reject) => {
          console.log(reject);
        });
      fetchCategories();
      setSkeleton(false);
    };
    getData();
  }, []);

  const fetchCategories = () => {
    axiosConfig
      .get("/api/questions/get-categories/")
      .then((response) => {
        if (response.status != 200) throw new Error();
        setCategories(response.data.body);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
        } else {
          console.log("Something went wrong");
        }
      });
  };

  const categoryClicked = async (id) => {
    setFeedSkeleton(true);
    await getQuestionByCategory("", id, 0)
      .then((resolve) => {
        setFeed(resolve);
        setFeedSkeleton(false);
      })
      .catch((reject) => {});
    setTimeout(() => {
      setBrowseCategories(false);
    }, 500);
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
          onClick={() => {
            document.getElementById(cat.id).style.backgroundColor = "#4BB297";
            categoryClicked(cat.id);
          }}
        >
          <label className="category__grids__link" style={style}>
            {cat.name}
          </label>
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

  const Feed = feed.map((q) => {
    let index = feed.indexOf(q);
    if (q.question_type === "normal") {
      const aggVotes = q.upvote_count;
      const keywords = q.keywords.map((key) => (
        <label className="homeCard__link">{key.name}</label>
      ));
      const upvoteColor = q.reaction === "upvote" ? active : inactive;
      const downvoteColor = q.reaction === "downvote" ? active : inactive;
      const bookmarkColor = q.is_bookmarked === "True" ? active : inactive;
      let image = q.category.category_svg;
      if (image) {
        image = image.split("?")[0];
      }
      const topAnswer = () => {
        if (q.Answer.Answer) {
          return <p className=" homeCard__topAnswer">Top answer</p>;
        }
        return <div></div>;
      };
      const question_detail = "/question/" + q.id;
      const date = new Date(q.created_at);
      let elapsed = timeElapsed(date);

      return (
        <div className="homeCard" style={{ marginBottom: "20px" }}>
          <Avatar className={classes.avatarLarge} src={image} />
          <div className="homeCard__cart">
            <svg
              onClick={async () => {
                await addBookmark(q.id)
                  .then((resolve) => {
                    if (resolve === "Bookmark removed") {
                      feed[index].is_bookmarked = "False";
                      setFeed(feed);
                      if (change) setChange();
                      else setChange(1);
                    } else {
                      feed[index].is_bookmarked = "True";
                      setFeed(feed);
                      if (change) setChange();
                      else setChange(1);
                    }
                  })
                  .catch((reject) => {});
              }}
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
            <p
              className="para--size-10 para--dark"
              style={{ textTransform: "none" }}
            >
              {elapsed}
            </p>
          </div>
          {topAnswer()}
          <div className="homeCard__reply">{q.Answer.Answer}</div>
          <div className="homeCard__countReply">
            <svg
              onClick={async () => {
                await reaction(q.id, "upvote")
                  .then((resolve) => {
                    if (resolve === "upvote") {
                      feed[index].upvote_count = feed[index].upvote_count + 1;
                      if (feed[index].reaction === "downvote") {
                        feed[index].downvote_count =
                          feed[index].downvote_count - 1;
                      }
                      feed[index].reaction = "upvote";
                      setFeed(feed);
                      if (change) setChange();
                      else setChange(1);
                    } else if (resolve === "Already upvote") {
                      nullify(q.id);
                      feed[index].upvote_count = feed[index].upvote_count - 1;
                      feed[index].reaction = " ";
                      setFeed(feed);
                      if (change) setChange();
                      else setChange(1);
                    }
                  })
                  .catch((reject) => {});
              }}
              className="homeCard__upPolygon"
              viewBox="0 0 27 24"
              style={{ fill: upvoteColor }}
            >
              <path d="M12.7207 0.720705C13.1056 0.054038 14.0678 0.0540364 14.4527 0.720703L26.6374 21.8251C27.0223 22.4918 26.5412 23.3251 25.7714 23.3251H1.40206C0.632264 23.3251 0.151137 22.4918 0.536037 21.8251L12.7207 0.720705Z" />
            </svg>
            <p className="para--size-10">{aggVotes}</p>
            <svg
              onClick={async () => {
                await reaction(q.id, "downvote")
                  .then((resolve) => {
                    if (resolve === "downvote") {
                      feed[index].downvote_count =
                        feed[index].downvote_count + 1;
                      if (feed[index].reaction === "upvote") {
                        feed[index].upvote_count = feed[index].upvote_count - 1;
                      }
                      feed[index].reaction = "downvote";
                      setFeed(feed);
                      if (change) setChange();
                      else setChange(1);
                    } else if (resolve === "Already downvote") {
                      nullify(q.id);
                      feed[index].downvote_count =
                        feed[index].downvote_count - 1;
                      feed[index].reaction = " ";
                      setFeed(feed);
                      if (change) setChange();
                      else setChange(1);
                    }
                  })
                  .catch((reject) => {});
              }}
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
    const bookmarkColor = q.is_bookmarked === "True" ? active : inactive;
    const aggVotes = q.upvote_count;
    let image = q.category.category_svg;
    if (image) {
      image = image.split("?")[0];
    }
    const Options = q.Options.map((option) => {
      let percentStr = option.option_percentage + "%";
      let percent = option.option_percentage;
      if (percent === 0) {
        percent = 1;
        percentStr = "0%";
      }
      return (
        <div
          id={option.id + "option"}
          onClick={async() => {
            await submit(q.id, option.id)
            .then(resolve => {              
              feed[index].Options = resolve;
              setFeed(feed);
              if(change) setChange();
              else setChange(1);
            })
            .catch(reject => {

            })
          }}
          className="homeCard__progress"
          style={{ width: percent + "%", cursor: "pointer" }}
        >
          <p className="homeCard__progress--name">{option.option_name}</p>
          <p className="homeCard__progress--value">{percentStr}</p>
        </div>
      );
    });
    const keywords = q.keywords.map((key) => (
      <label className="homeCard__link">{key.name}</label>
    ));
    return (
      <div className="homeCard" style={{ marginBottom: "20px" }}>
        <Avatar className={classes.avatarLarge} src={image} />
        <div className="homeCard__cart">
          <svg
            onClick={async () => {
              await addBookmark(q.id)
                .then((resolve) => {
                  if (resolve === "Bookmark removed") {
                    feed[index].is_bookmarked = "False";
                    setFeed(feed);
                    if (change) setChange();
                    else setChange(1);
                  } else {
                    feed[index].is_bookmarked = "True";
                    setFeed(feed);
                    if (change) setChange();
                    else setChange(1);
                  }
                })
                .catch((reject) => {});
            }}
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
          <p className="para--size-10 para--dark">{q.created_at}</p>
        </div>
        <div className="homeCard__box">{Options}</div>
        <div className="homeCard__countReply">
          <svg
            id={q.id + "upvote"}
            onClick={async () => {
              await reaction(q.id, "upvote")
                .then((resolve) => {
                  if (resolve === "upvote") {
                    feed[index].upvote_count = feed[index].upvote_count + 1;
                    if (feed[index].reaction === "downvote") {
                      feed[index].downvote_count =
                        feed[index].downvote_count - 1;
                    }
                    feed[index].reaction = "upvote";
                    setFeed(feed);
                    if (change) setChange();
                    else setChange(1);
                  } else if (resolve === "Already upvote") {
                    nullify(q.id);
                    feed[index].upvote_count = feed[index].upvote_count - 1;
                    feed[index].reaction = " ";
                    setFeed(feed);
                    if (change) setChange();
                    else setChange(1);
                  }
                })
                .catch((reject) => {});
            }}
            className="homeCard__upPolygon"
            viewBox="0 0 27 24"
            style={{ fill: upvoteColor }}
          >
            <path d="M12.7207 0.720705C13.1056 0.054038 14.0678 0.0540364 14.4527 0.720703L26.6374 21.8251C27.0223 22.4918 26.5412 23.3251 25.7714 23.3251H1.40206C0.632264 23.3251 0.151137 22.4918 0.536037 21.8251L12.7207 0.720705Z" />
          </svg>
          <p className="para--size-10">{aggVotes}</p>
          <svg
            onClick={async () => {
              await reaction(q.id, "downvote")
                .then((resolve) => {
                  if (resolve === "downvote") {
                    feed[index].downvote_count = feed[index].downvote_count + 1;
                    if (feed[index].reaction === "upvote") {
                      feed[index].upvote_count = feed[index].upvote_count - 1;
                    }
                    feed[index].reaction = "downvote";
                    setFeed(feed);
                    if (change) setChange();
                    else setChange(1);
                  } else if (resolve === "Already downvote") {
                    nullify(q.id);
                    feed[index].downvote_count = feed[index].downvote_count - 1;
                    feed[index].reaction = " ";
                    setFeed(feed);
                    if (change) setChange();
                    else setChange(1);
                  }
                })
                .catch((reject) => {});
            }}
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

  const popularUsers = popUsers.map((user) => {
    const answers = () => {
      if (user.answers) {
        return "(" + user.answers + "Answers)";
      }
    };
    const image = user.profileURL ? user.profileURL.split("?")[0] : "";
    return (
      <div className="user__list">
        <Avatar
          className={classes.avatar}
          src={image}
          style={{ cursor: "pointer" }}
          onClick={() => (window.location.href = "/user/" + user.userID)}
        />
        <p
          className="para--size-12 para--dark"
          style={{ cursor: "pointer" }}
          onClick={() => (window.location.href = "/user/" + user.userID)}
        >
          {user.username} {answers()}
        </p>
      </div>
    );
  });

  const keywordClicked = async (id) => {
    document.getElementById(activeKeyword).className = "keyword__link";
    setActiveKeyword(id + "keyword");
    document.getElementById(id + "keyword").className =
      "keyword__link keyword__link--active";
    setFeedSkeleton(true);
    await getQuestionByKeyword("", id, 0)
      .then((resolve) => {
        setFeed(resolve);
        setFeedSkeleton(false);
      })
      .catch((reject) => {});
  };

  const popularKeywords = popKeywords.map((keyword) => {
    if (!window.location.search && popKeywords.indexOf(keyword) == 0) {
      return (
        <label
          id={keyword.id + "keyword"}
          style={{ cursor: "pointer" }}
          className="keyword__link keyword__link--active font"
          onClick={() => keywordClicked(keyword.id)}
        >
          {keyword.name}
        </label>
      );
    } else if (window.location.search) {
      let query = window.location.search;
      if (query) {
        query = query.split("?")[1];
        query = query.split("=")[1];
      }
      if (query == keyword.id) {
        return (
          <label
            id={keyword.id + "keyword"}
            style={{ cursor: "pointer" }}
            className="keyword__link keyword__link--active font"
            onClick={() => keywordClicked(keyword.id)}
          >
            {keyword.name}
          </label>
        );
      }
      return (
        <label
          id={keyword.id + "keyword"}
          style={{ cursor: "pointer" }}
          className="keyword__link font"
          onClick={() => keywordClicked(keyword.id)}
        >
          {keyword.name}
        </label>
      );
    }
    return (
      <label
        id={keyword.id + "keyword"}
        style={{ cursor: "pointer" }}
        className="keyword__link"
        onClick={() => keywordClicked(keyword.id)}
      >
        {keyword.name}
      </label>
    );
  });

  const homeLink = {
    cursor: "pointer",
  };

  const loginPrompt = () => {
    if (promptOpen) {
      return (
        <Modal open={promptOpen} onClose={handlePromptClose}>
          <Fade in={promptOpen}>
            <AlertboxComponent
              close={handlePromptClose}
              message="You need to login, to respond to the questions or view more questions"
            >
              <div style={{ textAlign: "center", paddingBottom: "20px" }}>
                <Button
                  variant="contained"
                  style={{ backgroundColor: "#3ABD98", color: "floralwhite" }}
                  onClick={() => router.push("/auth/signin")}
                >
                  <b>Login</b>
                </Button>
                <Button
                  style={{ marginLeft: "10px" }}
                  onClick={handlePromptClose}
                >
                  <b>Cancel</b>
                </Button>
              </div>
            </AlertboxComponent>
          </Fade>
        </Modal>
      );
    }
    return null;
  };

  const homeCards = () => {
    if (feedSkeleton) {
      return (
        <div className="homeCards"> 
          <div className="homeCard">
            <Skeleton
              variant="circle"
              width={50}
              height={50}
              className="homeCard__img"
            />
            <div className="homeCard__cart">
              <Skeleton height={20} className="homeCard__icon" />
            </div>
            <div className="homeCard__items">
              <Skeleton
                varaint="rect"
                height={40}
                className="homeCard__heading line-height-1 para--dark-3"
              />
              <Skeleton
                variant="text"
                width={20}
                className="para--size-10 para--dark"
              />
            </div>
            <Skeleton
              style={{ width: "60%" }}
              className=" homeCard__topAnswer"
            />
            <Skeleton variant="rect" height={40} className="homeCard__reply" />
            <div className="homeCard__countReply">
              <Skeleton height={20} className="homeCard__upPolygon" />
              <Skeleton height={10} width={5} className="homeCard__views" />
              <Skeleton height={20} className="homeCard__upPolygon" />
            </div>
            <div className="homeCard__links">
              <Skeleton width={30} className="homeCard__link" />
              <Skeleton width={30} className="homeCard__link" />
              <Skeleton width={30} className="homeCard__link" />
            </div>
            <Skeleton
              style={{ width: "20%" }}
              className="btn__small btn--black homeCard__btn"
            />
          </div>
          <div className="homeCard">
            <Skeleton
              variant="circle"
              width={50}
              height={50}
              className="homeCard__img"
            />
            <div className="homeCard__cart">
              <Skeleton height={20} className="homeCard__icon" />
            </div>
            <div className="homeCard__items">
              <Skeleton
                varaint="rect"
                height={40}
                className="homeCard__heading line-height-1 para--dark-3"
              />

              <Skeleton
                variant="text"
                width={20}
                className="para--size-10 para--dark"
              />
            </div>
            <Skeleton
              style={{ width: "60%" }}
              className=" homeCard__topAnswer"
            />
            <Skeleton variant="rect" height={40} className="homeCard__reply" />
            <div className="homeCard__countReply">
              <Skeleton height={20} className="homeCard__upPolygon" />
              <Skeleton height={10} width={5} className="homeCard__views" />
              <Skeleton height={20} className="homeCard__upPolygon" />
            </div>
            <div className="homeCard__links">
              <Skeleton width={30} className="homeCard__link" />
              <Skeleton width={30} className="homeCard__link" />
              <Skeleton width={30} className="homeCard__link" />
            </div>
            <Skeleton
              style={{ width: "20%" }}
              className="btn__small btn--black homeCard__btn"
            />
          </div>
        </div>
      );
    }
    return (
      <div className="homeCards">
        <div className="itWork" id="tourcard">
          <p className="itWork__heading font"> How does it work? </p>
          <p className="itWork__message">
            Discover questions and topics that interest you. Learn how to use
            the platform.
          </p>
          <div className="itWork__cross">
            <svg
              className="itWork__icon"
              viewBox="0 0 24 24"
              fill="none"
              onClick={() =>
                (document.getElementById("tourcard").style.display = "none")
              }
            >
              <path
                d="M18 6L6 18"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M6 6L18 18"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <a className="btn__small btn--green itWork__btn font">Take a tour!</a>
        </div>
        <InfiniteScroll
          pageStart={0}
          loadMore={async () => {
            if (loadNext.next) {
              if (loadNext.type === "myfeed") {
                let offset = loadNext.next.split("?")[1];
                offset = offset.split("&")[1];
                offset = offset.split("=")[1];
                await getMyFeed(loadNext.sort_by, offset)
                  .then((resolve) => {
                    let array = feed.concat(resolve);
                    setFeed(array);
                  })
                  .catch((reject) => {});
              } else if (loadNext.type === "category") {
                let offset = loadNext.next.split("?")[1];
                offset = offset.split("&")[1];
                offset = offset.split("=")[1];
                await getQuestionByCategory(
                  loadNext.sort_by,
                  loadNext.id,
                  offset
                )
                  .then((resolve) => {
                    let array = feed.concat(resolve);
                    setFeed(array);
                  })
                  .catch((reject) => {});
              } else if (loadNext.type === "keyword") {
                let offset = loadNext.next.split("?")[1];
                offset = offset.split("&")[1];
                offset = offset.split("=")[1];
                await getQuestionByKeyword(
                  loadNext.sort_by,
                  loadNext.id,
                  offset
                )
                  .then((resolve) => {
                    let array = feed.concat(resolve);
                    setFeed(array);
                  })
                  .catch((reject) => {});
              }
            }
          }}
          hasMore={hasMore}
          loader={
            <div className="homeCard">
              <Skeleton
                variant="circle"
                width={50}
                height={50}
                className="homeCard__img"
              />
              <div className="homeCard__cart">
                <Skeleton height={20} className="homeCard__icon" />
              </div>
              <div className="homeCard__items">
                <Skeleton
                  varaint="rect"
                  height={40}
                  className="homeCard__heading line-height-1 para--dark-3"
                />

                <Skeleton
                  variant="text"
                  width={20}
                  className="para--size-10 para--dark"
                />
              </div>
              <Skeleton
                style={{ width: "60%" }}
                className=" homeCard__topAnswer"
              />
              <Skeleton
                variant="rect"
                height={40}
                className="homeCard__reply"
              />
              <div className="homeCard__countReply">
                <Skeleton height={20} className="homeCard__upPolygon" />
                <Skeleton height={10} width={5} className="homeCard__views" />
                <Skeleton height={20} className="homeCard__upPolygon" />
              </div>
              <div className="homeCard__links">
                <Skeleton width={30} className="homeCard__link" />
                <Skeleton width={30} className="homeCard__link" />
                <Skeleton width={30} className="homeCard__link" />
              </div>
              <Skeleton
                style={{ width: "20%" }}
                className="btn__small btn--black homeCard__btn"
              />
            </div>
          }
        >
          {Feed}
        </InfiniteScroll>
      </div>
    );
  };

  if (skeleton) {
    return <HomeSkeleton />;
  }

  if (browseCategories) {
    return (
      <div className="categories" id="modalbackground">
        <NavbarIcon />
        <div className="arrNavs">
          <div className="">
            <svg
              className="arrNav__icon"
              viewBox="0 0 25 13"
              fill="none"
              style={{ cursor: "pointer" }}
              onClick={() => setBrowseCategories(false)}
            >
              <path d="M23.9277 6.71484H1.39802" />
              <path d="M6.16601 11.8755L1.04245 6.82883L6.16601 1.34288" />
            </svg>
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
      </div>
    );
  }

  let browseMyfeed = () => null;
  if (isAuthenticated) {
    browseMyfeed = () => {
      return (
        <Typography
          className={classes.typography}
          onClick={async () => {
            await getMyFeed(0)
              .then((resolve) => {
                setFeed(resolve);
              })
              .catch((reject) => {});
            handleClose();
          }}
        >
          <label className="font" style={{ cursor: "pointer" }}>
            Browse my feed
          </label>
        </Typography>
      );
    };
  }

  window.onscroll = function (ev) {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight &&
      isAuthenticated == false
    ) {
      handlePromptOpen();
    }
  };

  return (
    <div className="homes" id="modalbackground">
      <NavbarSearch />
      {loginPrompt()}
      <div className="home">
        <div className="home__items">
          <label
            id="Popular"
            className="home__link home__link--active"
            style={{ cursor: "pointer", marginLeft: "auto" }}
            onClick={async () => {
              if (currentFeed === "feed") {
                await getMyFeed("Popular", 0)
                  .then((resolve) => {
                    setFeed(resolve);
                  })
                  .catch((reject) => {});
              } else if (currentFeed === "keyword") {
                setFeedSkeleton(true);
                await getQuestionByKeyword(
                  "Popular",
                  activeKeyword.split("keyword")[0],
                  0
                )
                  .then((resolve) => {
                    setFeed(resolve);
                    setFeedSkeleton(false);
                  })
                  .catch((reject) => {});
              } else if (currentFeed === "category") {
                setFeedSkeleton(true);
                await getQuestionByCategory("Popular", currentCategory, 0)
                  .then((resolve) => {
                    setFeed(resolve);
                    setFeedSkeleton(false);
                  })
                  .catch((reject) => {});
              }
            }}
          >
            Popular
          </label>
          <label
            id="new"
            className="home__link"
            style={homeLink}
            onClick={async () => {
              if (currentFeed === "feed") {
                await getMyFeed("new", 0)
                  .then((resolve) => {
                    setFeed(resolve);
                  })
                  .catch((reject) => {});
              } else if (currentFeed === "keyword") {
                setFeedSkeleton(true);
                await getQuestionByKeyword(
                  "new",
                  activeKeyword.split("keyword")[0],
                  0
                )
                  .then((resolve) => {
                    setFeed(resolve);
                    setFeedSkeleton(false);
                  })
                  .catch((reject) => {});
              } else if (currentFeed === "category") {
                setFeedSkeleton(true);
                await getQuestionByCategory("new", currentCategory, 0)
                  .then((resolve) => {
                    setFeed(resolve);
                    setFeedSkeleton(false);
                  })
                  .catch((reject) => {});
              }
            }}
          >
            New
          </label>
          <label
            id="Rising"
            className="home__link"
            style={homeLink}
            onClick={async () => {
              if (currentFeed === "feed") {
                await getMyFeed("Rising", 0)
                  .then((resolve) => {
                    setFeed(resolve);
                  })
                  .catch((reject) => {});
              } else if (currentFeed === "keyword") {
                setFeedSkeleton(true);
                await getQuestionByKeyword(
                  "Rising",
                  activeKeyword.split("keyword")[0],
                  0
                )
                  .then((resolve) => {
                    setFeed(resolve);
                    setFeedSkeleton(false);
                  })
                  .catch((reject) => {});
              } else if (currentFeed === "category") {
                setFeedSkeleton(true);
                await getQuestionByCategory("Rising", currentCategory, 0)
                  .then((resolve) => {
                    setFeed(resolve);
                    setFeedSkeleton(false);
                  })
                  .catch((reject) => {});
              }
            }}
          >
            Rising
          </label>
          <label
            id="Unanswered"
            className="home__link"
            style={homeLink}
            onClick={async () => {
              if (currentFeed === "feed") {
                await getMyFeed("Unanswered", 0)
                  .then((resolve) => {
                    setFeed(resolve);
                  })
                  .catch((reject) => {});
              } else if (currentFeed === "keyword") {
                setFeedSkeleton(true);
                await getQuestionByKeyword(
                  "Unanswered",
                  activeKeyword.split("keyword")[0],
                  0
                )
                  .then((resolve) => {
                    setFeed(resolve);
                    setFeedSkeleton(false);
                  })
                  .catch((reject) => {});
              } else if (currentFeed === "category") {
                setFeedSkeleton(true);
                await getQuestionByCategory("Unanswered", currentCategory, 0)
                  .then((resolve) => {
                    setFeed(resolve);
                    setFeedSkeleton(false);
                  })
                  .catch((reject) => {});
              }
            }}
          >
            Unanswered
          </label>

          <svg
            className="home__icon"
            viewBox="0 0 24 24"
            fill="none"
            style={{ cursor: "pointer" }}
            aria-describedby={id}
            onClick={handleClick}
          >
            <path d="M18.7778 1H1L8.11111 9.40889V15.2222L11.6667 17V9.40889L18.7778 1Z" />
          </svg>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
          >
            {browseMyfeed()}
            <Typography
              className={classes.typography}
              onClick={() => {
                fetchCategories();
                setBrowseCategories(true);
                handleClose();
              }}
            >
              <label className="font" style={{ cursor: "pointer" }}>
                Browse by category
              </label>
            </Typography>
            <Typography
              className={classes.typography}
              onClick={async () => {
                setFeedSkeleton(true);
                await getQuestionByKeyword(
                  "",
                  activeKeyword.split("keyword")[0],
                  0
                )
                  .then((resolve) => {
                    setFeed(resolve);
                    setFeedSkeleton(false);
                  })
                  .catch((reject) => {});
                handleClose();
              }}
            >
              <label className="font" style={{ cursor: "pointer" }}>
                Browse by keyword
              </label>
            </Typography>
          </Popover>
        </div>

        {homeCards()}
      </div>

      <div className="users">
        <div className="user">
          <label className={styles.font}>Top users</label>
          {popularUsers}
        </div>

        <div className="keyword">
          <label className={styles.font}>Top keywords</label>
          <div className="keyword__list">{popularKeywords}</div>
        </div>
      </div>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
