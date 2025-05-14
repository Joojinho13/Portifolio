document.addEventListener("DOMContentLoaded", () => {
  const carousels = document.querySelectorAll(".carousel");

  carousels.forEach((carousel) => {
    const imagesContainer = carousel.querySelector(".carousel-images");
    const slides = Array.from(imagesContainer.children);
    const prevButton = carousel.querySelector(".prev");
    const nextButton = carousel.querySelector(".next");
    let currentIndex = 0;
    let isAnimating = false;

    function updateCarousel() {
      imagesContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    nextButton.addEventListener("click", () => {
      if (isAnimating) return;

      if (currentIndex === slides.length - 1) {
        isAnimating = true;

        const firstSlide = slides[0].cloneNode(true);
        imagesContainer.appendChild(firstSlide);
        currentIndex++;
        updateCarousel();

        imagesContainer.addEventListener(
          "transitionend",
          () => {
            imagesContainer.removeChild(firstSlide);
            imagesContainer.style.transition = "none";
            currentIndex = 0;
            updateCarousel();

            imagesContainer.offsetHeight; // Força reflow
            imagesContainer.style.transition = ""; // Reativa transição
            isAnimating = false;
          },
          { once: true }
        );
      } else {
        currentIndex = (currentIndex + 1) % slides.length;
        updateCarousel();
      }
    });

    prevButton.addEventListener("click", () => {
      if (isAnimating) return;

      if (currentIndex === 0) {
        isAnimating = true;

        const lastSlide = slides[slides.length - 1].cloneNode(true);
        imagesContainer.insertBefore(lastSlide, slides[0]);

        imagesContainer.style.transition = "none";
        currentIndex = 1;
        updateCarousel();

        imagesContainer.offsetHeight; // Força reflow
        imagesContainer.style.transition = "";

        currentIndex = 0;
        updateCarousel();

        imagesContainer.addEventListener(
          "transitionend",
          () => {
            imagesContainer.removeChild(lastSlide);
            imagesContainer.style.transition = "none";
            currentIndex = slides.length - 1;
            updateCarousel();

            imagesContainer.offsetHeight; // Força reflow
            imagesContainer.style.transition = "";
            isAnimating = false;
          },
          { once: true }
        );
      } else {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateCarousel();
      }
    });

    updateCarousel();
  });
});