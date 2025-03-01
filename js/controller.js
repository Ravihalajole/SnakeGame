let arrowKeys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight']
let keyStatus = {}
let restartBtn=document.querySelector('#restartbtn')
let startGamebtn=document.querySelector('#start-game')
let pausebtn=document.querySelector('#pause')
let snakeDirection
let snakeSpeed
let firstMove=true
let upBtn=document.querySelector('#upbtn')
let leftBtn=document.querySelector('#leftbtn')
let rightBtn=document.querySelector('#rightbtn')
let downBtn=document.querySelector('#downbtn')
let touchControls=document.querySelector('#touchCtrls')
let controlPad=document.querySelector('#controlPad')
let difficulty=document.querySelectorAll('.diff-radio')
let gameDiffBoard=document.querySelector('#gameDiffBoard')
let gameTitle=document.querySelector('#gameTitle')
let homeBtn=document.querySelector('#homebtn')

window.addEventListener('keydown', (e) => {
    keyPressed(e.key)
})
window.addEventListener('keyup', (e) => {
    keyStatus[e.key] = false
})
pausebtn.addEventListener('click',pauseGame)
restartBtn.addEventListener('click',restartGame)
startGamebtn.addEventListener('click',initializeGame)
homeBtn.addEventListener('click',goToHome)

difficulty.forEach((radio)=>{
    radio.addEventListener('click',()=>{
        refreshRate=radio.value
    })
})
upBtn.addEventListener('click',()=>{
    keyPressed(arrowKeys[0])
    keyStatus[arrowKeys[0]] = false
})
downBtn.addEventListener('click',()=>{
    keyPressed(arrowKeys[1])
    keyStatus[arrowKeys[1]] = false
})
leftBtn.addEventListener('click',()=>{
    keyPressed(arrowKeys[2])
    keyStatus[arrowKeys[2]] = false
})
rightBtn.addEventListener('click',()=>{
    keyPressed(arrowKeys[3])
    keyStatus[arrowKeys[3]] = false
})

touchControls.addEventListener('click',handleTouchCtrls)

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

function pauseGame(){
    if(!isPaused){
    disableControls=true
    tempSpeedX=Game.snake[0].speedX
    tempSpeedY=Game.snake[0].speedY
    stopMove()
    pausebtn.textContent='Resume'
    isPaused=true}
    else if(isPaused){
    disableControls=false
    Game.snake[0].speedX=tempSpeedX
    Game.snake[0].speedY=tempSpeedY
    isPaused=false
    pausebtn.textContent='Pause'
    }
}

function handleTouchCtrls(){
    controlPad.classList.toggle('hide')
}