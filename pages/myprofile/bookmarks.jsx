import React, { useState, useEffect } from "react";
import NavbarSearch from "../../src/Layouts/NavbarSearch";
import { getProfile } from "../../redux/ActionCreator";
import axiosConfig from "../../src/Utils/axiosConfig";
import { connect } from "react-redux";
import timeElapsed from "../../src/Utils/timeElapsed";
import AllBookMarksSkeleton from '../../src/Skeletons/AllBookMarks';

const mapStateToProps = (state) => {
  return {
    profileData: state.ProfileData,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getProfile: () => dispatch(getProfile),
});

function Bookmarks(props) {
  const [authenticated, setAuthenticated] = useState();
  const [bookmarks, setBookmarks] = useState([]);
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
    await getMyBookmarks()
      .then((resolve) => {
        setBookmarks(resolve);
      })
      .catch((reject) => {});
    setWait(false);
  }, []);

  const getMyBookmarks = () => {
    return new Promise((resolve, reject) => {
      axiosConfig
        .get("/api/questions/get-all-bookmarks/")
        .then((response) => {
          resolve(response.data.body);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  const bookmarkCards = () => {
    if (bookmarks.length != 0) {
      let bookmark_cards = [];
      for (let i = 0; i < bookmarks.length; i++) {
        let data = () => {
          if (bookmarks[i].question.question_type === "normal") {
            let image =
              "https://hoptheque.in/testing/project/Nexter/img/realtor-1.jpeg";
            if (
              Array.isArray(bookmarks[i].question.Answer) &&
              bookmarks[i].question.Answer.length != 0
            ) {
              image = bookmarks[i].question.Answer[0].profileURL.split("?")[0];
            } else {
              image = bookmarks[i].question.Answer.profileURL.split("?")[0];
            }
            let answer;
            if (
              Array.isArray(bookmarks[i].question.Answer) &&
              bookmarks[i].question.Answer &&
              bookmarks[i].question.Answer.length != 0
            ) {
              answer = bookmarks[i].question.Answer[0].Answer;
            } else if (bookmarks[i].question.Answer) {
              answer = bookmarks[i].question.Answer.Answer;
            }
            let elapsed = timeElapsed(new Date(bookmarks[i].created_at));
            const keywords = bookmarks[i].question.keywords.map((key) => {
              return <a className="card__link">{key.name}</a>;
            });
            return (
              <div className="card">
                <img
                  className="card__avtar card__bg--4"
                  src={image}
                  style={{ objectFit: "cover" }}
                ></img>
                <div className="card__items">
                  <p className="card__heading line-height-1 para--dark-3">
                    {bookmarks[i].question.content}
                  </p>
                  <p className="para--size-10 para--dark">{elapsed}</p>
                </div>
                <p className=" card__topAnswer">Top answer</p>
                <div className="card__reply">{answer}</div>
                <div className="card__links">{keywords}</div>
              </div>
            );
          }
          let image = "https://hoptheque.in/testing/project/Nexter/img/realtor-1.jpeg";
          if (bookmarks[i].question.category.category_svg) {
            image = image.split("?")[0];
          }
          const Options = bookmarks[i].question.Options.map((option) => {
            let percentStr = option.option_percentage + "%";
            let percent = option.option_percentage;
            if (percent === 0) {
              percent = 1;
              percentStr = "0%";
            }
            return (
              <div                                
                className="homeCard__progress"
                style={{ width: percent + "%", cursor: "pointer" }}
              >
                <p className="homeCard__progress--name">{option.option_name}</p>
                <p className="homeCard__progress--value">{percentStr}</p>
              </div>
            );
          });
          const keywords = bookmarks[i].question.keywords.map((key) => (
            <label className="homeCard__link">{key.name}</label>
          ));
          let elapsed = timeElapsed(new Date(bookmarks[i].created_at))
          return (
            <div className="homeCard" style={{ marginBottom: "20px" }}>
              <img
                className="card__avtar card__bg--4"
                src={image}
                style={{ objectFit: "cover" }}
              ></img>              
              <div className="homeCard__items">
                <p className="homeCard__heading line-height-1 para--dark-3">
                  {bookmarks[i].question.content}
                </p>
                <p className="para--size-10 para--dark">{elapsed}</p>
              </div>
              <div className="homeCard__box">{Options}</div>
              <div className="homeCard__links">{keywords}</div>              
            </div>
          );
        };
        bookmark_cards = bookmark_cards.concat(data());
      }
      return bookmark_cards;
    }
    return (
      <p style={{ textAlign: "center" }}>
        You have not bookmarked any question
      </p>
    );
  };

  if(wait){
    return <AllBookMarksSkeleton/>
  }
  
  return (
    <div className="allBookMarks">
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
          <h2 className="heading-2 font">Bookmarks</h2>
        </div>
      </div>

      <div className="allAnswer">{bookmarkCards()}</div>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Bookmarks);
