document.addEventListener("DOMContentLoaded", () => {
  const tabButtons = document.querySelectorAll('.tab-button');
  const tabContents = document.querySelectorAll('.tab-content');
  const underline = document.querySelector('.tab-underline');

  function moveUnderline(button) {
    const rect = button.getBoundingClientRect();
    const parentRect = button.parentElement.getBoundingClientRect();

    underline.style.width = `${rect.width}px`;
    underline.style.left = `${rect.left - parentRect.left}px`;
  }

  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      tabButtons.forEach(btn => btn.classList.remove('active'));
      tabContents.forEach(content => content.classList.remove('active'));

      button.classList.add('active');
      document.getElementById(button.dataset.tab).classList.add('active');
      moveUnderline(button);
    });
  });

  // Inicializa underline na aba ativa
  const activeTab = document.querySelector('.tab-button.active');
  if (activeTab) moveUnderline(activeTab);
});

// Menu Hamburguer (Mobile)
document.addEventListener("DOMContentLoaded", () => {
  const hamburgerBtn = document.getElementById("hamburgerBtn");
  const mobileMenu = document.getElementById("mobileMenu");

  hamburgerBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("active");
  });

  // Fechar menu após clicar em uma aba
  const mobileButtons = mobileMenu.querySelectorAll(".tab-button");
  mobileButtons.forEach(button => {
    button.addEventListener("click", () => {
      mobileMenu.classList.remove("active");
    });
  });
});