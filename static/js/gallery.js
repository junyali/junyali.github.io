document.addEventListener('DOMContentLoaded', function() {
  // Navbar shrinking
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

  // Particles BG
  particlesJS.load('particles-js', '/particles.json', function() {
    console.log('particles.js loaded - callback');
  });

  // Gallery functions
  const countries = ['austria', 'belgium', 'china', 'france', 'germany', 'japan', 'saudiarabia', 'switzerland', 'uk', 'usa'];
  const container = document.querySelector('.photo-grid-container');
  const img_count = 50; // idk just sum random number pulled from my backside

  function createGallery() {
    countries.forEach(country => {
      const section = document.createElement('section');
      section.id = country;
      section.className = 'photo-grid';

      const title = document.createElement('h2');
      title.textContent = country.charAt(0).toUpperCase() + country.slice(1);
      section.appendChild(title);

      const photoContainer = document.createElement('div');
      photoContainer.className = 'photo-container';

      for (let i = 1; i <= img_count; i++) {
        const card = document.createElement('div');
        card.className = 'photo-card';

        const img = document.createElement('img');
        const imagePath = `/gallery/images/${country}/${country}_${i}.jpg`;
        img.src = imagePath;
        img.loading = 'lazy';

        card.appendChild(img);
        photoContainer.appendChild(card);

        card.addEventListener('click', () => openModal(imagePath, country, i));
      }

      section.appendChild(photoContainer);
      container.appendChild(section);

    });
  }

  function openModal(imagePath, country, imageNumber) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
      <div class="modal-content">
        <span class="close">&times;</span>
        <img src="${imagePath}">
        <a href="${imagePath}" download="photo_${country}_${imageNumber}.jpg" class="download-btn">Download</a>
      </div>
    `;

    document.body.appendChild(modal);

    const closeBtn = modal.querySelector('.close');
    closeBtn.addEventListener('click', () => {
      document.body.removeChild(modal);
    });

    window.addEventListener('click', (event) => {
      if (event.target === modal) {
        document.body.removeChild(modal);
      }
    });
  }

  function showPhotoGrid(countryId) {
    document.querySelectorAll('.photo-grid').forEach(grid => {
      grid.style.display = grid.id === countryId ? 'block' : 'none';
    });
  }

  function handleHashChange() {
    const countryId = window.location.hash.substring(1) || 'japan';
    showPhotoGrid(countryId);
  }

  createGallery();

  document.querySelectorAll('.country-list a').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      showPhotoGrid(targetId);
      window.location.hash = targetId;
    });
  });

  window.addEventListener('hashchange', handleHashChange);

  handleHashChange();
});