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






