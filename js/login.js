document.addEventListener('DOMContentLoaded', () => {
    const input = document.querySelector('.login_input');
    const button = document.querySelector('.login_button');
    const form = document.querySelector('.login_form');
    const sobreButton = document.querySelector('.sobre');
    const infoCard = document.getElementById('infoCardSobre');
    const closeButton = document.querySelector('.closeButton');

    // Função para validar a entrada do usuário e habilitar o botão de login
    const validateInput = (event) => {
        const target = event.target;
        if (target.value.length > 2) {
            button.removeAttribute('disabled');
        } else {
            button.setAttribute('disabled', 'disabled');
        }
    };

    // Função para lidar com o envio do formulário de login
    const handleSubmit = (event) => {
        event.preventDefault();
        const playerName = input.value;
        localStorage.setItem('player', playerName);
        window.location.href = './pages/pageGames.html';
    };

    // Adiciona eventos para validação da entrada e envio do formulário
    input.addEventListener('input', validateInput);
    form.addEventListener('submit', handleSubmit);

    // Abrir o card de informações
    sobreButton.addEventListener('click', () => {
        infoCard.classList.remove('hidden');
    });

    // Fechar o card de informações
    closeButton.addEventListener('click', () => {
        infoCard.classList.add('hidden');
    });
});
