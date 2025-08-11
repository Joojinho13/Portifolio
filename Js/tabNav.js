// Novo tabNav.js com suporte a hash e histórico
document.addEventListener("DOMContentLoaded", () => {
    const tabButtons = document.querySelectorAll(".tab-button");
    const tabContents = document.querySelectorAll(".tab-content");
    const underline = document.querySelector(".tab-underline");
    const mobileMenu = document.getElementById("mobileMenu");
    const hamburgerBtn = document.getElementById("hamburgerBtn");

    // Função para ativar uma aba pelo ID
    function activateTab(tabId, updateURL = true) {
        // Atualiza estado visual das abas
        tabButtons.forEach(btn => {
            btn.classList.toggle("active", btn.dataset.tab === tabId);
            btn.setAttribute("aria-selected", btn.dataset.tab === tabId);
        });

        // Mostra/esconde conteúdos
        tabContents.forEach(content => {
            content.classList.toggle("active", content.id === tabId);
        });

        // Move underline (apenas desktop)
        const activeBtn = document.querySelector(`.tab-nav .tab-button[data-tab="${tabId}"]`);
        if (activeBtn && underline) {
            underline.style.width = `${activeBtn.offsetWidth}px`;
            underline.style.left = `${activeBtn.offsetLeft}px`;
        }

        // Fecha menu mobile se estiver aberto
        if (mobileMenu.classList.contains("active")) {
            mobileMenu.classList.remove("active");
        }

        // Atualiza URL com hash sem recarregar página
        if (updateURL) {
            history.pushState({ tab: tabId }, "", `#${tabId}`);
        }
    }

    // Detecta clique em botões
    tabButtons.forEach(button => {
        button.addEventListener("click", () => {
            activateTab(button.dataset.tab);
        });
    });

    // Botão hambúrguer
    hamburgerBtn?.addEventListener("click", () => {
        mobileMenu.classList.toggle("active");
    });

    // Detecta navegação pelo botão "voltar" ou hash direto
    window.addEventListener("popstate", (event) => {
        const tabId = event.state?.tab || location.hash.replace("#", "") || "hero";
        activateTab(tabId, false);
    });

    // Ao carregar, verifica se tem hash na URL
    const initialTab = location.hash.replace("#", "") || "hero";
    activateTab(initialTab, false);

    // Ajusta underline na primeira carga
    window.addEventListener("resize", () => {
        const activeBtn = document.querySelector(".tab-nav .tab-button.active");
        if (activeBtn && underline) {
            underline.style.width = `${activeBtn.offsetWidth}px`;
            underline.style.left = `${activeBtn.offsetLeft}px`;
        }
    });
});
