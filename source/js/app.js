'use strict';

//--- paralax effect on Welcome page------------------------------------------
const welcome = document.querySelector('#welcome');
const bgContainer = document.querySelector('#welcome-bg');
const moveFactor = 0.01;
const shiftX = 1150;

function moveBackground(e) {
  let initialX = (welcome.clientWidth / 2) - e.pageX;
  let initialY = (welcome.clientHeight / 2) - e.pageY;
  let positionX = initialX * moveFactor;
  let positionY = initialY * moveFactor;

  bgContainer.style.transform = `translate( ${ positionX - shiftX }px, 
                                            ${ positionY }px)`;
}

welcome.addEventListener('mousemove', moveBackground);

//----------------------------------------------------------------------------
