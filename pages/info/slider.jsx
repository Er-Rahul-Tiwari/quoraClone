// import NavbarSearch from "../../src/Layouts/NavbarSearch";

function Slider() {
  return (
    <div className="">
      {/* <NavbarSearch /> */}

      {/* <!-- slider --> */}
    <section class="slider">
      {/* <!-- 1 --> */} 
      <div
        class="slide"
        style="
          background-image: linear-gradient(to right, white, transparent),
            url(./img/bluetooth.jpg);
        "
      >
        <div class="slide__product">
          <h4 class="upper">Products</h4>
          <h3 class="heading-2">Bluetooth based attendance system</h3>
          <p class="para">
            To access gate control system. To open gate through Bluetooth and
            manage your attendance of employee and students also.
          </p>

          <a href="./bluetooth.html" class="btn slide__btn"> View More </a>
        </div>
      </div>
      {/* <!-- 2 --> */}
      <div
        class="slide"
        style="
          background-image: linear-gradient(to right, white, transparent),
            url(./img/2.jpg);
        "
      >
        <div class="slide__product">
          <h4 class="upper">Products</h4>
          <h3 class="heading-2">MissCall based attendance system</h3>
          <p class="para">
            The System allows users to pull any information data or or give a
            input choice just by giving a Missed Call.
          </p>
          <p class="para">
            The system includes a special GSM unit which can be connected on
            TCP/IP and a web base software
          </p>
          <p class="para">
            The system records the details of all the missed call ( Number/Time
            )
          </p>
          <p class="para">
            The system provides facility to auto send SMS to the users based on
            number on which call was made
          </p>

          <a href="./missCall.html" class="btn slide__btn"> View More </a>
        </div>
      </div>
      {/* <!-- 3 --> */}
      <div
        class="slide"
        style="
          background-image: linear-gradient(to right, white, transparent),
            url(./img/rfid.jpg);
        "
      >
        <div class="slide__product">
          <h4 class="upper">Products</h4>
          <h3 class="heading-2">RFID Attendance Management System</h3>
          <p class="para">
            Minimize absenteeism & enhance punctuality of your employee and
            staff by tracking & maintaining accurate attendance records!
          </p>
          <a href="./rfid.html" class="btn slide__btn"> View More </a>
        </div>
      </div>

      {/* <!-- btn --> */}
      <div class="arrow__left">
        <div class="arrow__circle btnLeft">
          <svg class="arrow__arr" viewBox="0 0 24 24">
            <path
              d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z"
            ></path>
          </svg>
        </div>
      </div>

      <div class="arrow__right">
        <div class="arrow__circle btnRight">
          <svg class="arrow__arr" viewBox="0 0 24 24">
            <path
              d="M8.59 7.41L13.17 12l-4.58 4.59L10 18l6-6-6-6-1.41 1.41z"
            ></path>
          </svg>
        </div>
      </div>
    </section>
    {/* <!-- #slider --> */}
    </div>
  );
}

export default Slider;
