document.addEventListener('DOMContentLoaded', function () {
    // Seleção dos elementos da página
    const buttons = document.querySelectorAll('.openCardButton');
    const closeButtons = document.querySelectorAll('.closeButton');
    const infoCards = document.querySelectorAll('.infoCard');
    const backButton = document.querySelector('.login-button');
    const pageButtons = document.querySelectorAll('.buttonPartitura'); 
    const showHowToPlayButtons = document.querySelectorAll('.showHowToPlay'); 
    const overlay = document.getElementById('overlay'); // Seleciona o overlay

    // Adiciona evento de clique para os botões que abrem os cards
    buttons.forEach(button => {
        button.addEventListener('click', function () {
            const targetId = this.getAttribute('data-target');
            const targetCard = document.getElementById(targetId);
            targetCard.style.display = 'block';
            overlay.classList.add('active'); // Mostra o overlay
        });
    });

    // Adiciona evento de clique para os botões de fechar os cards
    closeButtons.forEach(button => {
        button.addEventListener('click', function () {
            const infoCard = this.closest('.infoCard');
            infoCard.style.display = 'none';
            overlay.classList.remove('active'); // Oculta o overlay
        });
    });

    // Fecha o card ao clicar fora dele
    window.addEventListener('click', function (event) {
        if (event.target.classList.contains('infoCard')) {
            event.target.style.display = 'none';
            overlay.classList.remove('active'); // Oculta o overlay
        }
    });

    // Redireciona para a página correta ao clicar nos botões
    pageButtons.forEach(button => {
        button.addEventListener('click', function () {
            const pageUrl = this.getAttribute('data-page');
            window.location.href = pageUrl;
        });
    });

    // Redireciona para a página de login
    backButton.addEventListener('click', () => {
        window.location.href = '../index.html';
    });

    // Abre o card de como jogar
    showHowToPlayButtons.forEach(button => {
        button.addEventListener('click', function () {
            const targetId = this.classList.contains('comoJogarPartitura') ? 'infoCardPartituraHowToPlay' : 'infoCardAlfabetoHowToPlay';
            const howToPlayCard = document.getElementById(targetId);
            howToPlayCard.style.display = 'block';
            overlay.classList.add('active'); // Mostra o overlay
        });
    });

    // Adiciona evento de clique para expandir e colapsar as dicas
    document.querySelectorAll('.instructions li').forEach(item => {
        item.addEventListener('click', function () {
            this.classList.toggle('active');
        });
    });

    // Fecha o overlay ao clicar nele
    overlay.addEventListener('click', function () {
        document.querySelectorAll('.infoCard').forEach(card => card.style.display = 'none');
        this.classList.remove('active');
    });
});
