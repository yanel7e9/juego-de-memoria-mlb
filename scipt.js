document.addEventListener('DOMContentLoaded', () => {
    const cards = [
        { id: 1, name: 'aaronjudge', img: 'aaron_judge.jpeg' },
        { id: 2, name: 'alexrodriguez', img: 'alex_rodriguez.jpeg' },
        { id: 3, name: 'barrybonds', img: 'barry_bonds.jpeg' },
        { id: 4, name: 'davidortiz', img: 'david_ortiz.jpeg' },
        { id: 5, name: 'derekjeter', img: 'derek_jeter.jpeg' },
        { id: 6, name: 'miketrout', img: 'mike_trout.jpeg' },
        { id: 7, name: 'mookiebetts', img: 'mookie_betts.jpeg' },
        { id: 8, name: 'sammysosa', img: 'sammy_sosa.jpeg' }
    ];

    const gameBoard = document.getElementById('gameBoard');
    const modalGameOver = document.getElementById('gameOverModal');
    const modalWinner = document.getElementById('winnerModal');
    const timeDisplay = document.getElementById('time');
    const restartGameOverBtn = document.getElementById('restartGameOverBtn');
    const closeGameOverBtn = document.getElementById('closeGameOverBtn');
    const restartWinnerBtn = document.getElementById('restartWinnerBtn');
    const closeWinnerBtn = document.getElementById('closeWinnerBtn');
    const closeButtons = document.querySelectorAll('.close');

    let cardsChosen = [];
    let cardsChosenId = [];
    let cardsWon = [];
    let countdown;

    // Initialize game
    function initializeGame() {
        cardsChosen = [];
        cardsChosenId = [];
        cardsWon = [];
        modalGameOver.style.display = 'none';
        modalWinner.style.display = 'none';
        timeDisplay.textContent = 60;
        clearInterval(countdown);
        generateBoard();
        countdown = setInterval(updateTime, 1000);
    }

    // Generate game board
    function generateBoard() {
        gameBoard.innerHTML = '';
        const gameCards = cards.concat(cards); // Duplicate cards for pairs
        gameCards.sort(() => 0.5 - Math.random()); // Shuffle cards
        gameCards.forEach((card, index) => {
            const cardElement = document.createElement('div');
            cardElement.classList.add('card');
            cardElement.dataset.id = index;

            const img = document.createElement('img');
            img.src = `images/${card.img}`;
            img.alt = card.name;
            img.dataset.id = index;

            cardElement.appendChild(img);
            cardElement.addEventListener('click', flipCard);
            gameBoard.appendChild(cardElement);
        });
    }

    // Flip card
    function flipCard() {
        const cardId = this.dataset.id;
        if (cardsChosenId.length === 2 || cardsChosenId.includes(cardId)) return; // Prevent more than two selections or double-clicking

        this.classList.add('flipped');
        cardsChosen.push(this.querySelector('img').alt);
        cardsChosenId.push(cardId);

        if (cardsChosen.length === 2) {
            setTimeout(checkForMatch, 500);
        }
    }

    // Check for card match
    function checkForMatch() {
        const cards = document.querySelectorAll('.card');
        const [optionOneId, optionTwoId] = cardsChosenId;

        if (cardsChosen[0] === cardsChosen[1]) {
            cardsWon.push(cardsChosen[0]);
            cards[optionOneId].removeEventListener('click', flipCard);
            cards[optionTwoId].removeEventListener('click', flipCard);
        } else {
            cards[optionOneId].classList.remove('flipped');
            cards[optionTwoId].classList.remove('flipped');
        }

        cardsChosen = [];
        cardsChosenId = [];

        if (cardsWon.length === cards.length / 2) {
            clearInterval(countdown);
            setTimeout(displayWinnerModal, 500);
        }
    }

    // Display Game Over modal
    function displayGameOverModal() {
        clearInterval(countdown);
        modalGameOver.style.display = 'block';
    }

    // Display Winner modal
    function displayWinnerModal() {
        modalWinner.style.display = 'block';
    }

    // Update timer
    function updateTime() {
        let currentTime = parseInt(timeDisplay.textContent);
        currentTime--;
        timeDisplay.textContent = currentTime;
        if (currentTime === 0) {
            clearInterval(countdown);
            setTimeout(displayGameOverModal, 500);
        }
    }

    // Event listeners for close buttons
    closeButtons.forEach(btn => btn.addEventListener('click', () => {
        modalGameOver.style.display = 'none';
        modalWinner.style.display = 'none';
    }));

    // Event listeners for restart buttons
    restartGameOverBtn.addEventListener('click', initializeGame);
    closeGameOverBtn.addEventListener('click', () => modalGameOver.style.display = 'none');
    restartWinnerBtn.addEventListener('click', initializeGame);
    closeWinnerBtn.addEventListener('click', () => modalWinner.style.display = 'none');

    // Initialize game when DOM is loaded
    initializeGame();
});
