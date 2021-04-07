import React from "react";
import NavbarSearch from "../Layouts/NavbarSearch";
import { Skeleton } from "@material-ui/lab";

function FollowerSkeleton() {

  return (
    
    <div className="followers">
      <NavbarSearch />
      
      <div className='arrNavs'>
        <div className='arrNav'>

          <svg className='arrNav__icon visibility__none' viewBox="0 0 25 13" fill="none">
            <path
              d="M23.9277 6.71484H1.39802"
            />
            <path
              d="M6.16601 11.8755L1.04245 6.82883L6.16601 1.34288"
            />
          </svg>
          <h2 variant='react' className='heading-2 weight-600'>
            10 followers
            </h2>
          <div className="arrNav__setting">
            <p className=' bpLarge__none'>
              setting
            </p>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M14.8942 9.77296L13.265 8.49508C13.2959 8.24798 13.319 7.99706 13.319 7.74225C13.319 7.48745 13.2959 7.23652 13.265 6.98943L14.8981 5.71155C15.0447 5.59573 15.0872 5.38725 14.9907 5.2174L13.4464 2.54198C13.3499 2.37596 13.1492 2.30647 12.9755 2.37596L11.0529 3.15195C10.6552 2.84694 10.219 2.58831 9.74798 2.39141L9.45843 0.345289C9.42365 0.163852 9.26538 0.0209961 9.07236 0.0209961H5.98386C5.79084 0.0209961 5.63253 0.163852 5.60166 0.345289L5.31211 2.39141C4.84113 2.58831 4.40485 2.84311 4.00723 3.15195L2.08463 2.37596C1.91091 2.31034 1.71014 2.37596 1.61365 2.54198L0.0693464 5.2174C-0.0271815 5.38342 0.0153096 5.59189 0.162002 5.71155L1.79118 6.98943C1.7603 7.23652 1.73714 7.48745 1.73714 7.74225C1.73714 7.99706 1.7603 8.24798 1.79118 8.49508L0.162002 9.77296C0.0153096 9.88878 -0.0271815 10.0973 0.0693464 10.2671L1.61361 12.9425C1.71014 13.1085 1.91087 13.178 2.0846 13.1085L4.00719 12.3326C4.40485 12.6376 4.84109 12.8962 5.31208 13.0931L5.60162 15.1392C5.6325 15.3207 5.79081 15.4635 5.98383 15.4635H9.07232C9.26534 15.4635 9.42365 15.3207 9.45452 15.1392L9.74407 13.0931C10.2151 12.8962 10.6513 12.6414 11.049 12.3326L12.9715 13.1085C13.1453 13.1742 13.346 13.1085 13.4425 12.9425L14.9868 10.2671C15.0834 10.1011 15.0409 9.89265 14.8942 9.77296ZM7.52809 10.4447C6.03403 10.4447 4.82564 9.23632 4.82564 7.74225C4.82564 6.24819 6.03403 5.03983 7.52809 5.03983C9.02216 5.03983 10.2305 6.24822 10.2305 7.74229C10.2305 9.23636 9.02216 10.4447 7.52809 10.4447Z" fill="#312E2E" />
            </svg>

          </div>
        </div>
      </div>

      <div className="follower">
        <div className="followerCards">

          {/* 1 */}
          <div className="followerCard">
            <Skeleton variant='circle' height={30} width={30} className='followerCard__avtar followerCard__bg--1' />

            <Skeleton variant='react' className="followerCard__heading para--dark-3" />

            <Skeleton variant='react' width={50} className='btn__small btn--green followerCard__btn'/>
          </div>
          {/* 2 */}
          <div className="followerCard">
            <Skeleton variant='circle' height={30} width={30} className='followerCard__avtar followerCard__bg--1' />

            <Skeleton variant='react' className="followerCard__heading para--dark-3" />

            <Skeleton variant='react' width={50} className='btn__small btn--green followerCard__btn'/>
          </div>
          

          {/* 3 */}
          <div className="followerCard">
            <Skeleton variant='circle' height={30} width={30} className='followerCard__avtar followerCard__bg--1' />

            <Skeleton variant='react' className="followerCard__heading para--dark-3" />

            <Skeleton variant='react' width={50} className='btn__small btn--green followerCard__btn'/>
          </div>
          {/* 4 */}
          <div className="followerCard">
            <Skeleton variant='circle' height={30} width={30} className='followerCard__avtar followerCard__bg--1' />

            <Skeleton variant='react' className="followerCard__heading para--dark-3" />

            <Skeleton variant='react' width={50} className='btn__small btn--green followerCard__btn'/>
          </div>

          {/* 5 */}
          <div className="followerCard">
            <Skeleton variant='circle' height={30} width={30} className='followerCard__avtar followerCard__bg--1' />

            <Skeleton variant='react' className="followerCard__heading para--dark-3" />

            <Skeleton variant='react' width={50} className='btn__small btn--green followerCard__btn'/>
          </div>
          {/* 6 */}
          <div className="followerCard">
            <Skeleton variant='circle' height={30} width={30} className='followerCard__avtar followerCard__bg--1' />

            <Skeleton variant='react' className="followerCard__heading para--dark-3" />

            <Skeleton variant='react' width={50} className='btn__small btn--green followerCard__btn'/>
          </div>
          {/* 7 */}
          <div className="followerCard">
            <Skeleton variant='circle' height={30} width={30} className='followerCard__avtar followerCard__bg--1' />

            <Skeleton variant='react' className="followerCard__heading para--dark-3" />

            <Skeleton variant='react' width={50} className='btn__small btn--green followerCard__btn'/>
          </div>
          {/* 8 */}
          <div className="followerCard">
            <Skeleton variant='circle' height={30} width={30} className='followerCard__avtar followerCard__bg--1' />

            <Skeleton variant='react' className="followerCard__heading para--dark-3" />

            <Skeleton variant='react' width={50} className='btn__small btn--green followerCard__btn'/>
          </div>
          

          {/* 9 */}
          <div className="followerCard">
            <Skeleton variant='circle' height={30} width={30} className='followerCard__avtar followerCard__bg--1' />

            <Skeleton variant='react' className="followerCard__heading para--dark-3" />

            <Skeleton variant='react' width={50} className='btn__small btn--green followerCard__btn'/>
          </div>
          {/* 10 */}
          <div className="followerCard">
            <Skeleton variant='circle' height={30} width={30} className='followerCard__avtar followerCard__bg--1' />

            <Skeleton variant='react' className="followerCard__heading para--dark-3" />

            <Skeleton variant='react' width={50} className='btn__small btn--green followerCard__btn'/>
          </div>

          {/* 11 */}
          <div className="followerCard">
            <Skeleton variant='circle' height={30} width={30} className='followerCard__avtar followerCard__bg--1' />

            <Skeleton variant='react' className="followerCard__heading para--dark-3" />

            <Skeleton variant='react' width={50} className='btn__small btn--green followerCard__btn'/>
          </div>
          {/* 12 */}
          <div className="followerCard">
            <Skeleton variant='circle' height={30} width={30} className='followerCard__avtar followerCard__bg--1' />

            <Skeleton variant='react' className="followerCard__heading para--dark-3" />

            <Skeleton variant='react' width={50} className='btn__small btn--green followerCard__btn'/>
          </div>
          {/* 13 */}
          <div className="followerCard">
            <Skeleton variant='circle' height={30} width={30} className='followerCard__avtar followerCard__bg--1' />

            <Skeleton variant='react' className="followerCard__heading para--dark-3" />

            <Skeleton variant='react' width={50} className='btn__small btn--green followerCard__btn'/>
          </div>
          {/* 14 */}
          <div className="followerCard">
            <Skeleton variant='circle' height={30} width={30} className='followerCard__avtar followerCard__bg--1' />

            <Skeleton variant='react' className="followerCard__heading para--dark-3" />

            <Skeleton variant='react' width={50} className='btn__small btn--green followerCard__btn'/>
          </div>
          {/* 15 */}
          <div className="followerCard">
            <Skeleton variant='circle' height={30} width={30} className='followerCard__avtar followerCard__bg--1' />

            <Skeleton variant='react' className="followerCard__heading para--dark-3" />

            <Skeleton variant='react' width={50} className='btn__small btn--green followerCard__btn'/>
          </div>
          

          {/* 16 */}
          <div className="followerCard">
            <Skeleton variant='circle' height={30} width={30} className='followerCard__avtar followerCard__bg--1' />

            <Skeleton variant='react' className="followerCard__heading para--dark-3" />

            <Skeleton variant='react' width={50} className='btn__small btn--green followerCard__btn'/>
          </div>
          {/* 17 */}
          <div className="followerCard">
            <Skeleton variant='circle' height={30} width={30} className='followerCard__avtar followerCard__bg--1' />

            <Skeleton variant='react' className="followerCard__heading para--dark-3" />

            <Skeleton variant='react' width={50} className='btn__small btn--green followerCard__btn'/>
          </div>

          {/* 18 */}
          <div className="followerCard">
            <Skeleton variant='circle' height={30} width={30} className='followerCard__avtar followerCard__bg--1' />

            <Skeleton variant='react' className="followerCard__heading para--dark-3" />

            <Skeleton variant='react' width={50} className='btn__small btn--green followerCard__btn'/>
          </div>

        </div>
      </div>
    </div>
  );
}

export default FollowerSkeleton;
