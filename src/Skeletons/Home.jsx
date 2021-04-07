import React from "react";
import NavbarSearch from "../Layouts/NavbarSearch";
import { Skeleton } from "@material-ui/lab";

function Home() {
  return (
    <div className="homes">
      <NavbarSearch />
      <div className="home">
        <div className="home__items">
          <Skeleton className="home__link" />
          <Skeleton className="home__link" />
          <Skeleton className="home__link" />
          <Skeleton className="home__link" />

          <Skeleton className="home__link" />
        </div>

        <div className="homeCards">
          {/* How does it work Card */}

          <div className="itWork">
            <Skeleton
              variant="text"
              className="itWork__heading"
              style={{ width: "60%" }}
            />

            <Skeleton
              variant="rect"
              className="itWork__message"
              height={40}
              style={{ width: "100%" }}
            />

            <div className="itWork__cross">
              <Skeleton variant="react" className="itWork__icon" />
            </div>
            <Skeleton
              variant="react"
              style={{ width: "20%" }}
              className="btn__small btn--green itWork__btn"
            />
          </div>

          {/* 1 First card*/}
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
        
          {/* 2 main card*/}
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
      </div>

      <div className="users">
        {/* 1 */}
        <div className="user">
          <h4 className="heading-4 weight-600 heading-4--dark">Top users</h4>

          <div className="user__list">
            <Skeleton
              variant="circle"
              height={25}
              width={25}
              className="user__img"
            />
            <Skeleton variant="text" className="para--size-12 para--dark" />
          </div>
          <div className="user__list">
            <Skeleton
              variant="circle"
              height={25}
              width={25}
              className="user__img"
            />
            <Skeleton variant="text" className="para--size-12 para--dark" />
          </div>
          <div className="user__list">
            <Skeleton
              variant="circle"
              height={25}
              width={25}
              className="user__img"
            />
            <Skeleton variant="text" className="para--size-12 para--dark" />
          </div>
          <div className="user__list">
            <Skeleton
              variant="circle"
              height={25}
              width={25}
              className="user__img"
            />
            <Skeleton variant="text" className="para--size-12 para--dark" />
          </div>
          <div className="user__list">
            <Skeleton
              variant="circle"
              height={25}
              width={25}
              className="user__img"
            />
            <Skeleton variant="text" className="para--size-12 para--dark" />
          </div>
        </div>

        <div className="keyword">
          <h4 className="heading-4 weight-600 heading-4--dark">Top keywords</h4>
          <div className="keyword__list">
            <Skeleton className="keyword__link keyword__link--active" />
            <Skeleton className="keyword__link keyword__link--active" />
            <Skeleton className="keyword__link keyword__link--active" />
            <Skeleton className="keyword__link keyword__link--active" />
            <Skeleton className="keyword__link keyword__link--active" />
            <Skeleton className="keyword__link keyword__link--active" />
            <Skeleton className="keyword__link keyword__link--active" />
            <Skeleton className="keyword__link keyword__link--active" />
            <Skeleton className="keyword__link keyword__link--active" />
            <Skeleton className="keyword__link keyword__link--active" />
            <Skeleton className="keyword__link keyword__link--active" />
            <Skeleton className="keyword__link keyword__link--active" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
