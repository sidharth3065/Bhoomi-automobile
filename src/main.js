import "./style.css";

// Setup Learn More Buttons
document.querySelectorAll('.learn-more-btn').forEach(button => {
  button.addEventListener('click', () => {
    const targetId = button.getAttribute('data-target');
    const content = document.getElementById(targetId);
    
    
    if (content) {
      content.classList.toggle('hidden');
      
      if (content.classList.contains('hidden')) {
        button.textContent = 'Learn More →';
      } else {
        button.textContent = 'Show Less ↑';
      }
    }
  });
});

// Carousel Logic
const track = document.getElementById('carousel-track');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const dotsContainer = document.getElementById('carousel-dots');

if (track && prevBtn && nextBtn && dotsContainer) {
  const slides = Array.from(track.children);
  let currentIndex = 0;
  let slidesPerView = 1;
  let maxIndex = 0;
  let autoPlayInterval;

  // Calculate items per view based on window width
  const updateSlidesPerView = () => {
    if (window.innerWidth >= 768) {
      slidesPerView = 3;
    } else {
      slidesPerView = 1;
    }
    maxIndex = Math.max(0, slides.length - slidesPerView);
    // Ensure current index is valid after resize
    currentIndex = Math.min(currentIndex, maxIndex);
    updateCarousel();
    createDots();
  };

  const createDots = () => {
    dotsContainer.innerHTML = '';
  
    const dotCount = maxIndex + 1;

    for (let i = 0; i < dotCount; i++) {
      const dot = document.createElement('button');
      dot.className = `w-3 h-3 rounded-full transition-all duration-300 ${i === currentIndex ? 'bg-blue-600 w-8' : 'bg-gray-300 hover:bg-gray-400'}`;
      dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
      dot.addEventListener('click', () => {
        currentIndex = i;
        updateCarousel();
        resetAutoPlay();
      });
      dotsContainer.appendChild(dot);
    }
  };

  const updateCarousel = () => {
    // 100% / slidesPerView * currentIndex
    const percentage = 100 / slidesPerView;
    track.style.transform = `translateX(-${currentIndex * percentage}%)`;

    // Update dots
    const dots = Array.from(dotsContainer.children);
    dots.forEach((dot, index) => {
        if (index === currentIndex) {
            dot.classList.remove('bg-gray-300', 'hover:bg-gray-400', 'w-3');
            dot.classList.add('bg-blue-600', 'w-8');
        } else {
            dot.classList.add('bg-gray-300', 'hover:bg-gray-400', 'w-3');
            dot.classList.remove('bg-blue-600', 'w-8');
        }
    });
  };

  const nextSlide = () => {
    if (currentIndex < maxIndex) {
      currentIndex++;
    } else {
      currentIndex = 0; // Infinite loop effect
    }
    updateCarousel();
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      currentIndex--;
    } else {
      currentIndex = maxIndex;
    }
    updateCarousel();
  };

  const resetAutoPlay = () => {
    clearInterval(autoPlayInterval);
    autoPlayInterval = setInterval(nextSlide, 5000);
  };

  // Event Listeners
  nextBtn.addEventListener('click', () => {
    nextSlide();
    resetAutoPlay();
  });

  prevBtn.addEventListener('click', () => {
    prevSlide();
    resetAutoPlay();
  });

  // Initial Setup
  window.addEventListener('resize', updateSlidesPerView);
  updateSlidesPerView();
  resetAutoPlay();
}
