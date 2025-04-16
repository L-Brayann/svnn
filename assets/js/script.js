function setupSlider(sliderClass, slidesClass, indicatorsClass) {
    let slideIndex = 0;
    const slider = document.querySelector(sliderClass);
    const slides = document.querySelectorAll(`${slidesClass} .slide`);
    const slidesWrapper = document.querySelector(slidesClass);
    const indicatorContainer = document.querySelector(indicatorsClass);
  
    function showSlides() {
      if (slideIndex >= slides.length) slideIndex = 0;
      if (slideIndex < 0) slideIndex = slides.length - 1;
      slidesWrapper.style.transform = `translateX(-${slideIndex * 100}%)`;
  
      indicatorContainer.innerHTML = "";
      slides.forEach((_, index) => {
        let indicator = document.createElement("span");
        indicator.classList.add("indicator");
        if (index === slideIndex) indicator.classList.add("active");
        indicator.onclick = () => {
          slideIndex = index;
          showSlides();
        };
        indicatorContainer.appendChild(indicator);
      });
    }
  
    function plusSlides(n) {
      slideIndex += n;
      showSlides();
    }
  
    function autoSlides() {
      plusSlides(1);
    }
  
    // Eventos de arraste/touch
    let startX = 0;
    let isDragging = false;
  
    slider.addEventListener("mousedown", (e) => {
      isDragging = true;
      startX = e.clientX;
    });
  
    slider.addEventListener("mousemove", (e) => {
      if (!isDragging) return;
      let diff = e.clientX - startX;
      if (Math.abs(diff) > 50) {
        if (diff < 0) plusSlides(1);
        else plusSlides(-1);
        isDragging = false;
      }
    });
  
    slider.addEventListener("mouseup", () => isDragging = false);
    slider.addEventListener("mouseleave", () => isDragging = false);
  
    slider.addEventListener("touchstart", (e) => {
      startX = e.touches[0].clientX;
      isDragging = true;
    });
  
    slider.addEventListener("touchmove", (e) => {
      if (!isDragging) return;
      let diff = e.touches[0].clientX - startX;
      if (Math.abs(diff) > 50) {
        if (diff < 0) plusSlides(1);
        else plusSlides(-1);
        isDragging = false;
      }
    });
  
    slider.addEventListener("touchend", () => isDragging = false);
  
    showSlides();
    setInterval(autoSlides, 8000);
  }
  
  // Inicializar os dois sliders
  setupSlider(".slider-1", ".slides-1", ".indicators-1");
  setupSlider(".slider-2", ".slides-2", ".indicators-2");
  