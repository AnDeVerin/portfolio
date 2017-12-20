// == about page ==============================================================
function aboutPage() {
  preloader();
  setHeadHeight();
  initNav();

  //-- calculate skills animation position
  let showSkillPosition = elmYPosition('Backend');
  let windowHeight = document.documentElement.clientHeight;
  let startSkillAnimationPosition = showSkillPosition - windowHeight;
  initSkillsAnimation(startSkillAnimationPosition);
  initParallax();

  //-- down arrow handler --
  let scrollDownButton = document.querySelector('.down-arrow');
  scrollDownButton.addEventListener('click', function(event) {
    smoothScroll('section-about');
    event.preventDefault();
  });
}