const slides = document.querySelectorAll('.slide');
const btnLeft = document.querySelector('.btnLeft');
const btnRight = document.querySelector('.btnRight');

let curSlide = 0;
const maxSlide = slides.length;

const goToSlide = function(slide){
    slides.forEach(
        (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
};

goToSlide(0);

// Next Slide
const nextSlide = function(){
    if(curSlide === maxSlide -1){
        curSlide = 0;
    }else{
        curSlide++;
    }
    goToSlide(curSlide);
}
// Prev Slide
const prevSlide = function () {
    if(curSlide === 0){
        curSlide = maxSlide -1;
    }else{
        curSlide--;
    }
    goToSlide(curSlide);
}
btnLeft.addEventListener('click', nextSlide);
btnRight.addEventListener('click', prevSlide);