import React, { useState, useEffect } from "react";
import NavbarSearch from "../../src/Layouts/NavbarSearch";
import { getProfile } from "../../redux/ActionCreator";
import { connect } from "react-redux";
import FollowingSkeleton from "../../src/Skeletons/Following";
import { Avatar, makeStyles } from "@material-ui/core";
import { removeCookie } from "../../redux/localstorage";
import axiosConfig from "../../src/Utils/axiosConfig";

const useStyles = makeStyles((theme) => ({  
  avatar: {
    width: theme.spacing(9),
    height: theme.spacing(9),
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

function Following(props) {
  const classes = useStyles();
  const [followingsList, setFollowingslist] = useState();
  const [wait, setWait] = useState(true);
  const [change, setChange] = useState();
  const [following, setFollowing] = useState();

  useEffect(async () => {
    await props
      .getProfile()
      .then((resolve) => {
        axiosConfig
          .get("/api/auth/get-followings-list/")
          .then((response) => {
            setFollowingslist(response.data.body);
            setFollowing(response.data.body.length);
            setWait(false);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((reject) => {
        window.location.href = "/auth/signin";
      });
  }, []);

  if (wait) {
    return <FollowingSkeleton />;
  }

  const unfollowUser = (index, userID) => {
    return new Promise((resolve, reject) => {
      const data = new FormData();
      data.append("userID", userID);
      axiosConfig.post("/api/auth/toggle-following-view/", data)
      .then(response => {
        resolve(response);
      })
      .catch(error => {
        reject(error);
      })
    })
  }

  const followings = () => {    
    if (followingsList.length != 0) {
      return followingsList.map((user) => {
        let index = followingsList.indexOf(user);
        let image = "";
        if (user.profileURL) {
          image = user.profileURL.split("?")[0];
        }
        let width = "100%";
        if(followingsList.length === 1){
          width = "50%";
        }
        return (
          <div className="followerCard" style={{ width: width }}>
            <Avatar className={classes.avatar} src={image} />

            <p className="para--dark-3">{user.username}</p>

            <button className="btn__small btn--green followerCard__btn font" onClick={async () => {
              await unfollowUser(index, user.userID)
              .then(response => {
                followingsList.splice(index, 1);
                let newList = followingsList;
                setFollowingslist(newList);
                setFollowing(following - 1);
                removeCookie("state");
                if(change) setChange();
                else setChange(1);
              })
              .catch(reject => {})
            }}>
              Unfollow
            </button>
          </div>
        );
      });
    }
    return <p style={{ textAlign: "center" }}>You are not following anyone yet !</p>;
  };

  return (
    <div className="followings">
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
          <h2 className="heading-2 weight-600 font">{following} following</h2>          
        </div>
      </div>

      <div className="following">
        <div className="followerCards">{followings()}</div>
      </div>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Following);
