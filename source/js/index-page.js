function indexPage() {

  let animationEnabled = false;
  const videoElement = document.createElement('video');
  const videoSrc = './assets/img/bg/night.mp4';
  const bgNoFill = 'url(./assets/img/bg/bg-nofill.png)';
  const welcome = document.querySelector('.welcome');
  const bgContainer = document.querySelector('.welcome__bg');

  //--- if big screen, add video and parallax ---
  if (screen.width > 1200) {
    animationEnabled = true;

    videoElement.src = videoSrc;
    videoElement.setAttribute('autoplay', '');
    videoElement.setAttribute('muted', '');
    videoElement.setAttribute('loop', '');
    videoElement.classList.add('welcome__video');
    welcome.insertBefore(videoElement, welcome.firstChild);

    bgContainer.style.backgroundImage = bgNoFill;
  }

  preloader();

  const moveFactor = 0.01;
  const authButton = document.querySelector('#auth-button');
  const toMainButton = document.querySelector('#to-main-button');
  const loginFront = document.querySelector('#login-front');
  const loginBack = document.querySelector('#login-back');

  if (animationEnabled) {
    welcome.addEventListener('mousemove', moveBackground);
  }

  //--- auth-button on click -------------------------------------------------
  if (authButton) {
    authButton.addEventListener('click', function(event) {
      authButton.style.display = 'none';                // hide auth-button
      loginFront.style.transform = 'rotateY(180deg)';   // flip login bar
      loginBack.style.transform = 'rotateY(0)';
      event.preventDefault();
    });
  }
  //--- to-main-button on click ----------------------------------------------
  if (toMainButton) {
    toMainButton.addEventListener('click', function(event) {
      authButton.style.display = '';                // show auth-button
      loginFront.style.transform = 'rotateY(0)';    // flip login bar
      loginBack.style.transform = 'rotateY(-180deg)';
      event.preventDefault();
    });
  }

  //--- parallax effect on index page-----------------------------------------
  function moveBackground(e) {
    let initialX = (welcome.clientWidth / 2) - e.pageX;
    let initialY = (welcome.clientHeight / 2) - e.pageY;
    let positionX = initialX * moveFactor;
    let positionY = initialY * moveFactor;
    let transformString = 'translate3d(' + positionX + 'px, ' + positionY +
        'px, 0)';
    bgContainer.style.transform = transformString;
    bgContainer.style.webkitTransform = transformString;
  }
}
