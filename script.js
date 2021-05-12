
var sfx = {

    slap: new Howl({
        src:['./whack.mp3'],
        
    }),
    pop: new Howl({
        src:['./pop.mp3'],
        
    }),
    win: new Howl({
        src:['./youWin.mp3'],
        
    }),
    loss: new Howl({
        src:['./tryAgain.mp3'],
        
    })

};


var music = {

    song: new Howl({
        src:['./play.mp3'],

        autoplay: true
        
    })

}





const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');
const countdownBoard = document.querySelector('.countdown');
const startButton  = document.querySelector('.startButton');

let lastHole;
let timeUp = false;
let timeLimit = 20000;
let score = 0;
let countdown;


function pickRandomHole(holes){
    const randomHole = Math.floor(Math.random()* holes.length);
    const hole = holes[randomHole];
    if(hole === lastHole){
        return pickRandomHole(holes);
    }

    lastHole = hole;
    return hole;

}

function popOut(){
    const time = Math.random()*1300 + 400;
    const hole = pickRandomHole(holes);
    sfx.pop.play();
    hole.classList.add('up');
    setTimeout(function(){
        hole.classList.remove('up');
        if(!timeUp) popOut();
    }, time);
}

function startGame(){
    music.song.stop();
    countdown = timeLimit/1000;
    scoreBoard.textContent = 0;
    scoreBoard.style.display = 'block';
    countdownBoard.textContent = countdown ;
    timeUp = false;
    score = 0;
    popOut();
    setTimeout(function(){
        timeUp = true;
    
    }, timeLimit);

    startCountdown = setInterval(function(){
        countdown -= 1;
        countdownBoard.textContent = countdown;
    
        if(countdown < 0 || score == 10){
            countdown = 0;
    
            clearInterval(startCountdown); 
        }
    }, 1000)
}


startButton.addEventListener('click', startGame);


function whack(e){
    score++;
    sfx.slap.play();
    this.style.backgroundImage = 'url("mole2.png")';
    this.style.pointerEvents = 'none';
    setTimeout(() => {
        this.style.backgroundImage = 'url("mole1.png")';
        this.style.pointerEvents = 'all'
    }, 800);
    scoreBoard.textContent = score;
    level();
};

moles.forEach(mole => mole.addEventListener('click', whack));


function level(){

    if(score == 10){
        timeUp = true;
        scoreBoard.textContent = 'YOU WIN!';
        sfx.win.play();
        levelTwo();
    };
    
    if(score < 10 && countdown <= 2 ){
        timeUp = true;
        scoreBoard.textContent = 'TRY AGAIN!'; 
        sfx.loss.play();
        countdownBoard.textContent ='Sorry you loss try again!';
    }
};

function levelTwo(){
    gameWon =  setInterval(()=>{
        if(score == 10){
            scoreBoard.textContent = 'LEVEL 2!';
            countdownBoard.textContent ='congratulation you have advanced to Level 2!';
            clearInterval(gameWon); 
            }
        }, 3000);
};


