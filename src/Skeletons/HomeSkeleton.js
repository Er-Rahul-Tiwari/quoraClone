import React from "react";
import NavbarSearch from "../Layouts/NavbarSearch";
import { Skeleton } from "@material-ui/lab";

function HomeSkeleton() {
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

          <Skeleton className="itWork">
            <p className="itWork__heading"> How does it work? </p>
            <p className="itWork__message">
              Discover questions and topics that interest you. Learn how to use
              the platform.
            </p>
            <div className="itWork__cross">
              <svg className="itWork__icon" viewBox="0 0 24 24" fill="none">
                <path
                  d="M18 6L6 18"
                  stroke="black"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M6 6L18 18"
                  stroke="black"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
            <a className="btn__small btn--green itWork__btn">Take a tour!</a>
          </Skeleton>
          <Skeleton className="itWork">
            <p className="itWork__heading"> How does it work? </p>
            <p className="itWork__message">
              Discover questions and topics that interest you. Learn how to use
              the platform.
            </p>
            <div className="itWork__cross">
              <svg className="itWork__icon" viewBox="0 0 24 24" fill="none">
                <path
                  d="M18 6L6 18"
                  stroke="black"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M6 6L18 18"
                  stroke="black"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
            <a className="btn__small btn--green itWork__btn">Take a tour!</a>
          </Skeleton>
          {/*Feed area*/}
        </div>
      </div>

      <div className="users">
        {/* 1 */}
        <div className="user">
          <h4 className="heading-4 weight-600 heading-4--dark">Top users</h4>
          <Skeleton className="user__list">
            <p className="para--size-12 para--dark">
              Top User Top User Top User
            </p>
          </Skeleton>
          <Skeleton className="user__list">
            <p className="para--size-12 para--dark">
              Top User Top User Top User
            </p>
          </Skeleton>
          <Skeleton className="user__list">
            <p className="para--size-12 para--dark">
              Top User Top User Top User
            </p>
          </Skeleton>
          <Skeleton className="user__list">
            <p className="para--size-12 para--dark">
              Top User Top User Top User
            </p>
          </Skeleton>
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeSkeleton;
