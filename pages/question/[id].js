import React, { useEffect, useState } from "react";
import {
  Avatar,
  makeStyles,
  Popover,
  Modal,
  Typography,
  Fade,
  Button,
} from "@material-ui/core";
import Head from "next/head";
import NavbarSearch from "../../src/Layouts/NavbarSearch";
import axiosConfig from "../../src/Utils/axiosConfig";
import AnswerSkeleton from "../../src/Skeletons/Answer";
import { getProfile } from "../../redux/ActionCreator";
import { connect } from "react-redux";
import AlertboxComponent from "../../src/Components/alertboxComponent/alertboxComponent";
import styles from "../../styles/Home.module.css";
import { checkCookie } from "../../redux/localstorage";
import timeElapsed from "../../src/Utils/timeElapsed";

const useStyles = makeStyles((theme) => ({
  avatar: {
    height: theme.spacing(8),
    width: theme.spacing(8),
    marginLeft: "auto",
    marginRight: "auto",
    ['@media (max-width:62.5em)']:{
      width: theme.spacing(3),
      height: theme.spacing(3)
    } 
  },
  typography: {
    padding: theme.spacing(2),
    fontSize: "13px",
    cursor: "pointer",
  },
}));

const mapStateToProps = (state) => {
  return {
    profileData: state.ProfileData,
    pageData: state.PageData,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getProfile: () => dispatch(getProfile),
});

function Answer(props) {
  const active = "#4F4F4F";
  const inactive = "#E5E5E5";
  const [answers, setAnswers] = useState([]);
  const [change, setChange] = useState();
  const [question_data, setQuestionData] = useState();
  const [userdata, setUserdata] = useState();
  const classes = useStyles();
  const [writeAnswerOpen, setWriteAnswerOpen] = useState(false);
  const [wait, setWait] = useState(true);
  const [success_failure_open, setSuccessFailureOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [nextAnswers, setNextAnswers] = useState();
  const [promptOpen, setPromptOpen] = useState(false);
  const [images, setImages] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [activePopover, setActivePopover] = useState(null);
  const [anchorUser, setAnchorUser] = useState(null);
  const [activeHover, setActiveHover] = useState(null);

  const handleClick = (event, id) => {
    setAnchorEl(event.currentTarget);
    setActivePopover(id);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setActivePopover(null);
  };

  const handleHover = (event, id) => {
    setAnchorUser(event.currentTarget);
    setActiveHover(id);
  };

  const handleHoverClose = () => {
    setAnchorUser(null);
    setActiveHover(null);
  };

  const handleSuccessFailureOpen = () => {
    setSuccessFailureOpen(true);
    document.getElementById("modalbackground").style.filter = "blur(5px)";
  };

  const handleSuccessFailureClose = () => {
    setSuccessFailureOpen(false);
    document.getElementById("modalbackground").style.filter = "none";
  };

  const handlePromptOpen = () => {
    setPromptOpen(true);
    document.getElementById("modalbackground").style.filter = "blur(3px)";
  };

  const handlePromptClose = () => {
    setPromptOpen(false);
    document.getElementById("modalbackground").style.filter = "none";
  };

  useEffect(async () => {
    if (wait) {
      await props
        .getProfile()
        .then((resolve) => {
          setUserdata(resolve.body);
        })
        .catch((error) => {});
      if (props.question_data) {
        setQuestionData(props.question_data);
        await getAnswers(props.question_data.id, 0)
          .then((resolve) => {
            if (checkCookie("secret")) {
              setNextAnswers(resolve.links.next);
            }
            setAnswers(resolve.body);
          })
          .catch((reject) => {
            console.log(reject);
          });
        setWait(false);
      } else {
        //handle 404 not found
        setMessage("404 question not found");
        handleSuccessFailureOpen();
        setTimeout(() => {
          window.location.href = "/";
        }, 1000);
        setWait(false);
      }
    }
  }, []);

  const success_failure = () => {
    return (
      <Modal open={success_failure_open} onClose={handleSuccessFailureClose}>
        <AlertboxComponent
          close={handleSuccessFailureClose}
          message={message}
        />
      </Modal>
    );
  };

  const getAnswers = (id, offset) => {
    return new Promise((resolve, reject) => {
      const data = new FormData();
      data.append("QuestionID", id);
      axiosConfig
        .post("/api/answers/get-answers/?limit=2&offset=" + offset, data)
        .then((response) => {
          if (response.status != 200) throw new Error();
          resolve(response.data);
        })
        .catch((error) => {
          if (error.response.status == 401) {
            setMessage("Unauthorized");
          } else if (error.response.status == 400) {
            console.log(props.question_data);
          } else {
            setMessage("Something went wrong");
          }
          reject(true);
          handleSuccessFailureOpen();
        });
    });
  };

  const getReplies = (id, offset) => {
    return new Promise((resolve, reject) => {
      const data = new FormData();
      data.append("answerID", id);
      axiosConfig
        .post("/api/answers/get-replies/?limit=5&offset=" + offset, data)
        .then((response) => {
          if (response.status != 200) throw new Error();
          resolve(response.data.body);
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

  const addBookmark = (id) => {
    const data = new FormData();
    data.append("question_id", id);
    axiosConfig
      .post("/api/questions/add-bookmarks/", data)
      .then((response) => {
        if (response.status != 200) throw new Error();
        if (response.data.message === "Bookmark removed") {
          document.getElementById("bookmark").style.fill = inactive;
        } else {
          document.getElementById("bookmark").style.fill = active;
        }
      })
      .catch((error) => {
        if (error.response) {
          setMessage("Unauthorized");
        } else {
          setMessage("Something went wrong");
        }
        handleSuccessFailureOpen();
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
          if (response.data.message === "upvote") {
            document.getElementById("upvote").style.fill = active;
            document.getElementById("downvote").style.fill = inactive;
            question_data.upvote_count = question_data.upvote_count + 1;
            resolve(response.data);
          } else if (response.data.message === "Already upvote") {
            nullify(id);
            document.getElementById("upvote").style.fill = inactive;
            question_data.upvote_count = question_data.upvote_count - 1;
            resolve(response.data);
          } else if (response.data.message === "downvote") {
            document.getElementById("downvote").style.fill = active;
            document.getElementById("upvote").style.fill = inactive;
            question_data.downvote_count = question_data.downvote_count + 1;
            resolve(response.data);
          } else if (response.data.message === "Already downvote") {
            nullify(id);
            document.getElementById("downvote").style.fill = inactive;
            question_data.downvote_count = question_data.downvote_count - 1;
            resolve(response.data);
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

  const nullify = (id) => reaction(id, "");

  const reactAnswer = (id, type, reaction) => {
    return new Promise((resolve, reject) => {
      const data = new FormData();
      data.append("Flag", "spammed");
      data.append("type", type);
      data.append("id", id);
      data.append("reaction", reaction);
      axiosConfig
        .post("/api/answers/react-answers/", data)
        .then((response) => {
          if (response.status != 200) throw new Error();
          resolve(response.data);
        })
        .catch((error) => {
          if (error.response) {
            reject(error.response);
          }
        });
    });
  };

  const removeReaction = (id, type, reaction) =>
    reactAnswer(id, type, reaction);

  const downloadAnswer = () => {
    return new Promise((resolve, reject) => {
      const data = new FormData();
      data.append("QuestionID", question_data.id);
      axiosConfig
        .post("/api/questions/get-download-book/", data)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  const editResponse = (id, index, ans) => {
    let image = userdata.profileURL;
    if (image) {
      image = image.split("?")[0];
    }
    const responseChange = (e) => {
      let words = e.target.value.split(" ").length;
      if (e.target.value === "") words = 0;
      document.getElementById(id + "words").innerHTML = words;
    };

    return (
      <div
        className="card card__answerGap"
        style={{ backgroundColor: "#E8FAF5", borderRadius: "0px 0px 6px 6px" }}
      >
        <div className="card__dots">
          <svg width="4" height="13" viewBox="0 0 4 13" fill="none">
            <circle cx="1.93993" cy="1.95531" r="1.46703" fill="#312E2E" />
            <circle cx="1.93993" cy="6.69213" r="1.46703" fill="#312E2E" />
            <circle cx="1.93993" cy="11.4294" r="1.46703" fill="#312E2E" />
          </svg>
        </div>

        <div className="card__avtar-container">
          <Avatar className="card__avtar-img" src={image} />
          <p className="card__avtar-Name">{userdata.user.username}</p>
        </div>
        <textarea
          rows="5"
          className="card__answer card__messageReply para--size-16 font"
          type="text"
          placeholder="My comment..."
          style={{ resize: "none" }}
          onChange={responseChange}
          id={id + "textarea"}
        ></textarea>
        <div className="card__ansReply">
          <div className="card__views" style={{ cursor: "pointer" }}>
            <a
              className="card__repBtn"
              onClick={async () => {
                await writeResponse(
                  "reply",
                  id,
                  document.getElementById(id + "textarea").value
                )
                  .then((resolve) => {
                    let data = resolve.data.body;
                    if (answers[index].replies) {
                      let length = answers[index].replies.length;
                      answers[index].replies.splice(length, 0, data);
                    } else {
                      let replies = [data];
                      answers[index].replies = replies;
                    }
                    answers[index].replies_count =
                      answers[index].replies_count + 1;
                    answers[index].showReplies = true;
                    replyToAnswerClicked(index, ans);
                    if (change) setChange();
                    else setChange(1);
                    setMessage("Your reply has been added");
                    handleSuccessFailureOpen();
                  })
                  .catch((reject) => {
                    console.log(reject);
                  });
              }}
            >
              Reply
            </a>
          </div>
          <div className="card__vote">
            <div className="card__voteBox">
              <p className="para para--size-16" id={id + "words"}>
                0
              </p>
              <p className="para para--size-16">words</p>
            </div>
            <div className="card__voteBox">
              <svg width="15" height="17" viewBox="0 0 16 18" fill="none">
                <path
                  d="M11.039 5.85193L10.3249 5.13776L4.46919 10.9933C3.74194 11.7205 3.74194 12.9039 4.46919 13.6312C5.19643 14.3585 6.37979 14.3585 7.10708 13.6312L14.9713 5.76673C15.5125 5.22552 15.8106 4.50597 15.8106 3.74061C15.8106 2.97524 15.5125 2.2557 14.9713 1.71449C14.4301 1.17331 13.7105 0.875244 12.9452 0.875244C12.1798 0.875244 11.4602 1.17331 10.9191 1.71452L1.35732 11.2763C0.627187 12.0064 0.225098 12.9771 0.225098 14.0096C0.225098 15.0422 0.627187 16.0129 1.35732 16.743C2.08746 17.4732 3.05819 17.8752 4.0907 17.8752C5.12322 17.8752 6.09395 17.4732 6.82408 16.743L14.3771 9.18997L13.663 8.47584L6.10995 16.0289C5.57057 16.5683 4.85348 16.8653 4.0907 16.8653C3.32793 16.8653 2.61084 16.5682 2.07146 16.0289C1.53207 15.4895 1.23507 14.7724 1.23507 14.0096C1.23507 13.2469 1.53214 12.5297 2.07146 11.9904L11.6332 2.42865C12.3567 1.70526 13.5338 1.70526 14.2572 2.42865C14.9806 3.15208 14.9806 4.3292 14.2572 5.05263L6.39298 12.917C6.05948 13.2505 5.51684 13.2505 5.18335 12.917C4.84986 12.5835 4.84986 12.0409 5.18335 11.7074L11.039 5.85193Z"
                  fill="#777"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const keywords = () => {
    if (question_data) {
      return question_data.keywords.map((key) => {
        return <a className="answerNav__link">{key.name}</a>;
      });
    }
  };

  const replyToAnswerClicked = (index, ans) => {
    if (ans.addReply) {
      ans.addReply = false;
      let newAnswer = ans;
      answers.splice(index, 1, newAnswer);
    } else {
      ans.addReply = true;
      let newAnswer = ans;
      answers.splice(index, 1, newAnswer);
    }
    if (change) setChange();
    else setChange(1);
  };

  const viewRepliesClicked = async (index, ans) => {
    if (ans.showReplies) {
      ans.showReplies = false;
      let newAnswer = ans;
      answers.splice(index, 1, newAnswer);
    } else {
      ans.showReplies = true;
      if (!ans.replies) {
        ans.replies = await getReplies(ans.answer_id, 0)
          .then((resolve) => {
            return resolve;
          })
          .catch((reject) => {
            return null;
          });
      }
      let newAnswer = ans;
      answers.splice(index, 1, newAnswer);
    }
    if (change) setChange();
    else setChange(1);
  };

  const writeResponse = (type, id, response) => {
    if (response) {
      return new Promise((resolve, reject) => {
        const data = new FormData();
        if (type === "reply") {
          data.append("answerID", id);
          data.append("content", response);
          axiosConfig
            .post("/api/answers/write-reply/", data)
            .then((response) => {
              resolve(response);
            })
            .catch((error) => {
              reject(error);
            });
        } else {
          data.append("questionID", id);
          data.append("content", response);
          data.append("blockReplies", false);
          axiosConfig
            .post("/api/answers/write-answer/", data)
            .then((response) => {
              question_data.answer_count = question_data.answer_count + 1;
              if (change) setChange();
              else setChange(1);
              resolve(response);
            })
            .catch((error) => {});
        }
      });
    }
  };

  const deleteResponse = (type, id) => {
    return new Promise((resolve, reject) => {
      if (type === "answer") {
        const data = new FormData();
        data.append("answerID", id);
        axiosConfig
          .delete("/api/answers/delete-answer/", { data: data })
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      } else {
        const data = new FormData();
        data.append("replyID", id);
        axiosConfig
          .delete("/api/answers/delete-replies/", { data: data })
          .then((response) => {
            question_data.answer_count = question_data.answer_count + 1;
            if (change) setChange();
            else setChange(1);
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      }
    });
  };

  const flagAnswer = (type, id) => {
    return new Promise((resolve, reject) => {
      const data = new FormData();
      data.append("Flag", "spammed");
      data.append("type", type);
      data.append("Id", id);
      axiosConfig
        .post("/api/answers/flag-answer/", data)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  const answerCard = () => {
    if (answers && answers.length != 0) {
      return answers.map((ans) => {
        let index = answers.indexOf(ans);
        if (ans.content === "Deleted Answer") {
          return null;
        }
        let image = "";
        if (ans.userprofile) {
          image = ans.userprofile;
        }
        let display = "initial";
        if (ans.replies_count === 0) {
          display = "none";
        }
        let replies = () => null;
        if (ans.replies) {
          if (ans.showReplies) {
            replies = () => {
              return replyCard(ans.replies, index);
            };
          }
        }
        let addReply = () => null;
        if (ans.addReply) {
          addReply = () => editResponse(ans.answer_id, index, ans);
        }
        let hoverOpen = false;
        if (activeHover === ans.answer_id + "answer") {
          hoverOpen = true;
        }
        const hoverId = hoverOpen ? ans.answer_id + "answer" : undefined;
        let open = false;
        if (activePopover === ans.answer_id + "answer") {
          open = true;
        }
        const id = open ? ans.answer_id + "answer" : undefined;
        let deleteOption = () => null;
        if (userdata) {
          if (ans.user_id === userdata.userID) {
            deleteOption = () => {
              return (
                <Typography
                  className={classes.typography}
                  onClick={async () => {
                    await deleteResponse("answer", ans.answer_id)
                      .then((resolve) => {
                        setMessage("Your answer has been removed");
                        answers.splice(index, 1);
                        question_data.answer_count =
                          question_data.answer_count - 1;
                        setQuestionData(question_data);
                        setAnswers(answers);
                        handleClose();
                        if (change) setChange();
                        else setChange(1);
                        handleSuccessFailureOpen();
                      })
                      .catch((reject) => {});
                  }}
                >
                  <label className="font">Delete</label>
                </Typography>
              );
            };
          }
        }
        return (
          <>
            <div
              className="card card__answerGap"
            >
              <div className="card__dots">
                <svg
                  width="4"
                  height="13"
                  viewBox="0 0 4 13"
                  fill="none"
                  style={{ cursor: "pointer" }}
                  aria-describedby={id}
                  onClick={(e) => handleClick(e, ans.answer_id + "answer")}
                >
                  <circle
                    cx="1.93993"
                    cy="1.95531"
                    r="1.46703"
                    fill="#312E2E"
                  />
                  <circle
                    cx="1.93993"
                    cy="6.69213"
                    r="1.46703"
                    fill="#312E2E"
                  />
                  <circle
                    cx="1.93993"
                    cy="11.4294"
                    r="1.46703"
                    fill="#312E2E"
                  />
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
                  {deleteOption()}
                  <Typography
                    className={classes.typography}
                    onClick={async () => {
                      if (userdata) {
                        await flagAnswer("Answer", ans.answer_id)
                          .then((resolve) => {
                            handleClose();
                            setMessage("Answer reported");
                            handleSuccessFailureOpen();
                          })
                          .catch((reject) => {});
                      } else {
                        handlePromptOpen();
                        handleClose();
                      }
                    }}
                  >
                    <label className="font" style={{ cursor: "pointer" }}>
                      Report
                    </label>
                  </Typography>
                </Popover>
              </div>
              <div
                className="card__avtar--box"
                style={{ cursor: "pointer" }}
                onMouseOut={(e) => {
                  handleHoverClose()
                  console.log("yes");
                }}
                onMouseOver={(e) => handleHover(e, ans.answer_id + "answer")}
              >
                <div className="card__avtar-container" style={{ cursor: "pointer" }}>
                  <Avatar className="card__avtar-img" src={image} />{" "}
                  <Popover
                    id={hoverId}
                    open={hoverOpen}
                    anchorEl={anchorUser}    
                    close={handleHoverClose}                
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    transformOrigin={{
                      vertical: "bottom",
                      horizontal: "center",
                    }}
                  >
                    User details
                  </Popover>
                </div>
                <p className="card__avtar-Name ">
                  {ans.username}
                </p>
              </div>
              <p className="card__answer para--size-16">{ans.content}</p>

              <div className="card__ansReply">
                <div className="card__views">
                  <a
                    className="card__repBtn"
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      if (userdata) {
                        replyToAnswerClicked(index, ans);
                      } else {
                        handlePromptOpen();
                      }
                    }}
                  >
                    Reply
                  </a>
                  <p
                    id={ans.answer_id + "viewmore"}
                    style={{ cursor: "pointer", display: display }}
                    onClick={() => viewRepliesClicked(index, ans)}
                  >
                    view {ans.replies_count} replies
                  </p>
                </div>
                <div className="card__vote">
                  <svg className='bp__small--none' width="17" height="15" viewBox="0 0 17 15">
                    <path
                      d="M16.4148 7.49492L9.59312 0V4.4716H8.14277C3.64559 4.4716 0 8.12433 0 12.6303V15L0.644208 14.2927C2.83444 11.8882 5.9335 10.5182 9.1826 10.5182H9.59312V14.9898L16.4148 7.49492Z"
                      fill="#777"
                    />
                  </svg>
                  <div className="card__voteBox">
                    <svg width="17" height="14" viewBox="0 0 27 24">
                      <path
                        d="M12.7207 0.720705C13.1056 0.054038 14.0678 0.0540364 14.4527 0.720703L26.6374 21.8251C27.0223 22.4918 26.5412 23.3251 25.7714 23.3251H1.40206C0.632264 23.3251 0.151137 22.4918 0.536037 21.8251L12.7207 0.720705Z"
                        fill="#777"
                        id={ans.answer_id + "like"}
                        style={{ cursor: "pointer" }}
                        onClick={async () => {
                          if (userdata) {
                            if (answers[index].my_reaction === "like") {
                              removeReaction(ans.answer_id, "answer", "");
                              answers[index].like_count =
                                answers[index].like_count - 1;
                              answers[index].my_reaction = null;
                              setAnswers(answers);
                              if (change) setChange();
                              else setChange(1);
                            } else {
                              await reactAnswer(ans.answer_id, "answer", "like")
                                .then((resolve) => {
                                  answers[index].like_count =
                                    answers[index].like_count + 1;
                                  if (
                                    answers[index].my_reaction === "dislike"
                                  ) {
                                    answers[index].dislike_count =
                                      answers[index].dislike_count - 1;
                                  }
                                  answers[index].my_reaction = "like";
                                  setAnswers(answers);
                                  if (change) setChange();
                                  else setChange(1);
                                })
                                .catch((reject) => {});
                            }
                          } else {
                            handlePromptOpen();
                          }
                        }}
                      />
                    </svg>
                    <p className="card__downNum">{ans.like_count}</p>
                  </div>
                  <div className="card__voteBox">
                    <svg
                      id={ans.answer_id + "dislike"}
                      width="18"
                      height="14"
                      viewBox="0 0 28 24"
                      fill="none"
                      id={ans.answer_id + "dislike"}
                      style={{ cursor: "pointer" }}
                      onClick={async () => {
                        if (userdata) {
                          if (answers[index].my_reaction === "dislike") {
                            removeReaction(ans.answer_id, "answer", "");
                            answers[index].dislike_count =
                              answers[index].dislike_count - 1;
                            answers[index].my_reaction = null;
                            setAnswers(answers);
                            if (change) setChange();
                            else setChange(1);
                          } else {
                            await reactAnswer(
                              ans.answer_id,
                              "answer",
                              "dislike"
                            )
                              .then((resolve) => {
                                answers[index].dislike_count =
                                  answers[index].dislike_count + 1;
                                if (answers[index].my_reaction === "like") {
                                  answers[index].like_count =
                                    answers[index].like_count - 1;
                                }
                                answers[index].my_reaction = "dislike";
                                setAnswers(answers);
                                if (change) setChange();
                                else setChange(1);
                              })
                              .catch((reject) => {});
                          }
                        } else {
                          handlePromptOpen();
                        }
                      }}
                    >
                      <path
                        d="M13.2036 22.6396C13.5885 23.3063 14.5507 23.3063 14.9356 22.6396L27.1203 1.53522C27.5052 0.868547 27.0241 0.0352135 26.2543 0.0352135H1.88497C1.11517 0.0352135 0.634047 0.868547 1.01895 1.53521L13.2036 22.6396Z"
                        fill="#777"
                        style={{ cursor: "pointer" }}
                      />
                    </svg>
                    <p className="card__upNum">{ans.dislike_count}</p>
                  </div>
                </div>
              </div>
            </div>
            <>{addReply()}</>
            <>{replies()}</>
          </>
        );
      });
    }
    return <p>Be the first one to answer this question</p>;
  };
  const replyCard = (data, index) => {
    if (answers && answers.length != 0) {
      return data.map((d) => {
        if (d.status === "deleted") {
          return null;
        }
        let marginBottom = "0px";
        let image = "";
        if (data.indexOf(d) != data.length - 1) marginBottom = "20px";
        if (d.userprofile) {
          image = d.userprofile.split("server.collectanea.co")[1];
          if (image) image = image.split("?")[0];
        }
        let open = false;
        if (activePopover === d.id + "reply") {
          open = true;
        }
        const id = open ? d.id + "reply" : undefined;
        let deleteOption = () => null;
        if (userdata) {
          if (d.user_id === userdata.userID) {
            deleteOption = () => {
              return (
                <Typography
                  className={classes.typography}
                  onClick={async () => {
                    await deleteResponse("reply", d.id)
                      .then((resolve) => {
                        let i = data.indexOf(d);
                        data.splice(i, 1);
                        answers[index].replies_count =
                          answers[index].replies_count - 1;
                        answers[index].replies = data;
                        setAnswers(answers);
                        handleClose();
                        if (change) setChange();
                        else setChange(1);
                        setMessage("Your reply has been deleted");
                        handleSuccessFailureOpen();
                      })
                      .catch((reject) => {});
                  }}
                >
                  Delete
                </Typography>
              );
            };
          }
        }
        return (
          <div
            className="card card__answerGap card__bgReplies"
            style={{ marginBottom: marginBottom, marginTop: "20px" }}
          >
            <div className="card__dots">
              <svg
                width="4"
                height="13"
                viewBox="0 0 4 13"
                fill="none"
                style={{ cursor: "pointer" }}
                onClick={(e) => handleClick(e, d.id + "reply")}
              >
                <circle cx="1.93993" cy="1.95531" r="1.46703" fill="#312E2E" />
                <circle cx="1.93993" cy="6.69213" r="1.46703" fill="#312E2E" />
                <circle cx="1.93993" cy="11.4294" r="1.46703" fill="#312E2E" />
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
                {deleteOption()}
                <Typography
                  className={classes.typography}
                  onClick={async () => {
                    if (userdata) {
                      await flagAnswer("Reply", d.id)
                        .then((resolve) => {
                          handleClose();
                          setMessage("Reply reported");
                          handleSuccessFailureOpen();
                        })
                        .catch((reject) => {});
                    } else {
                      handlePromptOpen();
                      handleClose();
                    }
                  }}
                >
                  Report
                </Typography>
              </Popover>
            </div>

            <div className="card__avtar-container">
              <Avatar className="card__avtar-img" src={image} />
              <p className="card__avtar-Name">
                {d.username}
              </p>
            </div>
            <p className="card__answer para--size-16">{d.content}</p>

            <div className="card__ansReply">
              <div className="card__vote">
                <svg
                  width="17"
                  height="15"
                  viewBox="0 0 17 15"
                  fill="none"
                  style={{ cursor: "pointer" }}
                >
                  <path
                    d="M16.4148 7.49492L9.59312 0V4.4716H8.14277C3.64559 4.4716 0 8.12433 0 12.6303V15L0.644208 14.2927C2.83444 11.8882 5.9335 10.5182 9.1826 10.5182H9.59312V14.9898L16.4148 7.49492Z"
                    fill="#777"
                  />
                </svg>
                <div className="card__voteBox">
                  <svg
                    width="17"
                    height="14"
                    viewBox="0 0 27 24"
                    fill="none"
                    onClick={async () => {
                      if (userdata) {
                        let i = data.indexOf(d);
                        if (answers[index].replies[i].my_reaction === "like") {
                          removeReaction(d.id, "reply", "");
                          answers[index].replies[i].like_count =
                            answers[index].replies[i].like_count - 1;
                          answers[index].replies[i].my_reaction = null;
                          setAnswers(answers);
                          if (change) setChange();
                          else setChange(1);
                        } else {
                          await reactAnswer(d.id, "reply", "like")
                            .then((resolve) => {
                              answers[index].replies[i].like_count =
                                answers[index].replies[i].like_count + 1;
                              if (
                                answers[index].replies[i].my_reaction ===
                                "dislike"
                              ) {
                                answers[index].replies[i].dislike_count =
                                  answers[index].replies[i].dislike_count - 1;
                              }
                              answers[index].replies[i].my_reaction = "like";
                              setAnswers(answers);
                              if (change) setChange();
                              else setChange(1);
                            })
                            .catch((reject) => {});
                        }
                      } else {
                        handlePromptOpen();
                      }
                    }}
                  >
                    <path
                      d="M12.7207 0.720705C13.1056 0.054038 14.0678 0.0540364 14.4527 0.720703L26.6374 21.8251C27.0223 22.4918 26.5412 23.3251 25.7714 23.3251H1.40206C0.632264 23.3251 0.151137 22.4918 0.536037 21.8251L12.7207 0.720705Z"
                      fill="#777"
                      style={{ cursor: "pointer" }}
                    />
                  </svg>
                  <p className="card__downNum">{d.like_count}</p>
                </div>
                <div className="card__voteBox">
                  <svg
                    width="18"
                    height="14"
                    viewBox="0 0 28 24"
                    fill="none"
                    onClick={async () => {
                      if (userdata) {
                        let i = data.indexOf(d);
                        if (
                          answers[index].replies[i].my_reaction === "dislike"
                        ) {
                          removeReaction(d.id, "reply", "");
                          answers[index].replies[i].dislike_count =
                            answers[index].replies[i].dislike_count - 1;
                          answers[index].replies[i].my_reaction = null;
                          setAnswers(answers);
                          if (change) setChange();
                          else setChange(1);
                        } else {
                          await reactAnswer(d.id, "reply", "dislike")
                            .then((resolve) => {
                              answers[index].replies[i].dislike_count =
                                answers[index].replies[i].dislike_count + 1;
                              if (
                                answers[index].replies[i].my_reaction === "like"
                              ) {
                                answers[index].replies[i].like_count =
                                  answers[index].replies[i].like_count - 1;
                              }
                              answers[index].replies[i].my_reaction = "dislike";
                              setAnswers(answers);
                              if (change) setChange();
                              else setChange(1);
                            })
                            .catch((reject) => {});
                        }
                      } else {
                        handlePromptOpen();
                      }
                    }}
                  >
                    <path
                      d="M13.2036 22.6396C13.5885 23.3063 14.5507 23.3063 14.9356 22.6396L27.1203 1.53522C27.5052 0.868547 27.0241 0.0352135 26.2543 0.0352135H1.88497C1.11517 0.0352135 0.634047 0.868547 1.01895 1.53521L13.2036 22.6396Z"
                      fill="#777"
                      style={{ cursor: "pointer" }}
                    />
                  </svg>
                  <p className="card__upNum">{d.dislike_count}</p>
                </div>
              </div>
            </div>
          </div>
        );
      });
    }
  };

  let writeAnswer = () => null;

  const handleUpload = (e) => {
    let src = URL.createObjectURL(e.target.files[0]);
    const image = () => {
      return <img style={{ objectFit: "contain" }} src={src}></img>;
    };
    let newImages = images.concat(image());
    setImages(newImages);
  };

  if (writeAnswerOpen) {
    let image = userdata.profileURL;
    if (image) {
      image = image.split("?")[0];
    }
    let userID = userdata.userID;
    const responseChange = (e) => {
      let words = e.target.value.split(" ").length;
      if (e.target.value === "") words = 0;
      document.getElementById("answerwords").innerHTML = words;
    };

    writeAnswer = () => {
      return (
        <div className="card card__answerGap">
          <div className="card__dots">
            <svg width="4" height="13" viewBox="0 0 4 13" fill="none">
              <circle cx="1.93993" cy="1.95531" r="1.46703" fill="#312E2E" />
              <circle cx="1.93993" cy="6.69213" r="1.46703" fill="#312E2E" />
              <circle cx="1.93993" cy="11.4294" r="1.46703" fill="#312E2E" />
            </svg>
          </div>

          <div className="card__avtar-container">
            <Avatar className="card__avtar-img" src={image} />
            <p className="card__avtar-Name">{userdata.user.username}</p>
          </div>
          <textarea
            rows="5"
            id="answercontent"
            className="card__answer card__messageReply para--size-16 font"
            type="text"
            placeholder="My comment..."
            style={{ resize: "none" }}
            onChange={responseChange}
          ></textarea>
          {/*<div className="card__answer card__messageReply para--size-16 font">
            {images}
          </div> */}
          <div className="card__ansReply">
            <div
              className="card__views"
              style={{ cursor: "pointer" }}
              onClick={async () =>
                await writeResponse(
                  "answer",
                  question_data.id,
                  document.getElementById("answercontent").value
                )
                  .then((resolve) => {
                    let data = resolve.data.body;
                    answers.push(data);
                    if (change) setChange();
                    else setChange(1);
                    handleAnswerTheQuestion();
                    setMessage("Your answer has been recorded");
                    handleSuccessFailureOpen();
                  })
                  .catch((reject) => {})
              }
            >
              <a className="card__repBtn">Post</a>
            </div>
            <div className="card__vote">
              <div className="card__voteBox">
                <p className="para para--size-16" id="answerwords">
                  0
                </p>
                <p className="para para--size-16">words</p>
              </div>
              <div className="card__voteBox">
                <svg
                  width="15"
                  height="17"
                  viewBox="0 0 16 18"
                  fill="none"
                  style={{ cursor: "pointer" }}
                  onClick={() => document.getElementById("getFile").click()}
                >
                  <path
                    d="M11.039 5.85193L10.3249 5.13776L4.46919 10.9933C3.74194 11.7205 3.74194 12.9039 4.46919 13.6312C5.19643 14.3585 6.37979 14.3585 7.10708 13.6312L14.9713 5.76673C15.5125 5.22552 15.8106 4.50597 15.8106 3.74061C15.8106 2.97524 15.5125 2.2557 14.9713 1.71449C14.4301 1.17331 13.7105 0.875244 12.9452 0.875244C12.1798 0.875244 11.4602 1.17331 10.9191 1.71452L1.35732 11.2763C0.627187 12.0064 0.225098 12.9771 0.225098 14.0096C0.225098 15.0422 0.627187 16.0129 1.35732 16.743C2.08746 17.4732 3.05819 17.8752 4.0907 17.8752C5.12322 17.8752 6.09395 17.4732 6.82408 16.743L14.3771 9.18997L13.663 8.47584L6.10995 16.0289C5.57057 16.5683 4.85348 16.8653 4.0907 16.8653C3.32793 16.8653 2.61084 16.5682 2.07146 16.0289C1.53207 15.4895 1.23507 14.7724 1.23507 14.0096C1.23507 13.2469 1.53214 12.5297 2.07146 11.9904L11.6332 2.42865C12.3567 1.70526 13.5338 1.70526 14.2572 2.42865C14.9806 3.15208 14.9806 4.3292 14.2572 5.05263L6.39298 12.917C6.05948 13.2505 5.51684 13.2505 5.18335 12.917C4.84986 12.5835 4.84986 12.0409 5.18335 11.7074L11.039 5.85193Z"
                    fill="#777"
                  />
                </svg>
                <input
                  id="getFile"
                  type="file"
                  accept="image/*"
                  onChange={handleUpload}
                  style={{ display: "none" }}
                ></input>
              </div>
            </div>
          </div>
        </div>
      );
    };
  }

  const handleAnswerTheQuestion = () => setWriteAnswerOpen(!writeAnswerOpen);

  if (wait) {
    return <AnswerSkeleton id="modalbackground" />;
  }

  const upvoteColor = question_data.is === "upvote" ? active : inactive;
  const downvoteColor =
    question_data.reaction === "downvote" ? active : inactive;
  const bookmarkColor =
    question_data.is_bookmarked === "True" ? active : inactive;

  const loginPrompt = () => {
    return (
      <Modal open={promptOpen} onClose={handlePromptClose}>
        <Fade in={promptOpen}>
          <AlertboxComponent
            close={handlePromptClose}
            message="You need to log into your account to perform this action !"
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
  };

  const getAnswersNew = () => {
    return new Promise((resolve, reject) => {
      const data = new FormData();
      data.append("QuestionID", question_data.id);
      axiosConfig
        .post(nextAnswers, data)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  let next = () => null;
  if (nextAnswers) {
    next = () => (
      <p
        style={{ textAlign: "center", cursor: "pointer" }}
        onClick={async () => {
          await getAnswersNew()
            .then((resolve) => {
              setNextAnswers(resolve.data.links.next);
              let newAnswers = answers.concat(resolve.data.body);
              setAnswers(newAnswers);
              if (change) setChange();
              else setChange(1);
            })
            .catch((reject) => {});
        }}
      >
        View more
      </p>
    );
  }

  const date = new Date(question_data.created_at);
  let elapsed = timeElapsed(date);

  const acceptedAnswer = {
    "@type": "Answer",
    text: "No answers",
    dateCreated: "",
    upvoteCount: "",
    url: "https://example.com/question1#acceptedAnswer",
    author: {
      "@type": "Person",
      name: "",
    },
  };

  let suggestedAnswer = [];

  for (let i = 0; i < answers.length; i++) {
    if (i == 2) break;
    else {
      let data = {
        "@type": "Answer",
        text: answers[i].content,
        dateCreated: new Date(answers[i].created_at),
        upvoteCount: answers[i].like_count,
        url: "https://example.com/question1#suggestedAnswer1",
        author: {
          "@type": "Person",
          name: answers[i].username,
        },
      };
      suggestedAnswer = suggestedAnswer.concat([data]);
    }
  }

  const makeSchema = () => {
    return {
      "@context": "https://schema.org",
      "@type": "QAPage",
      mainEntity: {
        "@type": "Question",
        name: props.question_data.content,
        text: props.question_data.content,
        answerCount: props.question_data.answer_count,
        upvoteCount: props.question_data.upvote_count,
        dateCreated: new Date(props.question_data.created_at),
        author: {
          "@type": "Person",
          name: props.question_data.author.author_name,
        },
        acceptedAnswer: acceptedAnswer,
        suggestedAnswer: suggestedAnswer,
      },
    };
  };

  return (
    <div className="answers" id="modalbackground">
      {success_failure()}
      {loginPrompt()}
      <Head>
        <title>{props.question_data.content}</title>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(makeSchema()),
          }}
        ></script>
      </Head>
      <NavbarSearch />
      <div className="answerNavs">
        <div className="answerNav">
          <svg
            className="answerNav__icon visibility__none"
            viewBox="0 0 25 13" fill="none"
            style={{ cursor: "pointer" }}
            onClick={() => history.back()}
          >
            <path d="M23.9277 6.71484H1.39802" />
            <path d="M6.16601 11.8755L1.04245 6.82883L6.16601 1.34288" />
          </svg>
          <h2 className="answerNav__heading heading-2">
            <label className={styles.font}>{question_data.content}</label>
          </h2>
          <div className="answerNav__items">
            {keywords()}
            <a className="answerNav__link font">{elapsed}</a>
          </div>

          <div className="answerNav__arr">
            <svg
              className="homeCard__upPolygon"
              viewBox="0 0 27 24"
              style={{ cursor: "pointer", fill: upvoteColor }}
              id="upvote"
              onClick={async () => {
                if (userdata == undefined) {
                  handlePromptOpen();
                } else {
                  await reaction(question_data.id, "upvote")
                    .then((resolve) => {
                      if (change) setChange();
                      else setChange(1);
                    })
                    .catch((reject) => {});
                }
              }}
            >
              <path d="M12.7207 0.720705C13.1056 0.054038 14.0678 0.0540364 14.4527 0.720703L26.6374 21.8251C27.0223 22.4918 26.5412 23.3251 25.7714 23.3251H1.40206C0.632264 23.3251 0.151137 22.4918 0.536037 21.8251L12.7207 0.720705Z" />
            </svg>
            <p className="para--size-10">{question_data.upvote_count}</p>
            <svg
              className="homeCard__upPolygon"
              viewBox="0 0 27 24"
              style={{ cursor: "pointer", fill: downvoteColor }}
              id="downvote"
              onClick={async () => {
                if (userdata == undefined) {
                  handlePromptOpen();
                } else {
                  await reaction(question_data.id, "downvote")
                    .then((resolve) => {
                      if (change) setChange();
                      else setChange(1);
                    })
                    .catch((reject) => {});
                }
              }}
            >
              <path d="M13.2036 22.6396C13.5885 23.3063 14.5507 23.3063 14.9356 22.6396L27.1203 1.53522C27.5052 0.868547 27.0241 0.0352135 26.2543 0.0352135H1.88497C1.11517 0.0352135 0.634047 0.868547 1.01895 1.53521L13.2036 22.6396Z" />
            </svg>
          </div>
        </div>
      </div>

      <div className="answer">
        <div className="answer__items answer__items--start">
          <div>
            <label
              onClick={() => {
                if (userdata == undefined) {
                  handlePromptOpen();
                } else {
                  handleAnswerTheQuestion();
                }
              }}
              style={{ cursor: "pointer" }}
              className="answer__link answer__link--active--black font"
            >
              Answer the questions
            </label>
            <label className="answer__link font">
              {question_data.answer_count} Answers
            </label>
            <a className="answer__download">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                style={{ cursor: "pointer" }}
                onClick={async () => {
                  if (userdata == undefined) {
                    handlePromptOpen();
                  } else {
                    await downloadAnswer()
                      .then((resolve) => {
                        let data = resolve.data;
                        data = encodeURI(data);
                        function downloadPDF(pdf) {
                          const linkSource = `data:application/pdf;base64,${pdf}`;
                          const downloadLink = document.getElementById(
                            "download"
                          );
                          const fileName = "vct_illustration.pdf";

                          downloadLink.href = linkSource;
                          downloadLink.download = fileName;
                          downloadLink.click();
                        }
                        downloadPDF(data);
                      })
                      .catch((reject) => {
                        console.log(reject);
                      });
                  }
                }}
              >
                <path
                  d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15"
                  stroke="#312E2E"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M7 10L12 15L17 10"
                  stroke="#312E2E"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M12 15V3"
                  stroke="#312E2E"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </a>
            <a id="download"></a>
          </div>

          <div className="answer__rightIcon">
            <svg
              className="homeCard__icon"
              viewBox="0 0 19 28"
              id="bookmark"
              style={{ cursor: "pointer", fill: bookmarkColor }}
              onClick={() => {
                if (userdata == undefined) {
                  handlePromptOpen();
                } else {
                  addBookmark(question_data.id);
                }
              }}
            >
              <path d="M18.0476 0.912109H1.54746C1.12208 0.912109 0.777222 1.25697 0.777222 1.68235V26.4326C0.777222 26.7442 0.964903 27.025 1.25271 27.1442C1.34802 27.1837 1.4481 27.2029 1.5473 27.2029C1.74772 27.2029 1.94475 27.1247 2.09207 26.9772L9.79767 19.2717L17.503 26.9772C17.7233 27.1976 18.0545 27.2634 18.3424 27.1442C18.6302 27.025 18.8179 26.7442 18.8179 26.4326V1.68235C18.8179 1.25697 18.4731 0.912109 18.0476 0.912109Z" />
            </svg>
          </div>
        </div>
        {writeAnswer()}
        {answerCard()}
        <div>{next()}</div>
      </div>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Answer);

const getQuestionById = (id) => {
  return new Promise((resolve, reject) => {
    axiosConfig
      .get("/api/questions/get-question-by-id/" + id)
      .then((response) => {
        if (response.status != 200) throw new Error();
        resolve(response);
      })
      .catch((error) => {
        resolve(error);
      });
  });
};

export async function getServerSideProps(context) {
  const id = context.params.id;
  let question_data;
  await getQuestionById(id)
    .then((resolve) => {
      question_data = resolve.data.body;
    })
    .catch((reject) => {
      question_data = null;
    });
  //console.log(question_data);
  return {
    props: { question_data },
  };
}
