// Accordion toggle functionality
document.querySelectorAll('.accordion-header').forEach(header => {
  header.addEventListener('click', () => {
    const openItem = document.querySelector('.accordion-header.active');
    if (openItem && openItem !== header) {
      openItem.classList.remove('active');
      openItem.nextElementSibling.style.maxHeight = null;
    }
    header.classList.toggle('active');
    const content = header.nextElementSibling;
    if (header.classList.contains('active')) {
      content.style.maxHeight = content.scrollHeight + 'px';
    } else {
      content.style.maxHeight = null;
    }
  });
});

// Smooth scroll for "Find a Repair Café" button
document.getElementById('findRepairCafeBtn').addEventListener('click', () => {
  document.getElementById('repair-cafes').scrollIntoView({ behavior: 'smooth' });
});

// Search filter for Repair Cafés
const searchInput = document.getElementById('searchCafe');
const cafeList = document.getElementById('cafeList');
searchInput.addEventListener('input', () => {
  const filter = searchInput.value.toLowerCase();
  const cafes = cafeList.querySelectorAll('li');
  cafes.forEach(cafe => {
    const city = cafe.getAttribute('data-city').toLowerCase();
    if (city.includes(filter)) {
      cafe.style.display = '';
    } else {
      cafe.style.display = 'none';
    }
  });
});

// View on Map button functionality
document.querySelectorAll('.view-map-btn').forEach(button => {
  button.addEventListener('click', () => {
    const lat = button.getAttribute('data-lat');
    const lng = button.getAttribute('data-lng');
    const mapFrame = document.getElementById('mapFrame');
    mapFrame.src = `https://maps.google.com/maps?q=${lat},${lng}&z=12&output=embed`;
  });
});

// Form validation and confirmation message
const form = document.getElementById('workshopForm');
const formMessage = document.getElementById('formMessage');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (!form.checkValidity()) {
    formMessage.textContent = 'Please fill out all fields correctly.';
    formMessage.style.color = 'red';
    return;
  }
  formMessage.textContent = '✅ Thanks! We’ll contact you about the next workshop.';
  formMessage.style.color = 'var(--primary-color)';
  form.reset();
});

// Animated counters for impact stats
const counters = document.querySelectorAll('.counter');
const speed = 200; // lower is faster

const animateCounters = () => {
  counters.forEach(counter => {
    const updateCount = () => {
      const target = +counter.getAttribute('data-target');
      const count = +counter.innerText;
      const increment = Math.ceil(target / speed);

      if (count < target) {
        counter.innerText = count + increment > target ? target : count + increment;
        setTimeout(updateCount, 20);
      } else {
        counter.innerText = target;
      }
    };
    updateCount();
  });
};

// Trigger counter animation when section is visible
const impactSection = document.getElementById('impact');
let countersAnimated = false;

const isInViewport = (element) => {
  const rect = element.getBoundingClientRect();
  return rect.top <= window.innerHeight && rect.bottom >= 0;
};

const onScroll = () => {
  if (!countersAnimated && isInViewport(impactSection)) {
    animateCounters();
    countersAnimated = true;
  }
  // Scroll animations for fade-in elements
  document.querySelectorAll('.fade-in').forEach(el => {
    if (isInViewport(el)) {
      el.classList.add('visible');
    }
  });
};

window.addEventListener('scroll', onScroll);
window.addEventListener('load', onScroll);

// Dark mode toggle
const darkModeToggle = document.createElement('button');
darkModeToggle.textContent = '🌙';
darkModeToggle.setAttribute('aria-label', 'Toggle dark mode');
darkModeToggle.classList.add('dark-mode-toggle');
document.body.prepend(darkModeToggle);

darkModeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  if (document.body.classList.contains('dark-mode')) {
    darkModeToggle.textContent = '☀️';
  } else {
    darkModeToggle.textContent = '🌙';
  }
});

// Workshop calendar date selector enhancement (optional)
// The input type="date" is used, so native date picker is available on most browsers
