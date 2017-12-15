'use strict';

document.addEventListener('DOMContentLoaded', ready);

function ready() {

  const welcome = document.querySelector('#welcome');
  const bgContainer = document.querySelector('#welcome-bg');
  const moveFactor = 0.01;

  let animationDisable = false;

  //--- if table or phone, remove video and parallax blocks
  if (screen.width <= '992') {
    animationDisable = true;
    welcome.querySelector('video').remove();
    welcome.querySelector('#welcome-bg').remove();
  }

  //--- paralax effect on Welcome page------------------------------------------


  function moveBackground(e) {
    let initialX = (welcome.clientWidth / 2) - e.pageX;
    let initialY = (welcome.clientHeight / 2) - e.pageY;
    let positionX = initialX * moveFactor;
    let positionY = initialY * moveFactor;

    bgContainer.style.transform = `translate( ${ positionX }px, 
                                            ${ positionY }px)`;
  }

  if (!animationDisable) {
    welcome.addEventListener('mousemove', moveBackground);
  }

//----------------------------------------------------------------------------
}

