const startButton = document.querySelector('.startButton');
const startScreen = document.querySelector('.startScreen');
const endScreen = document.querySelector('.endScreen');
const elem = document.querySelector('.element');
const basket = document.querySelector('.basket');
const scoreDisplay = document.querySelector('.score');
const helthBar = document.querySelector('.helthBar');
let score = 0;
let health = 3; 
let fall; 

startButton.addEventListener('click', () => {
    resetGame();
    startGame();
});

function startGame() {
    startScreen.style.display = 'none';
    endScreen.style.display = 'none';
    elem.style.display = 'flex';
    moveMentOfBasket();
    spawnElem();
    gravity();
}

function resetGame() {
    score = 0;
    health = 3; 
    scoreDisplay.textContent = `Score: ${score}`;
    helthBar.innerHTML = health + 'x' + '<span id="health3" class="material-symbols-outlined">favorite</span>';
    clearInterval(fall); 
}

function moveMentOfBasket() {
    let position = 40;
    document.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowLeft' || event.key === 'a') {
            if (position > 0) {
                position -= 5;
                basket.style.marginLeft = position + '%';
            }
        } else if (event.key === 'ArrowRight' || event.key === 'd') {
            if (position < 90) {
                position += 5;
                basket.style.marginLeft = position + '%';
            }
        }
    });
}

function spawnElem() {
    let position = Math.floor(Math.random() * 91);
    elem.style.marginLeft = `calc(${position}% - 10px)`;
    elem.style.marginTop = '0px';
}

function gravity() {
    let position = 0;
    let fallSpeed = 2;

    fall = setInterval(() => {
        const elemRect = elem.getBoundingClientRect();
        const basketRect = basket.getBoundingClientRect();

        if (position < window.innerHeight) {
            position += fallSpeed;
            elem.style.top = position + 'px';

            if (elemRect.bottom >= basketRect.top && elemRect.left < basketRect.right && elemRect.right > basketRect.left) {
                clearInterval(fall);
                score++;
                fallSpeed = Math.min(fallSpeed + 0.5, 7);
                scoreDisplay.textContent = `Score: ${score}`;
                spawnElem();
                gravity();
            }
        } else {
            position = 0;
            elem.style.top = position + 'px';

            if (health < 0) {
                endGame();
            } else {
                spawnElem();
                gravity();

                health--;
                helthBar.innerHTML = health + 'x' + '<span id="health3" class="material-symbols-outlined">favorite</span>';
            }
        }
    }, 10);
}

function endGame() {
    clearInterval(fall);
    endScreen.style.display = 'flex';
    document.querySelector('.finalScore').textContent = `Score: ${score}`;
}
