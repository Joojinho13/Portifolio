// Alternar preview do PDF
document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("togglePreview");
  const pdfPreview = document.getElementById("pdfPreview");

  if (toggleBtn && pdfPreview) {
    toggleBtn.addEventListener("click", () => {
      pdfPreview.classList.toggle("hidden");
      toggleBtn.textContent = pdfPreview.classList.contains("hidden")
        ? "Mostrar Preview"
        : "Ocultar Preview";
    });
  }
});
