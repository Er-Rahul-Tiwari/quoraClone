import React from "react";
import NavbarSearch from "../Layouts/NavbarSearch";
import { Skeleton } from "@material-ui/lab";

function AllBookMarksSkeleton() {
  return (
    <div className="allBookMarks">
      <NavbarSearch />

      <div className="arrNavs">
        <div className="arrNav">
          <svg
            className="arrNav__icon visibility__none"
            viewBox="0 0 25 13"
            fill="none"
          >
            <path d="M23.9277 6.71484H1.39802" />
            <path d="M6.16601 11.8755L1.04245 6.82883L6.16601 1.34288" />
          </svg>
          <h2 className="heading-2 font">Bookmark</h2>          
        </div>
      </div>
      <div className="allAnswer">
        {/* 1. main card*/}
        <div className="card">
          <Skeleton
            variant="circle"
            width={30}
            height={30}
            className="card__avtar card__bg--4"
          />
          <div className="card__items">
            <Skeleton
              variant="rect"
              className="card__heading line-height-1 para--dark-3"
            />
            <Skeleton
              width={30}
              className="para--size-10 para--dark weight-600"
            />
          </div>
          <Skeleton style={{ width: "60%" }} className=" card__topAnswer" />
          <Skeleton variant="rect" height={50} className="card__reply" />
          <div className="card__links">
            <Skeleton width={20} className="card__link" />
            <Skeleton width={20} className="card__link" />
            <Skeleton width={20} className="card__link" />
          </div>
        </div>

        {/* 2. main card*/}
        <div className="card">
          <Skeleton
            variant="circle"
            width={30}
            height={30}
            className="card__avtar card__bg--4"
          />
          <div className="card__items">
            <Skeleton
              variant="rect"
              className="card__heading line-height-1 para--dark-3"
            />
            <Skeleton
              width={30}
              className="para--size-10 para--dark weight-600"
            />
          </div>
          <Skeleton style={{ width: "60%" }} className=" card__topAnswer" />
          <Skeleton variant="rect" height={50} className="card__reply" />
          <div className="card__links">
            <Skeleton width={20} className="card__link" />
            <Skeleton width={20} className="card__link" />
            <Skeleton width={20} className="card__link" />
          </div>
        </div>

        {/* 3. main card*/}
        <div className="card">
          <Skeleton
            variant="circle"
            width={30}
            height={30}
            className="card__avtar card__bg--4"
          />
          <div className="card__items">
            <Skeleton
              variant="rect"
              className="card__heading line-height-1 para--dark-3"
            />
            <Skeleton
              width={30}
              className="para--size-10 para--dark weight-600"
            />
          </div>
          <Skeleton style={{ width: "60%" }} className=" card__topAnswer" />
          <Skeleton variant="rect" height={50} className="card__reply" />
          <div className="card__links">
            <Skeleton width={20} className="card__link" />
            <Skeleton width={20} className="card__link" />
            <Skeleton width={20} className="card__link" />
          </div>
        </div>

        {/* 4. main card*/}
        <div className="card">
          <Skeleton
            variant="circle"
            width={30}
            height={30}
            className="card__avtar card__bg--4"
          />
          <div className="card__items">
            <Skeleton
              variant="rect"
              className="card__heading line-height-1 para--dark-3"
            />
            <Skeleton
              width={30}
              className="para--size-10 para--dark weight-600"
            />
          </div>
          <Skeleton style={{ width: "60%" }} className=" card__topAnswer" />
          <Skeleton variant="rect" height={50} className="card__reply" />
          <div className="card__links">
            <Skeleton width={20} className="card__link" />
            <Skeleton width={20} className="card__link" />
            <Skeleton width={20} className="card__link" />
          </div>
        </div>

        {/* 5. main card*/}
        <div className="card">
          <Skeleton
            variant="circle"
            width={30}
            height={30}
            className="card__avtar card__bg--4"
          />
          <div className="card__items">
            <Skeleton
              variant="rect"
              className="card__heading line-height-1 para--dark-3"
            />
            <Skeleton
              width={30}
              className="para--size-10 para--dark weight-600"
            />
          </div>
          <Skeleton style={{ width: "60%" }} className=" card__topAnswer" />
          <Skeleton variant="rect" height={50} className="card__reply" />
          <div className="card__links">
            <Skeleton width={20} className="card__link" />
            <Skeleton width={20} className="card__link" />
            <Skeleton width={20} className="card__link" />
          </div>
        </div>

        {/* 6. main card*/}
        <div className="card">
          <Skeleton
            variant="circle"
            width={30}
            height={30}
            className="card__avtar card__bg--4"
          />
          <div className="card__items">
            <Skeleton
              variant="rect"
              className="card__heading line-height-1 para--dark-3"
            />
            <Skeleton
              width={30}
              className="para--size-10 para--dark weight-600"
            />
          </div>
          <Skeleton style={{ width: "60%" }} className=" card__topAnswer" />
          <Skeleton variant="rect" height={50} className="card__reply" />
          <div className="card__links">
            <Skeleton width={20} className="card__link" />
            <Skeleton width={20} className="card__link" />
            <Skeleton width={20} className="card__link" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllBookMarksSkeleton;
