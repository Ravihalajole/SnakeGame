class Gameboard{
    constructor(){
        this.context=document.querySelector('canvas').getContext('2d')
        this.height=Math.min(window.innerHeight-5,window.innerWidth-5)
        document.querySelector('canvas').width = this.height;
        document.querySelector('canvas').height = this.height;
        this.blockSize=(this.height)/20
        this.snake=[]
        this.createSnake(this.height/2-this.blockSize/2,this.height/2-this.blockSize/2,'images/snakeface.png')
        this.createNewFruit()
    }
    clear(){
        this.context.clearRect(0,0,this.height,this.height)
    }
    createNewFruit(){
        this.fruit=new Component(Math.random()*(this.height-(this.blockSize*1.5)),Math.random()*(this.height-(this.blockSize*1.5)),this.blockSize*1.5,this.blockSize*1.5,'images/fruit1.png',this.context,'image')
    }
    createSnake(x,y,image='images/snakebody.png'){
        this.snake.push(new Component(x,y,this.blockSize,this.blockSize,image,this.context,'image'))
    }
}

let Game
let refreshInterval
let disableControls=false
let gameOver=document.querySelector('#gameOver')
let startPage=document.querySelector('#start-page')
let canvasContainer=document.querySelector('#canvas-container')
let shrinkFruit
let tempSpeedX
let tempSpeedY
let isPaused=false
let refreshRate=100
let gameOverAudio=new Audio('audio/game-over.mp3')
let gameBonusAudio=new Audio('audio/game-bonus1.mp3')


function startGame(){
    Game=new Gameboard()
    snakeSpeed=Math.floor((Game.blockSize/10)*9)
    shrinkFruit=Math.floor((Game.blockSize/5))
    refreshInterval=setInterval(()=>{
        if(!isPaused){
        updateGame()}
    },refreshRate)
}

function updateGame(){
    Game.clear()
    checkEatFruit()
    Game.fruit.draw()
    updateSnakeParts()
    Game.snake.forEach((block)=>{
        block.draw()
    })
    checkGameOver()
}

function checkGameOver(){
    isSnakeBite()
    if (Game.snake[0].top<0 || Game.snake[0].left<0 || Game.snake[0].bottom>Game.height || Game.snake[0].right>Game.height||gameOverbool){
        disableControls=true
        clearInterval(refreshInterval)
        gameOverAudio.play()
        gameOver.classList.remove('hide')
    }
}


function checkEatFruit(){
    if ((((Game.snake[0].bottom<Game.fruit.bottom)&&(Game.snake[0].bottom>=Game.fruit.top+shrinkFruit))||((Game.snake[0].top<Game.fruit.bottom-shrinkFruit)&&(Game.snake[0].top>=Game.fruit.top)))&&(((Game.snake[0].left<Game.fruit.right-shrinkFruit)&&(Game.snake[0].left>=Game.fruit.left))||((Game.snake[0].right>(Game.fruit.left+shrinkFruit))&&(Game.snake[0].right<=Game.fruit.right)))){
        Game.createNewFruit()
        gameBonusAudio.play()
        scoreCount++
        updateScore()
        growSnake()
    }
}

function restartGame(){
    startGame()
    gameOver.classList.add('hide')
    disableControls=false
    scoreCount=0
    updateScore()
    snakeLength=0
    firstMove=true
    gameOverbool=false
}
function initializeGame(){
    canvasContainer.classList.remove('hide')
    pausebtn.classList.remove('hide')
    scoreBox.classList.remove('hide')
    gameDiffBoard.classList.remove('hide')
    startPage.classList.add('hide')
    restartGame()
}
function goToHome(){
    startPage.classList.remove('hide')
    canvasContainer.classList.add('hide')
    pausebtn.classList.add('hide')
    gameOver.classList.add('hide')
    scoreBox.classList.add('hide')
    startPage.classList.remove('hide')
}


