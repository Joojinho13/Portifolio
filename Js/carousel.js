document.addEventListener("DOMContentLoaded", () => {
  const carousels = document.querySelectorAll(".carousel");

  carousels.forEach((carousel) => {
    const track = carousel.querySelector(".carousel-images");
    const slides = Array.from(track.children);
    const prevButton = carousel.querySelector(".carousel-button.prev");
    const nextButton = carousel.querySelector(".carousel-button.next");

    let currentIndex = 0;

    // Criar os dots (indicadores)
    const indicators = document.createElement("div");
    indicators.classList.add("carousel-indicators");
    slides.forEach((_, index) => {
      const dot = document.createElement("button");
      dot.classList.add("dot");
      if (index === 0) dot.classList.add("active");
      dot.setAttribute("aria-label", `Ir para slide ${index + 1}`);
      dot.addEventListener("click", () => goToSlide(index));
      indicators.appendChild(dot);
    });
    carousel.appendChild(indicators);
    const dots = Array.from(indicators.children);

    // Função para atualizar slides
    function updateSlidePosition() {
      track.style.transform = `translateX(-${currentIndex * 100}%)`;

      // Atualizar dots
      dots.forEach((dot, i) =>
        dot.classList.toggle("active", i === currentIndex)
      );

      // Pausar vídeos fora do slide atual
      slides.forEach((slide, i) => {
        if (slide.querySelector("iframe")) {
          const iframe = slide.querySelector("iframe");
          const message = '{"event":"command","func":"pauseVideo","args":""}';
          if (i !== currentIndex) {
            iframe.contentWindow.postMessage(message, "*");
          }
        }
      });
    }

    // Ir para um slide específico
    function goToSlide(index) {
      currentIndex = (index + slides.length) % slides.length; // Loop infinito
      updateSlidePosition();
    }

    // Botões de navegação
    prevButton.addEventListener("click", () => goToSlide(currentIndex - 1));
    nextButton.addEventListener("click", () => goToSlide(currentIndex + 1));

    // Navegação por teclado
    carousel.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") goToSlide(currentIndex - 1);
      if (e.key === "ArrowRight") goToSlide(currentIndex + 1);
    });
    carousel.setAttribute("tabindex", "0"); // Permitir foco no teclado

    // Swipe para mobile
    let startX = 0;
    let endX = 0;

    track.addEventListener("touchstart", (e) => {
      startX = e.touches[0].clientX;
    });

    track.addEventListener("touchend", (e) => {
      endX = e.changedTouches[0].clientX;
      if (startX - endX > 50) goToSlide(currentIndex + 1); // swipe left
      if (endX - startX > 50) goToSlide(currentIndex - 1); // swipe right
    });

    // Iniciar
    updateSlidePosition();
  });
});
