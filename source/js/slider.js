function initSlider() {
  let duration = '300ms';

  let prevButton = document.querySelector('.preview-page_prev');
  let nextButton = document.querySelector('.preview-page_next');

  let previewSet = document.querySelectorAll('.preview__item');
  let prevSlideSet = prevButton.querySelectorAll('.slider__item');
  let nextSlideSet = nextButton.querySelectorAll('.slider__item');

  //--- Button handlers ------------------------------------------------------
  prevButton.addEventListener('click', function(e) {
    e.preventDefault();
    changeSlide(previewSet, 'down');
    changeSlide(prevSlideSet, 'down');
    changeSlide(nextSlideSet, 'down');
  });

  nextButton.addEventListener('click', function(e) {
    e.preventDefault();
    changeSlide(previewSet, 'up');
    changeSlide(prevSlideSet, 'up');
    changeSlide(nextSlideSet, 'up');
  });

  //--------------------------------------------------------------------------
  function changeSlide(sliderList , direction) {
    direction = (direction === 'down') ? 1 : -1;

    let activeSlideIndex = -1;
    let nextSlide;
    let slideShow = false;    //- processing slideShow

    sliderList.forEach = [].forEach; //- find index of active slide
    sliderList.forEach(function(item, i) {
      if(item.classList.contains('slider__item_active')) {
        activeSlideIndex = i;
      }
      if(item.classList.contains('preview__item_active')) {
        activeSlideIndex = i;
        slideShow = true;
      }
    });

    if (activeSlideIndex === -1) return; // exit, if no active slide

    nextSlide = activeSlideIndex + direction;
    if (nextSlide >= sliderList.length) {
      nextSlide = 0;
    }
    if (nextSlide < 0) {
      nextSlide = sliderList.length - 1;
    }

    //- processing slideShow
    if (slideShow) {
      sliderList[activeSlideIndex].classList.remove('preview__item_active');
      sliderList[nextSlide].classList.add('preview__item_active');

      let slideTitle = sliderList[nextSlide].dataset.previewTitle;
      let slideTechno = sliderList[nextSlide].dataset.previewTechnology;
      let slideLink = sliderList[nextSlide].dataset.previewLink;

      document.querySelector('.work-description__title').textContent = slideTitle;
      document.querySelector('.work-description__technology').textContent = slideTechno;
      document.querySelector('.work-description__button').href = slideLink;

      return;
    }


    //- moving 2 slides
    sliderList[activeSlideIndex].style.transition = 'top ' + duration;
    sliderList[nextSlide].style.transition = 'top ' + duration;
    sliderList[activeSlideIndex].style.top = direction * 100 + '%';
    sliderList[nextSlide].style.top = 0 + '%';

    //- set default values after animation
    setTimeout(function() {
      sliderList[activeSlideIndex].classList.remove('slider__item_active');
      sliderList[nextSlide].classList.add('slider__item_active');

      sliderList[activeSlideIndex].style.transition = '';
      sliderList[activeSlideIndex].style.top = '';
    }, duration);
  }
  //--------------------------------------------------------------------------

}

