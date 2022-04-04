// Now initialize the Audio:
const foodSound = new Audio("music/eatSound.wav");
const gameSound = new Audio("music/gameStart.wav");
const gameEnd = new Audio("music/gameEnd.wav");
const moveSound = new Audio("music/moveSound.wav");
// Direction of the snake:
let inputDir = { x: 0, y: 0 };

// Other Variables
let score = 0;
let speed = 10;
let lastPaintTime = 0;
let snakeArr = [{ x: 13, y: 15 }];
food = { x: 6, y: 7 }


// Game Functions
function main(cTime) {
    // cTime = Current Time 
    window.requestAnimationFrame(main);
    if ((cTime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = cTime;
    gameEngine();
    // console.log(cTime);
}

function isCollide(snake) {
    // If snake hit itself:
    for (let i = 2; i < snakeArr.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
    }
    if(snake[0].x >= 18 || snake[0].x <=0 || snake[0].y >= 18 || snake[0].y <=0){
        return true;
    }

    return false;
}

function gameEngine() {
    gameSound.play()
    // gameSound.muted = false;

    // Part 1: Updating the snake array & Food
    if (isCollide(snakeArr)) {
        gameEnd.play();
        gameSound.pause();
        inputDir = { x: 0, y: 0 };
        alert("Game Over!!");
        snakeArr = [{ x: 13, y: 15 }];
        gameSound.play();
        score = 0;
    }
    // If you have eaten the food, increment the food and score:
    if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
        foodSound.play();
        snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y });

        let a = 2;
        let b = 16;
        food = {
            x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random())
        }
    }

    // Move the snake:
    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i + 1] = { ...snakeArr[i] };
    }
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;




    // Part 2: Display the snake & Food
    board.innerHTML = "";
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement("div");
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;

        if (index === 0) {
            snakeElement.classList.add("head");

        }
        else {
            snakeElement.classList.add("snake");
        }
        board.appendChild(snakeElement);
    });

    // Display the
    foodElement = document.createElement("div");
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add("food")
    board.appendChild(foodElement);


}



// Main Logic

window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    inputDir = { x: 0, y: 1 }
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            inputDir.x = 0;
            inputDir.y = -1;
            break;

        case "ArrowDown":;
            inputDir.x = 0;
            inputDir.y = 1;
            break;

        case "ArrowLeft":
            inputDir.x = -1
            inputDir.y = 0;
            break;


        case "ArrowRight":;
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        default:
            break;
    }



});
