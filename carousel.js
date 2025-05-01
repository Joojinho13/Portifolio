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
      if (isAnimating) return; // Impede cliques múltiplos durante a animação

      if (currentIndex === slides.length - 1) {
        isAnimating = true;
        const firstSlide = slides[0].cloneNode(true); // Clona o primeiro slide
        imagesContainer.appendChild(firstSlide); // Adiciona o clone ao final
        currentIndex++;
        updateCarousel();

        // Espera a transição terminar para reposicionar e remover o clone
        imagesContainer.addEventListener("transitionend", () => {
          imagesContainer.removeChild(firstSlide); 
          imagesContainer.style.transition = 'none'; 
          currentIndex = 0;
          updateCarousel();

          // Força um reflow para aplicar a mudança sem transição
          imagesContainer.offsetHeight;
          imagesContainer.style.transition = ''; // Reativa a transição
          isAnimating = false;
        }, { once: true });
      } else {
        currentIndex = (currentIndex + 1) % slides.length;
        updateCarousel();
      }
    });

    prevButton.addEventListener("click", () => {
      if (isAnimating) return; // Impede cliques múltiplos durante a animação

      currentIndex = (currentIndex - 1 + slides.length) % slides.length;
      updateCarousel();
    });

    updateCarousel();
  });
});