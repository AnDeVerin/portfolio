// == works page ==============================================================
function worksPage() {
  preloader();
  setHeadHeight();
  initNav();
  initParallax();
  initSlider();

  let scrollDownButton = document.querySelector('.down-arrow');
  scrollDownButton.addEventListener('click', function(event) {
    smoothScroll('section-works');
    event.preventDefault();
  });

  let scrollUpButton = document.querySelector('.up-arrow');
  scrollUpButton.addEventListener('click', function(event) {
    smoothScroll('section-works');
    event.preventDefault();
  });
}