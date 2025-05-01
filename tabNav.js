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
