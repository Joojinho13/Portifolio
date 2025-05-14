document.addEventListener("DOMContentLoaded", () => {
  const tabButtons = document.querySelectorAll('.tab-button');
  const tabContents = document.querySelectorAll('.tab-content');
  const underline = document.querySelector('.tab-underline');

  function moveUnderline(button) {
  const rect = button.getBoundingClientRect();
  const parentRect = button.parentElement.getBoundingClientRect();

  const newLeft = rect.left - parentRect.left;
  const newWidth = rect.width;

  // Continua visível durante a transição
  underline.style.transform = `translateX(${newLeft}px)`;
  underline.style.width = `${newWidth}px`;
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
    if (mobileMenu.classList.contains("active")) {
      mobileMenu.classList.remove("active");
      mobileMenu.classList.add("closing");

      // Trocar ícone para hamburguer (☰)
      hamburgerBtn.innerHTML = "&#9776;";
      hamburgerBtn.setAttribute("aria-label", "Abrir menu");

      setTimeout(() => {
        mobileMenu.classList.remove("closing");
      }, 300); // tempo da transição
    } else {
      mobileMenu.classList.add("active");

      // Trocar ícone para X (✕)
      hamburgerBtn.innerHTML = "&times;";
      hamburgerBtn.setAttribute("aria-label", "Fechar menu");
    }
  });

  // Fechar menu após clicar em uma aba
  const mobileButtons = mobileMenu.querySelectorAll(".tab-button");
  mobileButtons.forEach(button => {
    button.addEventListener("click", () => {
      if (mobileMenu.classList.contains("active")) {
        mobileMenu.classList.remove("active");
        mobileMenu.classList.add("closing");

        // Voltar ícone para hambúrguer
        hamburgerBtn.innerHTML = "&#9776;";
        hamburgerBtn.setAttribute("aria-label", "Abrir menu");

        setTimeout(() => {
          mobileMenu.classList.remove("closing");
        }, 300);
      }
    });
  });
});
