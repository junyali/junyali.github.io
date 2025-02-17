document.addEventListener('DOMContentLoaded', function() {
  const navbar = document.querySelector('.navbar');
  let lastScrollTop = 0;

  function updateTime() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';

    // Convert to 12-hour format
    const formattedHours = hours % 12 || 12;

    // Pad minutes with leading zero if necessary
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;

    const timeString = `${formattedHours}:${formattedMinutes}${ampm}`;

    document.getElementById('current-time').textContent = timeString;
  }

  updateTime();
  setInterval(updateTime, 1000);

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

  particlesJS.load('particles-js', '/particles.json', function() {
    console.log('particles.js loaded - callback');
  });
});