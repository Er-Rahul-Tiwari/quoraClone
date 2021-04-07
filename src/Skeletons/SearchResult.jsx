import React from "react";
import NavbarSearch from "../Layouts/NavbarSearch";
import { Skeleton } from "@material-ui/lab";

function SearchResultSkeleton() {
  return (
    <div className="searchResults">
      <NavbarSearch />

      <div className="searchResult">
        <div className="searchResult__items searchResult__items--end">
          <a href="" className="home__link home__link--left">
            <Skeleton
              variant="rect"
              className="home__dropdown--icon bpLarge__display"
            />
          </a>
          <Skeleton
            variant="rect"
            className="searchResult__link  bpLarge__none"
          />
          <Skeleton
            variant="rect"
            className="searchResult__link  bpLarge__none"
          />
          <Skeleton
            variant="rect"
            className="searchResult__link  bpLarge__none"
          />
          <Skeleton
            variant="rect"
            className="searchResult__link  bpLarge__none"
          />
          <Skeleton
            varinat="react"
            className="searchResult__link bpLarge__none searchResult__link--active"
          />

          <Skeleton variant="rect" className="searchResult__icon" />
        </div>

        <div className="resultCards">
          {/* 1 */}
          <div className="resultCard">
            <Skeleton variant="rect" height={100} className="resultCard__img" />
            <div className="resultCard__cart">
              <Skeleton height={40} className="resultCard__icon" />
            </div>
            <div className="resultCard__items">
              <Skeleton
                variant="rect"
                style={{ width: "85%" }}
                className="heading-4"
              />
              <Skeleton
                variant="rect"
                style={{ width: "85%" }}
                className="resultCard__para"
              />
              <Skeleton
                variant="rect"
                style={{ width: "85%" }}
                className="resultCard__email"
              />
            </div>
            <Skeleton
              variant="rect"
              width={100}
              className="btn__small btn--black resultCard__btn"
            />
          </div>
          
          {/* 2 */}
          <div className="resultCard">
            <Skeleton variant="rect" height={100} className="resultCard__img" />
            <div className="resultCard__cart">
              <Skeleton height={40} className="resultCard__icon" />
            </div>
            <div className="resultCard__items">
              <Skeleton
                variant="rect"
                style={{ width: "85%" }}
                className="heading-4"
              />
              <Skeleton
                variant="rect"
                style={{ width: "85%" }}
                className="resultCard__para"
              />
              <Skeleton
                variant="rect"
                style={{ width: "85%" }}
                className="resultCard__email"
              />
            </div>
            <Skeleton
              variant="rect"
              width={100}
              className="btn__small btn--black resultCard__btn"
            />
          </div>
          {/* 3 */}
          <div className="resultCard">
            <Skeleton variant="rect" height={100} className="resultCard__img" />
            <div className="resultCard__cart">
              <Skeleton height={40} className="resultCard__icon" />
            </div>
            <div className="resultCard__items">
              <Skeleton
                variant="rect"
                style={{ width: "85%" }}
                className="heading-4"
              />
              <Skeleton
                variant="rect"
                style={{ width: "85%" }}
                className="resultCard__para"
              />
              <Skeleton
                variant="rect"
                style={{ width: "85%" }}
                className="resultCard__email"
              />
            </div>
            <Skeleton
              variant="rect"
              width={100}
              className="btn__small btn--black resultCard__btn"
            />
          </div>
          {/* 4 */}
          <div className="resultCard">
            <Skeleton variant="rect" height={100} className="resultCard__img" />
            <div className="resultCard__cart">
              <Skeleton height={40} className="resultCard__icon" />
            </div>
            <div className="resultCard__items">
              <Skeleton
                variant="rect"
                style={{ width: "85%" }}
                className="heading-4"
              />
              <Skeleton
                variant="rect"
                style={{ width: "85%" }}
                className="resultCard__para"
              />
              <Skeleton
                variant="rect"
                style={{ width: "85%" }}
                className="resultCard__email"
              />
            </div>
            <Skeleton
              variant="rect"
              width={100}
              className="btn__small btn--black resultCard__btn"
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

export default SearchResultSkeleton;
