particlesJS.load('particles-js', './particles.json', function() {
  console.log('particles.js loaded - callback');
});

document.addEventListener('DOMContentLoaded', function() {
  const navbar = document.querySelector('.navbar');
  let lastScrollTop = 0;

  window.addEventListener('scroll', function() {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop) {
      // Scrolling down
      navbar.classList.add('shrink');
    } else {
      // Scrolling up
      navbar.classList.remove('shrink');
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
  });
});