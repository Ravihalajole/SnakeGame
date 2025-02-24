class Gameboard{
    constructor(){
        this.context=document.querySelector('canvas').getContext('2d')
        this.height=Math.min(window.innerHeight,window.innerWidth)
        document.querySelector('canvas').width = this.height;
        document.querySelector('canvas').height = this.height;
        this.blockSize=(this.height)/20
        this.snake=[]
        this.createSnake(this.height/2-this.blockSize/2,this.height/2-this.blockSize/2,'images/snakeface.png')
        this.createNewFruit()
        this.background=new Component(0,0,this.height,this.height,'images/bg23.jpg',this.context,'image')
    }
    clear(){
        this.context.clearRect(0,0,this.height,this.height)
    }
    createNewFruit(){
        this.fruit=new Component(Math.random()*(this.height-(this.blockSize*2)),Math.random()*(this.height-(this.blockSize*2)),this.blockSize*1.5,this.blockSize*1.5,'images/fruit7.png',this.context,'image')
    }
    createSnake(x,y,image='images/snakebody.png'){
        this.snake.push(new Component(x,y,this.blockSize,this.blockSize,image,this.context,'image'))
    }
}

let Game;
let refreshInterval;
let disableControls=false
let gameOver=document.querySelector('#gameOver')
let shrinkFruit;
let tempSpeedX
let tempSpeedY
let isPaused=false
let gameOverAudio=new Audio('audio/game-over.mp3')
let gameBonusAudio=new Audio('audio/game-bonus1.mp3')
window.addEventListener('DOMContentLoaded',startGame)

function startGame(){
    Game=new Gameboard()
    snakeSpeed=Math.floor((Game.blockSize/10)*9)
    shrinkFruit=Math.floor((Game.blockSize/5))
    refreshInterval=setInterval(()=>{
        if(!isPaused){
        updateGame()}
    },100)
}

function updateGame(){
    Game.clear()
    Game.background.draw()
    Game.snake.forEach((block)=>{
        block.draw()
    })
    checkEatFruit()
    Game.fruit.draw()
    checkGameOver()
    updateSnakeParts()
}

function checkGameOver(){
    isSnakeBite()
    if (Game.snake[0].top<0 || Game.snake[0].left<0 || Game.snake[0].bottom>Game.height || Game.snake[0].right>Game.height||gameOverbool){
        disableControls=true
        clearInterval(refreshInterval)
        gameOverAudio.play()
        gameOver.style.display='flex'
        pausebtn.style.display='none'
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
    gameOver.style.display='none'
    disableControls=false
    scoreCount=0
    snakeLength=0
    firstMove=true
    gameOverbool=false
    pausebtn.style.display='block'
}

function pauseGame(){
    if(!isPaused){
    disableControls=true
    tempSpeedX=Game.snake[0].speedX
    tempSpeedY=Game.snake[0].speedY
    stopMove()
    isPaused=true}
    else if(isPaused){
        disableControls=false
    Game.snake[0].speedX=tempSpeedX
    Game.snake[0].speedY=tempSpeedY
    isPaused=false
    }
}
