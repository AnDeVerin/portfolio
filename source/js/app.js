'use strict';

let adrStringArray = window.location.pathname.split('/');
const CURRENT_PAGE = adrStringArray[adrStringArray.length - 1];

document.addEventListener('DOMContentLoaded', () => {

  switch (CURRENT_PAGE) {
    case 'about.html':
      aboutPage();
      break;
    case 'blog.html':
      blogPage();
      break;
    case 'works.html':
      worksPage();
      break;
    default:
      indexPage();
  }
});

// == welcome page ============================================================
function indexPage() {
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

  if (!animationDisable && welcome) {
    welcome.addEventListener('mousemove', moveBackground);
  }

  //--- auth-button on click -------------------------------------------------
  if (authButton) {
    authButton.addEventListener('click', (event) => {
      authButton.style.display = 'none';      // hide auth-button
      loginFront.style.transform = 'rotateY(180deg)';   // flip login bar
      loginBack.style.transform = 'rotateY(0)';
      event.preventDefault();
    });
  }
  //--- to-main-button on click ----------------------------------------------
  if (toMainButton) {
    toMainButton.addEventListener('click', (event) => {
      authButton.style.display = '';      // show auth-button
      loginFront.style.transform = 'rotateY(0)';   // flip login bar
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

    bgContainer.style.transform = `translate( ${ positionX }px, 
                                            ${ positionY }px)`;
  }
}

// == about page ==============================================================
function aboutPage() {
  initNav();
}

// == about page ==============================================================
function blogPage() {
  initNav();
}

// == about page ==============================================================
function worksPage() {
  initNav();

}

// == common functions ========================================================
function initNav() {
  let openNavButton = document.querySelector('#hamburger');
  let closeNavButton = document.querySelector('#close-nav-button');
  let navLinkList = document.querySelectorAll('.nav__link');
  let navElement = document.querySelector('#nav');

  openNavButton.addEventListener('click', (event) => {
    navElement.style.width = '100%';
    event.preventDefault();
  });

  closeNavButton.addEventListener('click', (event) => {
    navElement.style.width = '';
    event.preventDefault();
  });

  //-- mark current page in the navigation list --
  for (let currentLink of navLinkList) {
    if (currentLink.href.search(CURRENT_PAGE) > 0) {
      currentLink.classList.add('nav__link_active');
      break;
    }
  }
}

//----------------------------------------------------------------------------


