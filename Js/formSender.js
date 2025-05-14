document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  const popup = document.getElementById("popupSuccess");
  const closeBtn = document.getElementById("closePopup");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const action = form.getAttribute("action");

    try {
      const response = await fetch(action, {
        method: "POST",
        body: formData,
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        form.reset();
        popup.classList.remove("hidden");
      } else {
        alert("Erro ao enviar o formulário. Tente novamente.");
      }
    } catch (error) {
      alert("Erro de conexão. Tente novamente mais tarde.");
    }
  });

  closeBtn.addEventListener("click", () => {
    popup.classList.add("hidden");
  });
});