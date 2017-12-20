function preloader() {
  let percentTotal = 0;
  let preloader = document.querySelector('.preloader');

  let imgPaths = [];
  let allElems = document.querySelectorAll('*');

  // searching for images
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
    preloader.querySelector('.preloader__procent').textContent = percents + '%';
    let startFill = percents * 282.6 / 100;
    preloader.querySelector('.preloader__circle_fill').style.strokeDasharray = '' + startFill +' 282.6';

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

  console.log(imgPaths);

  function preloaderFadeOut() {
    preloader.classList.add('preloader_invisible');
    setTimeout(function() {
      preloader.style.display = 'none';
    }, 1000);
  }
}