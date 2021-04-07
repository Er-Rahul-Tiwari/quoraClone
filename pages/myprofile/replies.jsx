import React, { useEffect, useState } from "react";
import NavbarSearch from "../../src/Layouts/NavbarSearch";
import { getProfile } from "../../redux/ActionCreator";
import axiosConfig from "../../src/Utils/axiosConfig";
import { connect } from "react-redux";
import AllRepliesSkeleton from "../../src/Skeletons/AllReply";
import timeElapsed from "../../src/Utils/timeElapsed";

const mapStateToProps = (state) => {
  return {
    profileData: state.ProfileData,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getProfile: () => dispatch(getProfile),
});

function Replies(props) {
  const [authenticated, setAuthenticated] = useState();
  const [replies, setReplies] = useState([]);
  const [wait, setWait] = useState(true);

  useEffect(async () => {
    await props
      .getProfile()
      .then((resolve) => {
        setAuthenticated(true);
      })
      .catch((reject) => {
        if (reject.unauthenticated) {
          window.location.href = "/";
        }
      });
    await getMyReplies()
      .then((resolve) => {
        setReplies(resolve);
      })
      .catch((reject) => {});
    setWait(false);
  }, []);

  const getMyReplies = () => {
    return new Promise((resolve, reject) => {
      const data = new FormData();
      data.append("type", "Reply");
      axiosConfig
        .post("/api/answers/get-my-answers-reply/", data)
        .then((response) => {
          resolve(response.data.body);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  const replyCards = () => {
    if (replies.length != 0) {
      let reply_cards = [];
      for (let i = 0; i < replies.length; i++) {
        for (let j = 0; j < replies[i].Answer.length; j++) {
          for (let y = 0; y < replies[i].Answer[j].user_replies.length; y++) {
            if (
              replies[i].Answer[j].user_replies[y].content != "Deleted Reply"
            ) {
              let data = () => {
                let image =
                  "https://hoptheque.in/testing/project/Nexter/img/realtor-1.jpeg";
                if (replies[i].Answer[j].user_replies[y].userprofile) {
                  image = replies[i].Answer[j].user_replies[
                    y
                  ].userprofile.split("?")[0];
                }
                let elapsed = timeElapsed(
                  new Date(replies[i].Answer[j].user_replies[y].created_at)
                );
                const keywords = replies[i].keywords.map((key) => {
                  return <a className="card__link">{key.name}</a>;
                });
                return (
                  <>
                    <img className="card__img" src={image} />
                    <div className="card__items">
                      <p className="card__heading line-height-1 para--dark-3" 
                        style={{ cursor: "pointer" }}
                        onClick={() =>
                          (window.location.href = "/question/" + replies[i].id)
                        }>
                        {replies[i].content}
                      </p>
                      <p className="para--size-10 para--dark">{elapsed}</p>
                    </div>
                    <p className=" card__topAnswer">Reply</p>
                    <div className="card__reply">{replies[i].Answer[j].user_replies[y].content}</div>
                    <div className="card__links">
                      {keywords}
                    </div>
                  </>
                );
              };
              reply_cards = reply_cards.concat(data());
            }
          }
        }
      }
      return reply_cards;
    }
    return (
      <p style={{ textAlign: "center" }}>
        You have not replied to any answer yet.
      </p>
    );
  };

  if (wait) {
    return <AllRepliesSkeleton />;
  }
  
  return (
    <div className="allReplies">
      <NavbarSearch />

      <div className="arrNavs">
        <div className="arrNav">
          <svg
            className="arrNav__icon visibility__none"
            viewBox="0 0 25 13"
            fill="none"
            style={{ cursor: "pointer" }}
            onClick={() => history.back()}
          >
            <path d="M23.9277 6.71484H1.39802" />
            <path d="M6.16601 11.8755L1.04245 6.82883L6.16601 1.34288" />
          </svg>
          <h2 className="heading-2 font">Replies</h2>
        </div>
      </div>

      <div className="allAnswer">
        <div className="card">{replyCards()}</div>
      </div>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Replies);
