let arrowKeys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight']
let keyStatus = {}
let restartBtn=document.querySelector('.restartbtn')
let pausebtn=document.querySelector('#pause')
let snakeDirection
let snakeSpeed
let firstMove=true
window.addEventListener('keydown', (e) => {
    keyPressed(e.key)
})
window.addEventListener('keyup', (e) => {
    keyStatus[e.key] = false
})
pausebtn.addEventListener('click',pauseGame)
restartBtn.addEventListener('click',restartGame)
function keyPressed(key) {
    if(key ==' '){
        pauseGame()
    }
    if (!keyStatus[key] && !disableControls) {

        keyStatus[key] = true


        if (key == arrowKeys[0]&&(snakeDirection==arrowKeys[2]||snakeDirection==arrowKeys[3]||firstMove)) {
            snakeDirection=arrowKeys[0]
            stopMove()
            Game.snake[0].speedY -= snakeSpeed
        }
        if (key == arrowKeys[1]&&(snakeDirection==arrowKeys[2]||snakeDirection==arrowKeys[3]||firstMove)) {
            snakeDirection=arrowKeys[1]
            stopMove()
            Game.snake[0].speedY += snakeSpeed
        }
        if (key == arrowKeys[2]&&(snakeDirection==arrowKeys[0]||snakeDirection==arrowKeys[1]||firstMove)) {
            snakeDirection=arrowKeys[2]
            stopMove()
            Game.snake[0].speedX -= snakeSpeed
        }
        if (key == arrowKeys[3]&&(snakeDirection==arrowKeys[0]||snakeDirection==arrowKeys[1]||firstMove)) {
            snakeDirection=arrowKeys[3]
            stopMove()
            Game.snake[0].speedX += snakeSpeed
        }
        if (firstMove){
            firstMove=false
        }
    }
}

function stopMove() {
    Game.snake[0].speedX = 0
    Game.snake[0].speedY = 0
}

