// == common functions ========================================================

//--- init hamburger menu -----------------------------------------------------
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

//--- set header height for small screens ------------------------------------
function setHeadHeight() {

  let vHeight = document.documentElement.clientHeight;
  if (vHeight < 600 && vHeight > 430) {
    document.querySelector('.hero').style.height = vHeight + 'px';
  }
}

//--- trigger skills animation once ------------------------------------------
function initSkillsAnimation(skillPos) {
  let skillPosition = skillPos || 0;

  window.addEventListener('scroll', function() {
    let wScroll = window.pageYOffset;
    //-- skills animation --
    if (skillPosition) {
      if (wScroll >= skillPosition) {
        skillPosition = 0;
        showSkills();
      }
    }
  });
}

//--- animate skills circles on about page -----------------------------------
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
  skillsList.forEach = [].forEach;
  skillsList.forEach(function(skill) {
    setTimeout(function() {
      let skillName = skill.getAttribute('data-skill-name');
      let newCircleClass = 'circle-' + skillsData[skillName];
      skill.setAttribute('class', 'circle__second ' + newCircleClass);
    }, 300);
  });
}

//--- parallax effect on the header ------------------------------------------
function initParallax() {
  window.addEventListener('scroll', function() {
    let wScroll = window.pageYOffset;
    parallax.init(wScroll);
  });
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

//--- smooth scroll functions set --------------------------------------------
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