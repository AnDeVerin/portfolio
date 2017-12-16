'use strict';

document.addEventListener('DOMContentLoaded', ready);

function ready() {

  let animationDisable = false;
  const moveFactor = 0.01;
  const welcome = document.querySelector('#welcome');
  const bgContainer = document.querySelector('#welcome-bg');

  const authButton = document.querySelector('#auth-button');
  const toMainButton = document.querySelector('#to-main-button');
  const loginFront = document.querySelector('#login-front');
  const loginBack = document.querySelector('#login-back');

  //--- if table or phone, remove video and parallax blocks ---
  if (window.innerWidth <= 992) {
    animationDisable = true;
    welcome.querySelector('video').remove();
    welcome.querySelector('#welcome-bg').remove();
  }

  if (!animationDisable) {
    welcome.addEventListener('mousemove', moveBackground);
  }

  //--- auth-button on click -------------------------------------------------
  authButton.addEventListener('click', (event) => {
    authButton.style.display = 'none';      // hide auth-button
    loginFront.style.transform = 'rotateY(180deg)';   // flip login bar
    loginBack.style.transform = 'rotateY(0)';
    event.preventDefault();
  });

  //--- to-main-button on click -------------------------------------------------
  toMainButton.addEventListener('click', (event) => {
    authButton.style.display = '';      // show auth-button
    loginFront.style.transform = 'rotateY(0)';   // flip login bar
    loginBack.style.transform = 'rotateY(-180deg)';
    event.preventDefault();
  });
  //--- parallax effect on Welcome page---------------------------------------
  function moveBackground(e) {
    let initialX = (welcome.clientWidth / 2) - e.pageX;
    let initialY = (welcome.clientHeight / 2) - e.pageY;
    let positionX = initialX * moveFactor;
    let positionY = initialY * moveFactor;

    bgContainer.style.transform = `translate( ${ positionX }px, 
                                            ${ positionY }px)`;
  }
//----------------------------------------------------------------------------
}

