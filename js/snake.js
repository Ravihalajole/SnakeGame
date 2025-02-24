let score = document.querySelector('#score')
let scoreCount = 0;
let snakeLength = 0;
let i
let gameOverbool = false
function updateScore() {
    score.innerText = `score: ${scoreCount}`
}

function growSnake() {
        Game.createSnake(-Game.blockSize, -Game.blockSize)
        snakeLength += 1
}

function updateSnakeParts() {
    for (i = Game.snake.length - 1; i > 0; i--) {
        Game.snake[i].x = Game.snake[i - 1].x
        Game.snake[i].y = Game.snake[i - 1].y
    }
}

function isSnakeBite() {
   
        for (i = Game.snake.length - 1; i > 0; i--) {
            if ((Game.snake[0].x == Game.snake[i].x) && (Game.snake[0].y == Game.snake[i].y)) {
                gameOverbool = true
            }
        } 
}