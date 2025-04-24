document.addEventListener("DOMContentLoaded", () => {
    const carousels = document.querySelectorAll(".carousel");
  
    carousels.forEach((carousel) => {
      const imagesContainer = carousel.querySelector(".carousel-images");
      const images = imagesContainer.querySelectorAll("img");
      const prevButton = carousel.querySelector(".prev");
      const nextButton = carousel.querySelector(".next");
      let currentIndex = 0;
  
      function updateCarousel() {
        imagesContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
      }
  
      nextButton.addEventListener("click", () => {
        currentIndex = (currentIndex + 1) % images.length;
        updateCarousel();
      });
  
      prevButton.addEventListener("click", () => {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        updateCarousel();
      });
  
      updateCarousel();
    });
  });
  