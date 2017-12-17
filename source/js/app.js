'use strict';

document.addEventListener('DOMContentLoaded', () => {

  let pageId = document.querySelector('[data-page]');
  if (!pageId) return;

  switch (pageId.dataset.page) {
    case 'about':
      aboutPage();
      break;
    case 'blog':
      blogPage();
      break;
    case 'works':
      worksPage();
      break;
    case 'index':
      indexPage();
      break;
    default:
      return;
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

  //--- if small screen, remove video and parallax blocks ---
  if (screen.width < 1200) {
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
      authButton.style.display = 'none';                // hide auth-button
      loginFront.style.transform = 'rotateY(180deg)';   // flip login bar
      loginBack.style.transform = 'rotateY(0)';
      event.preventDefault();
    });
  }
  //--- to-main-button on click ----------------------------------------------
  if (toMainButton) {
    toMainButton.addEventListener('click', (event) => {
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
    let transformString = `translate3d(${ positionX }px, ${ positionY }px, 0)`;
    bgContainer.style.transform = transformString;
    bgContainer.style.webkitTransform = transformString;
  }
}

// == about page ==============================================================
function aboutPage() {
  initNav();
  initParallax();
}

// == about page ==============================================================
function blogPage() {
  initNav();
  initParallax();
}

// == about page ==============================================================
function worksPage() {
  initNav();
  initParallax();
}

// == common functions ========================================================
function initNav() {
  let openNavButton = document.querySelector('#hamburger');
  let closeNavButton = document.querySelector('#close-nav-button');
  let navLinkList = document.querySelectorAll('.nav__link');
  let navElement = document.querySelector('#nav');
  let pageId = document.querySelector('[data-page]');

  openNavButton.addEventListener('click', (event) => {
    navElement.style.width = '100%';
    event.preventDefault();
  });

  closeNavButton.addEventListener('click', (event) => {
    navElement.style.width = '';
    event.preventDefault();
  });

  //-- mark current page in the navigation list --
  for (let currentPage of navLinkList) {
    if (currentPage.href.search(pageId.dataset.page) > 0) {
      currentPage.classList.add('nav__link_active');
      break;
    }
  }
}

//----------------------------------------------------------------------------
function initParallax() {

  let vHeight = document.documentElement.clientHeight;
  if (vHeight < 600 && vHeight > 430) {
    document.querySelector('.hero').style.height = `${vHeight}px`;

    console.log(vHeight);
  }

  window.onscroll = function() {
    let wScroll = window.pageYOffset;
    parallax.init(wScroll);
  };

//-- parallax on header -- transform to the module structure --
  let parallax = (function() {
    let bg = document.querySelector('.hero__bg');
    let user = document.querySelector('.hero__user-block');
    let section = document.querySelector('.hero__title');

    return {
      move: function(block, windowScroll, shift, strafeAmount) {
        let strafe = -(windowScroll / strafeAmount);
        let transformString = `translate3d(${ shift }%, ${ shift +
        strafe }%, 0)`;

        let style = block.style;
        style.transform = transformString;
        style.webkitTransform = transformString;
      },

      init: function(wScroll) {
        this.move(bg, wScroll, 0, 70);
        this.move(section, wScroll, -50, 10);
        this.move(user, wScroll, -50, 5);
      },
    };
  }());

}

//----------------------------------------------------------------------------


