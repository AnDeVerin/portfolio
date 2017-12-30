'use strict';
(function() {

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
      case 'admin':
        adminPage();
        break;
      default:
        return;
    }
  });

//=== preloader.js ============================================================
  function preloader() {
    let percentTotal = 0;
    let preloader = document.querySelector('.preloader');

    let imgPaths = [];
    let allElems = document.querySelectorAll('*');

    // searching for images
    allElems.forEach = [].forEach;
    allElems.forEach(function(item) {
      let path;
      let bgI = getComputedStyle(item).backgroundImage;
      if (bgI !== 'none') {
        path = bgI.split('"')[1];
      }

      if (item.tagName === 'IMG') {
        path = item.src;
      }

      if (path) {
        imgPaths.push(path);
      }
    });

    let setPercent = function(total, current) {
      let percents = Math.ceil(current / total * 100);
      preloader.querySelector('.preloader__procent').textContent = percents +
          '%';
      let startFill = percents * 282.6 / 100;
      preloader.querySelector(
          '.preloader__circle_fill').style.strokeDasharray = '' + startFill +
          ' 282.6';

      if (percents >= 100) {
        preloaderFadeOut();
      }
    };

    let loadImages = function(images) {
      if (!images.length) {
        preloaderFadeOut();
      }

      images.forEach(function(img, i, images) {
        let fakeImg = document.createElement('img');
        fakeImg.src = img;

        fakeImg.onload = function() {
          percentTotal++;
          setPercent(images.length, percentTotal);
        };

        fakeImg.onerror = function() {
          percentTotal++;
          setPercent(images.length, percentTotal);
        };
      });
    };

    loadImages(imgPaths);

    function preloaderFadeOut() {
      preloader.classList.add('preloader_invisible');
      setTimeout(function() {
        preloader.style.display = 'none';
      }, 1000);
    }
  }

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
        },
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

//=== slider.js ================================================================
  function initSlider() {
    let duration = 300;

    let prevButton = document.querySelector('.preview-page_prev');
    let nextButton = document.querySelector('.preview-page_next');

    let previewSet = document.querySelectorAll('.preview__item');
    let prevSlideSet = prevButton.querySelectorAll('.slider__item');
    let nextSlideSet = nextButton.querySelectorAll('.slider__item');

    //--- Button handlers ------------------------------------------------------
    prevButton.addEventListener('click', function(e) {
      e.preventDefault();
      changeSlide(previewSet, 'down', 1);
      changeSlide(prevSlideSet, 'down', 1);
      changeSlide(nextSlideSet, 'down', -1);
    });

    nextButton.addEventListener('click', function(e) {
      e.preventDefault();
      changeSlide(previewSet, 'up', 1);
      changeSlide(prevSlideSet, 'up', -1);
      changeSlide(nextSlideSet, 'up', 1);
    });

    //--------------------------------------------------------------------------
    function changeSlide(sliderList, direction, reverse) {
      direction = (direction === 'down') ? 1 : -1;

      let activeSlideIndex = -1;
      let nextSlide;
      let slideShow = false;    //- processing slideShow

      sliderList.forEach = [].forEach; //- find index of active slide
      sliderList.forEach(function(item, i) {
        if (item.classList.contains('slider__item_active')) {
          activeSlideIndex = i;
        }
        if (item.classList.contains('preview__item_active')) {
          activeSlideIndex = i;       //- slide show
          slideShow = true;
        }
      });

      if (activeSlideIndex === -1) return; // exit, if no active slide

      nextSlide = activeSlideIndex + direction;
      if (nextSlide >= sliderList.length) {
        nextSlide = 0;
      }
      if (nextSlide < 0) {
        nextSlide = sliderList.length - 1;
      }

      //- processing slideShow
      if (slideShow) {
        sliderList[activeSlideIndex].classList.remove('preview__item_active');
        sliderList[nextSlide].classList.add('preview__item_active');

        let slideTitle = sliderList[nextSlide].dataset.previewTitle;
        let slideTechno = sliderList[nextSlide].dataset.previewTechnology;
        let slideLink = sliderList[nextSlide].dataset.previewLink;

        let titleItem = document.querySelector('.work-description__title');
        let techItem = document.querySelector('.work-description__technology');
        let linkItem = document.querySelector('.work-description__button');

        titleItem.style.opacity = '0';
        techItem.style.opacity = '0';

        setTimeout(function() {
          titleItem.textContent = slideTitle;
          techItem.textContent = slideTechno;
          linkItem.href = slideLink;

          titleItem.style.opacity = '';
          techItem.style.opacity = '';

        }, 300);

        return;
      }

      //- moving 2 slides
      sliderList[activeSlideIndex].style.transition = 'top ' + duration + 'ms';
      sliderList[nextSlide].style.transition = 'top ' + duration + 'ms';
      sliderList[activeSlideIndex].style.top = direction * 100 * reverse + '%';
      sliderList[nextSlide].style.top = 0 + '%';

      //- set default values after animation
      setTimeout(function() {
        sliderList[activeSlideIndex].classList.remove('slider__item_active');
        sliderList[nextSlide].classList.add('slider__item_active');

        sliderList[activeSlideIndex].style.transition = '';
        sliderList[activeSlideIndex].style.top = '';
      }, duration);
    }

    //--------------------------------------------------------------------------
  }

//=== index-page.js ============================================================
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

    //--- login form ----------------------------------------------------------
    if (loginBack) {
      const loginForm = loginBack.querySelector('.login__form');

      if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
          event.preventDefault(); // cancel default action
          if (!validateForm(loginForm)) {
            return;
          }
          sendLogin(loginForm);
        });
      }
    }

    //- send login info -------------------------------------------------------
    function sendLogin(loginForm) {

      let confirmation = document.querySelector('.contact-me__confirm');
      let confCloseButton = confirmation.querySelector('.button');
      let confMessage = document.querySelector('.contact-me__confirm-mess');
      confMessage.textContent = 'Неверный логин';


      console.log('Login sent to server');
      loginBack.classList.add('login_disabled');

      let data = {
        name: loginForm.name.value,
        pass: loginForm.pass.value
      };

/*      sendAjaxJson('/admin', data, function(data) {
        formMail.reset();
        confMessage.textContent = data;
        confirmation.classList.add('contact-me__confirm_visible');
      });*/

      setTimeout(function() {
        loginForm.reset();
        confirmation.classList.add('contact-me__confirm_visible');
      }, 1000);

      //--- close confirmation window ---
      confCloseButton.addEventListener('click', function(event) {
        event.preventDefault();
        confirmation.classList.remove('contact-me__confirm_visible');
        loginBack.classList.remove('login_disabled');
      });

    //top.location.href='/admin';
    }

    //- validate login form ---------------------------------------------------
    function validateForm(loginForm) {
      const testRE = /^[a-z][\w-]{2,12}$/i;
      //-  handle login input -
      let loginField = loginForm.name;
      let loginIcon = loginField.nextSibling;
      let loginWrapper = loginForm.name.closest('.login__input');

      if (!testRE.test(loginForm.name.value)) {
        loginField.classList.add('login__input-field_error');
        loginIcon.classList.add('login__img_fill_red');
        loginIcon.classList.remove('login__img_fill_blue');
        loginWrapper.classList.add('login__input_error');

        loginField.onfocus = function() { // remove error on focus
          loginField.classList.remove('login__input-field_error');
          loginIcon.classList.remove('login__img_fill_red');
          loginWrapper.classList.remove('login__input_error');
        };
        return;
      } else {
        loginIcon.classList.add('login__img_fill_blue');
      }

      //-  handle password input -
      let passField = loginForm.pass;
      let passIcon = passField.nextSibling;
      let passWrapper = loginForm.pass.closest('.login__input');

      if (!testRE.test(loginForm.pass.value)) {
        passField.classList.add('login__input-field_error');
        passIcon.classList.add('login__img_fill_red');
        passIcon.classList.remove('login__img_fill_blue');
        passWrapper.classList.add('pass__input_error');

        passField.onfocus = function() { // remove error on focus
          passField.classList.remove('login__input-field_error');
          passIcon.classList.remove('login__img_fill_red');
          passWrapper.classList.remove('pass__input_error');
        };
        return;
      } else {
        passIcon.classList.add('login__img_fill_blue');
      }

      //-  handle checkbox and radio input -
      let robotCheck = loginForm.human.closest('.login__checkbox-wrapper');

      if (!loginForm.human.checked ||
          !loginForm.robot[0].checked) {
        robotCheck.classList.add('login__checkbox-wrapper_error');

        loginForm.addEventListener('click', function() {
          robotCheck.classList.remove('login__checkbox-wrapper_error');
        });
        return;
      }

      return true;
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

// == blog page ==============================================================
  function blogPage() {
    preloader();
    initNav();
    initParallax();
  }

// == works page ==============================================================
  function worksPage() {
    preloader();
    setHeadHeight();
    initNav();
    initParallax();
    initSlider();
    sendMail();

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

//--- sendMail form -----------------------------------------------------------
  function sendMail() {
    const confirmation = document.querySelector('.contact-me__confirm');
    const confCloseButton = document.querySelector(
        '.contact-me__confirm-button');
    const confMessage = document.querySelector('.contact-me__confirm-mess');

    const formMail = document.querySelector('.contact-form');

    if (formMail) {
      formMail.addEventListener('submit', function(event) {
        event.preventDefault(); // cancel default action
        if (!validateForm()) {
          return;
        }
        prepareSendMail();
      });
    }

    //--- contact form validation ----------------------------------------------------
    function validateForm() {
      const nameRE = /^[а-яА-ЯёЁa-zA-Z]+[\sа-яА-ЯёЁa-zA-Z-]*/i;
      const emailRE = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
      const textRE = /^[а-яА-ЯёЁa-zA-Z]+[\sа-яА-ЯёЁa-zA-Z-]*/i;

      if (!nameRE.test(formMail.name.value)) {  //validate name
        formMail.name.classList.add('contact-form__input_error');
        let wrapper = formMail.name.closest('.contact-form__input-wrapper');
        wrapper.classList.add('contact-form__name_error');

        formMail.name.onfocus = function() {
          formMail.name.classList.remove('contact-form__input_error');
          wrapper.classList.remove('contact-form__name_error');
        };
        return;
      }

      if (!emailRE.test(formMail.email.value)) {  //validate email
        formMail.email.classList.add('contact-form__input_error');
        let wrapper = formMail.email.closest('.contact-form__input-wrapper');
        wrapper.classList.add('contact-form__email_error');

        formMail.email.onfocus = function() {
          formMail.email.classList.remove('contact-form__input_error');
          wrapper.classList.remove('contact-form__email_error');
        };
        return;
      }

      if (!textRE.test(formMail.text.value)) {  //validate text
        formMail.text.classList.add('contact-form__input_error');
        let wrapper = formMail.text.closest('.contact-form__input-wrapper');
        wrapper.classList.add('contact-form__text_error');

        formMail.text.onfocus = function() {
          formMail.text.classList.remove('contact-form__input_error');
          wrapper.classList.remove('contact-form__text_error');
        };
        return;
      }
      return true;
    }

    //------------------------------------------------------------------------
    function prepareSendMail(event) {
      formMail.classList.add('contact-form_disabled');

      let data = {
        name: formMail.name.value,
        email: formMail.email.value,
        text: formMail.text.value,
      };

      sendAjaxJson('/mail', data, function(data) {
        formMail.reset();
        confMessage.textContent = data;
        confirmation.classList.add('contact-me__confirm_visible');
      });
    }

    //--- close confirmation window ---
    confCloseButton.addEventListener('click', function(event) {
      event.preventDefault();
      confirmation.classList.remove('contact-me__confirm_visible');
      formMail.classList.remove('contact-form_disabled');
    });
  }

//=== sendAjaxJson ============================================================
  function sendAjaxJson(url, data, callback) {
    let xhr = new XMLHttpRequest();
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function(e) {
      let result;
      try {
        result = JSON.parse(xhr.responseText);
      } catch (e) {
        callback('Извините в данных ошибка');
      }
      callback(result.status);
    };
    xhr.send(JSON.stringify(data));
  }

//==== admin page =============================================================
  function adminPage() {

    initAdminTabs();

    //------------------------------------------------------------------------
    function initAdminTabs() {
      const menu = document.querySelector('.admin__tabs');
      if (!menu) return;

      menu.addEventListener('click', function(event) {
        event.preventDefault();
        let target = event.target.closest('.tabs__item'); // check if click on tab
        if (!target) {
          return;
        }

        const tabs = document.querySelectorAll('.tabs__item');
        const pages = document.querySelectorAll('.admin__page');

        let targetPage = target.dataset.page; // get target page name

        //- set active tab
        tabs.forEach(function(tab) {
          if (tab === target) {
            tab.classList.add('tabs__item_active');
          } else {
            tab.classList.remove('tabs__item_active');
          }
        });

        //- set active page
        pages.forEach(function(page) {
          if (page.classList.contains(targetPage)) {
            page.classList.add('admin__page_active');
          } else {
            page.classList.remove('admin__page_active');
          }
        });
      });
    }

  }

//=============================================================================
})();

//=== init-map for Google-map==================================================
function initMap() {

  let styledMapType = new google.maps.StyledMapType(
      [
        {
          'elementType': 'geometry',
          'stylers': [
            {
              'color': '#f5f5f5',
            },
          ],
        },
        {
          'elementType': 'labels.icon',
          'stylers': [
            {
              'visibility': 'off',
            },
          ],
        },
        {
          'elementType': 'labels.text.fill',
          'stylers': [
            {
              'color': '#616161',
            },
          ],
        },
        {
          'elementType': 'labels.text.stroke',
          'stylers': [
            {
              'color': '#f5f5f5',
            },
          ],
        },
        {
          'featureType': 'administrative.land_parcel',
          'elementType': 'labels.text.fill',
          'stylers': [
            {
              'color': '#bdbdbd',
            },
          ],
        },
        {
          'featureType': 'poi',
          'elementType': 'geometry',
          'stylers': [
            {
              'color': '#eeeeee',
            },
          ],
        },
        {
          'featureType': 'poi',
          'elementType': 'labels.text.fill',
          'stylers': [
            {
              'color': '#757575',
            },
          ],
        },
        {
          'featureType': 'poi.park',
          'elementType': 'geometry',
          'stylers': [
            {
              'color': '#e5e5e5',
            },
          ],
        },
        {
          'featureType': 'poi.park',
          'elementType': 'labels.text.fill',
          'stylers': [
            {
              'color': '#9e9e9e',
            },
          ],
        },
        {
          'featureType': 'road',
          'elementType': 'geometry',
          'stylers': [
            {
              'color': '#ffffff',
            },
          ],
        },
        {
          'featureType': 'road.arterial',
          'elementType': 'labels.text.fill',
          'stylers': [
            {
              'color': '#757575',
            },
          ],
        },
        {
          'featureType': 'road.highway',
          'elementType': 'geometry',
          'stylers': [
            {
              'color': '#dadada',
            },
          ],
        },
        {
          'featureType': 'road.highway',
          'elementType': 'labels.text.fill',
          'stylers': [
            {
              'color': '#616161',
            },
          ],
        },
        {
          'featureType': 'road.local',
          'elementType': 'labels.text.fill',
          'stylers': [
            {
              'color': '#9e9e9e',
            },
          ],
        },
        {
          'featureType': 'transit.line',
          'elementType': 'geometry',
          'stylers': [
            {
              'color': '#e5e5e5',
            },
          ],
        },
        {
          'featureType': 'transit.station',
          'elementType': 'geometry',
          'stylers': [
            {
              'color': '#eeeeee',
            },
          ],
        },
        {
          'featureType': 'water',
          'elementType': 'geometry',
          'stylers': [
            {
              'color': '#c9c9c9',
            },
          ],
        },
        {
          'featureType': 'water',
          'elementType': 'geometry.fill',
          'stylers': [
            {
              'color': '#4369aa',
            },
            {
              'visibility': 'on',
            },
          ],
        },
        {
          'featureType': 'water',
          'elementType': 'labels.text.fill',
          'stylers': [
            {
              'color': '#9e9e9e',
            },
          ],
        },
      ],
      {name: 'Styled Map'});

  let map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 58.607, lng: 49.687},
    zoom: 13,
    disableDefaultUI: true,
  });

  map.mapTypes.set('styled_map', styledMapType);
  map.setMapTypeId('styled_map');
}

