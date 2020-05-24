var x = document.getElementById('navbar');
function toggleNav() {
  if (x.className == 'navbar') {
    x.className += ' responsive';
  } else {
    x.className = 'navbar';
  }
}
document.addEventListener('click', function (e) {
  if (!e.target.id == 'icon' && !e.target.classList.contains('bar')) {
    x.className = 'navbar';
  }
});

function fadeIn(el) {
  if (el.style.opacity == 0.7) return;
  el.style.opacity = Number(el.style.opacity) + 0.01;
  setTimeout(function () {
    fadeIn(el);
  }, 20);
}
var intro = document.getElementById('intro');
fadeIn(intro);

var images = [
  './images/eclipse.jpg',
  './images/mountain.jpg',
  './images/city.jpg',
  './images/reflection.jpg',
  './images/space.jpg',
];

var i = 0;
var img = document.getElementById('carousel');
var img2 = document.getElementById('carousel2');
function changeRight() {
  i = (i + 1) % images.length;
  if (i & 1) {
    img2.style.backgroundImage = 'url(' + images[i] + ')';
    img2.style.opacity = 0;
    img.style.opacity = 1;
    fadeOut(img);
    fadeIn(img2);

    img.style.left = 0;
    moveOut(img);
    img2.style.left = document.body.clientWidth * -1 + 'px';
    moveIn(img2);
  } else {
    img.style.backgroundImage = 'url(' + images[i] + ')';
    img.style.opacity = 0;
    img2.style.opacity = 1;
    fadeOut(img2);
    fadeIn(img);

    img2.style.left = 0;
    moveOut(img2);
    img.style.left = document.body.clientWidth * -1 + 'px';
    moveIn(img);
  }
}
function changeLeft() {
  i = i - 1 < 0 ? images.length - 1 : i - 1;
  if (i & 1) {
    img2.style.backgroundImage = 'url(' + images[i] + ')';
    img2.style.opacity = 0;
    img.style.opacity = 1;
    fadeOut(img);
    fadeIn(img2);

    img.style.left = 0;
    moveOutLeft(img);
    img2.style.left = document.body.clientWidth + 'px';
    moveInLeft(img2);
  } else {
    img.style.backgroundImage = 'url(' + images[i] + ')';
    img.style.opacity = 0;
    img2.style.opacity = 1;
    fadeOut(img2);
    fadeIn(img);

    img2.style.left = 0;
    moveOutLeft(img2);
    img.style.left = document.body.clientWidth + 'px';
    moveInLeft(img);
  }
}
var interval = setInterval(changeRight, 5000);

var left = document.getElementById('left');
left.addEventListener('click', function leftClick() {
  left.removeEventListener('click', leftClick);
  clearTimeout(timeout);
  clearInterval(interval);
  changeLeft();
  setTimeout(function () {
    interval = setInterval(changeRight, 5000);
    left.addEventListener('click', leftClick);
  }, 1000);
});

var right = document.getElementById('right');
right.addEventListener('click', function rightClick() {
  right.removeEventListener('click', rightClick);
  clearTimeout(timeout);
  clearInterval(interval);
  changeRight();
  setTimeout(function () {
    interval = setInterval(changeRight, 5000);
    right.addEventListener('click', rightClick);
  }, 1000);
});

var timeout;

function moveOut(el) {
  if (el.offsetLeft > document.body.clientWidth) {
    el.style.left = 0;
    return;
  }
  el.style.left = el.offsetLeft + 12 + 'px';
  timeout = setTimeout(function () {
    moveOut(el);
  }, 1);
}
function moveIn(el) {
  if (el.offsetLeft >= 0) {
    el.style.left = 0;
    return;
  }
  el.style.left = el.offsetLeft + 12 + 'px';
  timeout = setTimeout(function () {
    moveIn(el);
  }, 1);
}

function moveOutLeft(el) {
  if (el.offsetLeft <= -2 * document.body.clientWidth) {
    el.style.left = -2 * document.body.clientWidth;
    return;
  }
  el.style.left = el.offsetLeft - 12 + 'px';
  timeout = setTimeout(function () {
    moveOutLeft(el);
  }, 1);
}
function moveInLeft(el) {
  if (el.offsetLeft <= 0) {
    el.style.left = 0;
    return;
  }
  el.style.left = el.offsetLeft - 12 + 'px';
  timeout = setTimeout(function () {
    moveInLeft(el);
  }, 1);
}

function fadeIn(el) {
  if (el.style.opacity == 1) return;
  el.style.opacity = Number(el.style.opacity) + 0.01;
  timeout = setTimeout(function () {
    fadeIn(el);
  }, 10);
}
function fadeOut(el) {
  el.style.opacity = el.style.opacity || 1;
  if (el.style.opacity == 0) return;
  el.style.opacity = Number(el.style.opacity) - 0.01;
  timeout = setTimeout(function () {
    fadeOut(el);
  }, 10);
}

function fade(r, g, b, a) {
  var rgb = document.body.style.backgroundColor.match(/(0\.)?[0-9]{1,3}/g) || [
    '0',
    '0',
    '0',
    '0.0',
  ];

  var dR = r - Number(rgb[0]);
  var dG = g - Number(rgb[1]);
  var dB = b - Number(rgb[2]);
  var dA = (Number(a) - Number(rgb[3])).toFixed(2);

  rgb[0] = dR > 0 ? Number(rgb[0]) + 1 : dR == 0 ? rgb[0] : Number(rgb[0]) - 1;
  rgb[1] = dG > 0 ? Number(rgb[1]) + 1 : dG == 0 ? rgb[1] : Number(rgb[1]) - 1;
  rgb[2] = dB > 0 ? Number(rgb[2]) + 1 : dB == 0 ? rgb[2] : Number(rgb[2]) - 1;
  rgb[3] =
    dA > 0 ? Number(rgb[3]) + 0.01 : dA == 0 ? rgb[3] : Number(rgb[3]) - 0.01;

  var string =
    'rgb(' + rgb[0] + ', ' + rgb[1] + ', ' + rgb[2] + ',' + rgb[3] + ')';

  document.body.style.backgroundColor = string;
  // console.log(dR, dG, dB, dA);
  if (dR == 0 && dG == 0 && dB == 0 && dA == 0) return;
  setTimeout(function () {
    fade(r, g, b, a);
  }, 1);
}

document.addEventListener('scroll', onScroll);

function onScroll(e) {
  document.removeEventListener('scroll', onScroll);
  var red = Math.floor(Math.random() * 255);
  var green = Math.floor(Math.random() * 255);
  var blue = Math.floor(Math.random() * 255);
  var alpha = Math.random();

  fade(red, green, blue, alpha);
  setTimeout(function () {
    document.addEventListener('scroll', onScroll);
  }, 5000);
}
