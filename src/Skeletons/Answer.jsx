import React from "react";
import NavbarSearch from "../Layouts/NavbarSearch";
import { Skeleton } from "@material-ui/lab";

function AnswerSkeleton() {
  return (
    <div className="answers">
      <NavbarSearch />

      <div className="answerNavs">
        <div className="answerNav">
          <svg
            className="answerNav__icon visibility__none"
            viewBox="0 0 25 13"
            fill="none"
          >
            <path d="M23.9277 6.71484H1.39802" />
            <path d="M6.16601 11.8755L1.04245 6.82883L6.16601 1.34288" />
          </svg>
          <h2 className="answerNav__heading heading-2 weight-600">
            <Skeleton
              variant="rect"
              height={30}
              className="card__answer card__messageReply para--size-16"
            />
          </h2>
          <div className="answerNav__items">
            <Skeleton variant="rect" width={20} className="answerNav__link" />
            <Skeleton variant="rect" width={20} className="answerNav__link" />
            <Skeleton variant="rect" width={20} className="answerNav__link" />
            <Skeleton variant="rect" width={20} className="answerNav__link" />
          </div>

          <div className="answerNav__arr">
            <Skeleton className="homeCard__upPolygon" />
            <Skeleton className="para--size-10" />
            <Skeleton className="homeCard__upPolygon" />
          </div>
        </div>
      </div>

      <div className="answer">
        <div className="answer__items answer__items--start">
          <Skeleton
            width={20}
            className="answer__link answer__link--active--black"
          />
          <Skeleton width={20} className="answer__link" />
          <Skeleton width={20} className="answer__link" />
          <div className="answer__rightIcon">
            <Skeleton variant="rect" className="homeCard__icon" />
          </div>
        </div>

        {/* My answer to the question Card*/}
        <div className="card card__answerGap">
          <Skeleton variant="rect" className="card__dots" />

          <div className="card__avtar--box">
            <Skeleton
              variant="circle"
              width={30}
              height={30}
              className="card__avtar card__bg--2"
            />
            <Skeleton className="card__avtarName" />
          </div>
          <Skeleton
            variant="rect"
            height={60}
            className="card__answer card__messageReply para--size-16"
          />
          <div className="card__ansReply">
            <div className="card__views">
              <Skeleton variant="rect" widht={40} className="card__repBtn" />
            </div>
            <div className="card__vote">
              <div className="card__voteBox">
                <Skeleton width={20} className="para para--size-16" />
                <Skeleton width={20} className="para para--size-16" />
              </div>
              <Skeleton width={20} className="card__voteBox" />
            </div>
          </div>
        </div>

        {/* Replies to replies Card*/}
        <div className="card card__answerGap card__bgReplies">
          <Skeleton width={20} className="card__dots" />

          <div className="card__avtar--box">
            <Skeleton
              variant="circle"
              width={30}
              height={30}
              className="card__avtar card__bg--4"
            />
            <Skeleton className="card__avtarName" />
          </div>
          <Skeleton
            variant="rect"
            height={60}
            className="card__answer para--size-16"
          />

          <div className="card__ansReply">
            <div className="card__vote">
              <Skeleton width={10} />
              <div className="card__voteBox">
                <Skeleton width={10} />

                <Skeleton width={10} className="card__downNum" />
              </div>
              <div className="card__voteBox">
                <Skeleton width={10} />
                <Skeleton width={10} className="card__upNum" />
              </div>
            </div>
          </div>
        </div>

        {/* Answer Card*/}
        <div className="card card__answerGap">
          <Skeleton width={20} className="card__dots" />

          <div className="card__avtar--box">
            <Skeleton
              variant="circle"
              width={30}
              height={30}
              className="card__avtar card__bg--4"
            />
            <Skeleton className="card__avtarName" />
          </div>
          <Skeleton
            variant="rect"
            height={60}
            className="card__answer para--size-16"
          />

          <div className="card__ansReply">
            <div className="card__views">
              <Skeleton variant="rect" width={50} className="card__repBtn" />
              <Skeleton
                variant="rect"
                widht={50}
                className="card__views--select"
              />
            </div>

            <div className="card__vote">
              <Skeleton width={10} />
              <div className="card__voteBox">
                <Skeleton width={10} />

                <Skeleton width={10} className="card__downNum" />
              </div>
              <div className="card__voteBox">
                <Skeleton width={10} />
                <Skeleton width={10} className="card__upNum" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnswerSkeleton;
