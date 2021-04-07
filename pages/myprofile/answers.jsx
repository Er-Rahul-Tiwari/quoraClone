import React, { useEffect, useState } from "react";
import NavbarSearch from "../../src/Layouts/NavbarSearch";
import { getProfile } from "../../redux/ActionCreator";
import axiosConfig from "../../src/Utils/axiosConfig";
import { connect } from "react-redux";
import timeElapsed from "../../src/Utils/timeElapsed";
import AllAnswerSkeleton from '../../src/Skeletons/AllAnswer';

const mapStateToProps = (state) => {
  return {
    profileData: state.ProfileData,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getProfile: () => dispatch(getProfile),
});

function Answers(props) {
  const [authenticated, setAuthenticated] = useState();
  const [answers, setAnswers] = useState([]);
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
    await getMyAnswers()
      .then((resolve) => {
        setAnswers(resolve);
      })
      .catch((reject) => {});
      setWait(false);
  }, []);

  const getMyAnswers = () => {
    return new Promise((resolve, reject) => {
      const data = new FormData();
      data.append("type", "Answer");
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

  const answerCards = () => {
    let answer_cards = [];
    if (answers.length != 0) {
      for (let j = 0; j < answers.length; j++) {
        for (let i = 0; i < answers[j].Answer.length; i++) {
          let card = () => {
            if (answers[j].Answer[i].content != "Deleted Answer") {
              let image =
                "https://hoptheque.in/testing/project/Nexter/img/realtor-1.jpeg";
              if (answers[j].Answer[i].userprofile) {
                image = answers[j].Answer[i].userprofile.split("?")[0];
              }
              let answer = answers[j].Answer[i].content;
              let elapsed = timeElapsed(
                new Date(answers[j].Answer[i].created_at)
              );
              const keywords = answers[j].keywords.map((key) => {
                return <a className="card__link">{key.name}</a>;
              });
              return (
                <div className="card">
                  <img className="card__img" src={image} />
                  <div className="card__items">
                    <p
                      className="font"
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        (window.location.href = "/question/" + answers[j].id)
                      }
                    >
                      {answers[j].content}
                    </p>
                    <p className="para--size-10 para--dark">{elapsed}</p>
                  </div>
                  <p className="font">Answer</p>
                  <div className="card__reply">{answer}</div>
                  <div className="card__links">
                    {keywords}
                  </div>
                </div>
              );
            }
            return null;
          };
          answer_cards = answer_cards.concat(card());
        }
      }
      return answer_cards;
    }
    return (
      <p style={{ textAlign: "center" }}>You have not answered any question</p>
    );
  };

  if(wait){
    return <AllAnswerSkeleton/>
  }

  return (
    <div className="allAnswers">
      <NavbarSearch />
      <div className="allAnswer">{answerCards()}</div>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Answers);
