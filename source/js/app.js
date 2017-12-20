'use strict';

document.addEventListener('DOMContentLoaded', function() {

  let pageIdElem = document.querySelector('[data-page]');
  if (!pageIdElem) return;

  switch (pageIdElem.dataset.page) {
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

// == about page ==============================================================
function aboutPage() {
  preloader();
  initNav();

  //-- calculate skills animation position
  let showSkillPosition = elmYPosition('Backend');
  let windowHeight = document.documentElement.clientHeight;
  let startSkillAnimationPosition = showSkillPosition - windowHeight;
  initScroll(startSkillAnimationPosition);

  //-- down arrow handler --
  let scrollDownButton = document.querySelector('.down-arrow');
  scrollDownButton.addEventListener('click', function(event) {
    smoothScroll('section-about');
    event.preventDefault();
  });

}

// == blog page ==============================================================
function blogPage() {
  initNav();
  initScroll();
}

// == works page ==============================================================
function worksPage() {
  initNav();
  initScroll();

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

// == common functions ========================================================
function initNav() {
  let openNavButton = document.querySelector('#hamburger');
  let closeNavButton = document.querySelector('#close-nav-button');
  let navLinkList = document.querySelectorAll('.nav__link');
  let navElement = document.querySelector('#nav');
  let pageId = document.querySelector('[data-page]');

  openNavButton.addEventListener('click', function(event) {
    navElement.style.width = '100%';
    event.preventDefault();
  });

  closeNavButton.addEventListener('click', function(event) {
    navElement.style.width = '';
    event.preventDefault();
  });

  //-- mark current page in the navigation list --
  navLinkList.forEach = [].forEach; // for IE support
  navLinkList.forEach(
      function(currentPage) {
        if (currentPage.href.search(pageId.dataset.page) > 0) {
          currentPage.classList.add('nav__link_active');
        }
      }
  );

}

//----------------------------------------------------------------------------
function initScroll(skillPos) {
  let skillPosition = skillPos || 0;

  //-- set header height if screen is smaller
  let vHeight = document.documentElement.clientHeight;
  if (vHeight < 600 && vHeight > 430) {
    document.querySelector('.hero').style.height = vHeight + 'px';
  }

  window.onscroll = function() {
    let wScroll = window.pageYOffset;
    //console.log(wScroll);

    //-- parallax effect --
    parallax.init(wScroll);
    //-- skills animation --
    if (skillPosition) {
      if (wScroll >= skillPosition) {
        skillPosition = 0;
        showSkills();
      }
    }
  };

//-- parallax on header -- transform to the module structure --
  let parallax = (function() {
    let bg = document.querySelector('.hero__bg');
    let user = document.querySelector('.hero__user-block');
    let section = document.querySelector('.hero__title');

    return {
      move: function(block, windowScroll, shift, strafeAmount) {
        let strafe = -(windowScroll / strafeAmount);
        let transformString = 'translate3d(' + shift + '%, ' +
                                            (shift + strafe) + '%, 0)';

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
//--- smooth scroll ---
function currentYPosition() {
  // Firefox, Chrome, Opera, Safari
  if (self.pageYOffset) return self.pageYOffset;
  // Internet Explorer 6 - standards mode
  if (document.documentElement && document.documentElement.scrollTop)
    return document.documentElement.scrollTop;
  // Internet Explorer 6, 7 and 8
  if (document.body.scrollTop) return document.body.scrollTop;
  return 0;
}

function elmYPosition(eID) {
  let elm = document.getElementById(eID);
  let y = elm.offsetTop;
  let node = elm;
  while (node.offsetParent && node.offsetParent != document.body) {
    node = node.offsetParent;
    y += node.offsetTop;
  }
  return y;
}

function smoothScroll(eID) {
  let startY = currentYPosition();
  let stopY = elmYPosition(eID);
  let distance = stopY > startY ? stopY - startY : startY - stopY;
  if (distance < 100) {
    scrollTo(0, stopY);
    return;
  }
  let speed = Math.round(distance / 100);
  if (speed >= 30) speed = 30;
  let step = Math.round(distance / 25);
  let leapY = stopY > startY ? startY + step : startY - step;
  let timer = 0;
  if (stopY > startY) {
    for (let i = startY; i < stopY; i += step) {
      setTimeout('window.scrollTo(0, ' + leapY + ')', timer * speed);
      leapY += step;
      if (leapY > stopY) leapY = stopY;
      timer++;
    }
    return;
  }
  for (let i = startY; i > stopY; i -= step) {
    setTimeout('window.scrollTo(0, ' + leapY + ')', timer * speed);
    leapY -= step;
    if (leapY < stopY) leapY = stopY;
    timer++;
  }
}

//----------------------------------------------------------------------------
function showSkills() {

  let skillsData = {
    'HTML5': 90,
    'CSS3': 80,
    'JavaScript': 75,
    'PHP': 20,
    'mySQL': 20,
    'Node.js & npm': 60,
    'Mongo.db': 55,
    'Git': 80,
    'Gulp': 70,
    'Webpack': 50,
  };

  let skillsList = document.querySelectorAll('.circle__second');
  //skillsList.forEach = [].forEach;

  skillsList = [].slice.call(skillsList);
  console.log(skillsList);
  for (let i = 0, l = skillsList.length; i < l; i++) {
  //skillsList.forEach(function(skill) {
    //let skillName = skill.dataset.skillName; //doesn't work in IE
    //skill.classList.add('circle-' + skillsData[skillName]);

    setTimeout(function() {
      let skillName = skillsList[i].getAttribute('data-skill-name');
      let newCircleClass = 'circle-' + skillsData[skillName];
      skillsList[i].setAttribute('class','circle__second ' + newCircleClass);
    }, 300 + i*50);
  }

}