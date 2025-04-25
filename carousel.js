document.addEventListener("DOMContentLoaded", () => {
  const carousels = document.querySelectorAll(".carousel");

  carousels.forEach((carousel) => {
    const imagesContainer = carousel.querySelector(".carousel-images");

    // Seleciona todos os elementos filhos como slides (img, div com vídeo, etc.)
    const slides = Array.from(imagesContainer.children);

    const prevButton = carousel.querySelector(".prev");
    const nextButton = carousel.querySelector(".next");
    let currentIndex = 0;

    function updateCarousel() {
      imagesContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    nextButton.addEventListener("click", () => {
      currentIndex = (currentIndex + 1) % slides.length;
      updateCarousel();
    });

    prevButton.addEventListener("click", () => {
      currentIndex = (currentIndex - 1 + slides.length) % slides.length;
      updateCarousel();
    });

    updateCarousel();
  });
});
