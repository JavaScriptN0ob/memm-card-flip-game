// css class for different card image
const CARD_TECHS = [
  'html5',
  'css3',
  'js',
  'sass',
  'nodejs',
  'react',
  'linkedin',
  'heroku',
  'github',
  'aws'
];

// only list out some of the properties,
// add more when needed
const game = {
  score: 0,
  level: 1,
  timer: 60,
  timerDisplay: null,
  scoreDisplay: null,
  levelDisplay: null,
  timerInterval: null,
  startButton: document.querySelector('.game-stats__button'),
  gameBoard: document.querySelector('.game-board'),
  cardFlippedCount: 0,
  // card: document.querySelectorAll('.card'),
  timerBar: document.querySelector('.game-timer__bar'),
  succeededPair: 0,
  timer60Level1: null,
  timer60Level2: null,
  timer60Level3: null,
  // and much more
};

const bugList = {
  1: `handleCardFlip必须在startGame内运行，因为游戏开始时找不到带有game-board的元素，并且不能用解构赋值的方法解gameObj`,
  2: `timer async`
}

setGame();

/*******************************************
/     game process
/******************************************/
function setGame() {
  // register any element in your game object
  startGame();
}

function hack() {
  document.querySelectorAll('.card').forEach( (card)=> {card.classList.add('card--flipped')})
}

function startGame() {
  const { startButton, gameBoard } = game;
  startButton.addEventListener('click', () => {
    // console.log('game started');
    if(startButton.innerHTML === 'End Game') {
      handleGameOver();
      clearInterval(game.timer60Level1);
      clearInterval(game.timer60Level2);
      clearInterval(game.timer60Level3);
      game.succeededPair = 0;
      startButton.innerHTML = 'Start Game';
    }
    else {  
      // console.log(level);
      // console.log(score);
      startButton.innerHTML = 'End Game'
      firstLevel();
      handleCardFlip();
      updateTimerDisplay();
    }
  })
};

function restartGame() {
  const { startButton } = game;
  clearInterval(game.timer60Level1);
  clearInterval(game.timer60Level2);
  clearInterval(game.timer60Level3);
  game.succeededPair = 0;
  startButton.innerHTML = 'Start Game';
  resetGameStats();
  firstLevel();
}

function handleCardFlip() {
  let { score, level, timer, timerDisplay, cardFlippedCount } = game;
  let card = document.querySelectorAll('.card');
  card.forEach((card) => {
    card.addEventListener('click', () => {
      // console.log(100, cardFlippedCount)
      if(cardFlippedCount < 2) {
        if(card.classList.contains('card--flipped') && !card.classList.contains('succeeded')) {
          card.classList.remove('card--flipped');
          cardFlippedCount -= 1;
          // console.log(cardFlippedCount);
        } else {
          card.classList.add('card--flipped');
          cardFlippedCount += 1;
          // console.log(cardFlippedCount);
          // console.log('you flip this card');
          let cardArray = [];
          document.querySelectorAll('.card--flipped').forEach( (card) => {
            cardArray.push(card);
            if(cardArray.length>1) {
              // console.log(cardArray);
              // console.log(1, cardArray[0].classList[1])
              // console.log(2, cardArray[1].classList[1])
              if(cardArray[0].classList[1] === cardArray[1].classList[1]) {
                console.log('you success one pair of card, try the rest');
                updateScore();
                game.succeededPair += 1;
                jumpLevel();
                // console.log(game.succeededPair);
                // console.log(cardArray[0]);
                // console.log(cardArray[1]);
                cardArray[0].classList.add('succeeded');
                cardArray[1].classList.add('succeeded');
                cardArray[0].classList.remove('card--flipped');
                cardArray[1].classList.remove('card--flipped');
                // console.log(`you got ${score} points`);
                // console.log(`current score is ${game.score}`);
                // console.log(`current level is ${game.level}`);
                // console.log(`time left is ${game.timerDisplay}S`);
                cardFlippedCount = 0;
                cardArray = [];
                // console.log(1,cardArray)
              }
              else {
                // console.log(3, cardArray[0])
                // console.log(4, cardArray[1])
                let card1 = cardArray[0]
                let card2 = cardArray[1]
                let cardReFlipTimer = setTimeout(() => {
                  card1.classList.remove('card--flipped');
                  card2.classList.remove('card--flipped');
                  cardFlippedCount = 0;
                }, 1500)
                cardArray = [];
                // clearInterval(cardReFlipTimer);
              }
            }
          })
        }
      } else {
        console.log('reached max card flip number')
        if(card.classList.contains('card--flipped')) {
          card.classList.remove('card--flipped');
          cardFlippedCount -= 1;
          console.log(cardFlippedCount);
        }
      }
    })
  })
};

function nextLevel(succeededPair) {
  if(succeededPair === 0) {
    firstLevel();
    updateLevel();
  }
  else if(succeededPair === 2) {
    secondLevel();
    updateLevel();
  } else if(succeededPair === 10) {
    thirdLevel();
    updateLevel();
  }
  handleCardFlip();
  updateTimerDisplay();
}

function jumpLevel() {
  if(game.succeededPair === 2 || game.succeededPair === 10) {
    setTimeout(() => {
      nextLevel(game.succeededPair);
    }, 1500);
  }
}

function firstLevel() {
  const { gameBoard } = game;
  gameBoard.style = 'grid-template-columns: 1fr 1fr;'
      gameBoard.innerHTML = (
        `<div class="card css3" data-tech="css3">
          <div class="card__face card__face--front"></div>
          <div class="card__face card__face--back"></div>
        </div>
        <div class="card html5" data-tech="html5">
          <div class="card__face card__face--front"></div>
          <div class="card__face card__face--back"></div>
        </div>
        <div class="card css3" data-tech="css3">
          <div class="card__face card__face--front"></div>
          <div class="card__face card__face--back"></div>
        </div>
        <div class="card html5" data-tech="html5">
          <div class="card__face card__face--front"></div>
          <div class="card__face card__face--back"></div>
        </div>`
      );
}

function secondLevel() {
  const { gameBoard } = game;
  gameBoard.style = 'grid-template-columns: repeat(4, 1fr);'
    gameBoard.innerHTML = (
      `<div class="card heroku" data-tech="heroku">
          <div class="card__face card__face--front"></div>
          <div class="card__face card__face--back"></div>
        </div>
        <div class="card nodejs" data-tech="nodejs">
          <div class="card__face card__face--front"></div>
          <div class="card__face card__face--back"></div>
        </div>
        <div class="card css3" data-tech="css3">
          <div class="card__face card__face--front"></div>
          <div class="card__face card__face--back"></div>
        </div>
        <div class="card nodejs" data-tech="nodejs">
          <div class="card__face card__face--front"></div>
          <div class="card__face card__face--back"></div>
        </div>
        <div class="card heroku" data-tech="heroku">
          <div class="card__face card__face--front"></div>
          <div class="card__face card__face--back"></div>
        </div>
        <div class="card react" data-tech="react">
          <div class="card__face card__face--front"></div>
          <div class="card__face card__face--back"></div>
        </div>
        <div class="card css3" data-tech="css3">
          <div class="card__face card__face--front"></div>
          <div class="card__face card__face--back"></div>
        </div>
        <div class="card html5" data-tech="html5">
          <div class="card__face card__face--front"></div>
          <div class="card__face card__face--back"></div>
        </div>
        <div class="card sass" data-tech="sass">
          <div class="card__face card__face--front"></div>
          <div class="card__face card__face--back"></div>
        </div>
        <div class="card js" data-tech="js">
          <div class="card__face card__face--front"></div>
          <div class="card__face card__face--back"></div>
        </div>
        <div class="card sass" data-tech="sass">
          <div class="card__face card__face--front"></div>
          <div class="card__face card__face--back"></div>
        </div>
        <div class="card react" data-tech="react">
          <div class="card__face card__face--front"></div>
          <div class="card__face card__face--back"></div>
        </div>
        <div class="card js" data-tech="js">
          <div class="card__face card__face--front"></div>
          <div class="card__face card__face--back"></div>
        </div>
        <div class="card linkedin" data-tech="linkedin">
          <div class="card__face card__face--front"></div>
          <div class="card__face card__face--back"></div>
        </div>
        <div class="card linkedin" data-tech="linkedin">
          <div class="card__face card__face--front"></div>
          <div class="card__face card__face--back"></div>
        </div>
        <div class="card html5" data-tech="html5">
          <div class="card__face card__face--front"></div>
          <div class="card__face card__face--back"></div>
        </div>`
    );
}

function thirdLevel() {
  const { gameBoard } = game;
  gameBoard.style = 'grid-template-columns: repeat(6, 1fr);'
      gameBoard.innerHTML = (
        `<div class="card linkedin" data-tech="linkedin">
          <div class="card__face card__face--front"></div>
          <div class="card__face card__face--back"></div>
        </div>
        <div class="card css3" data-tech="css3">
          <div class="card__face card__face--front"></div>
          <div class="card__face card__face--back"></div>
        </div>
        <div class="card heroku" data-tech="heroku">
          <div class="card__face card__face--front"></div>
          <div class="card__face card__face--back"></div>
        </div>
        <div class="card css3" data-tech="css3">
          <div class="card__face card__face--front"></div>
          <div class="card__face card__face--back"></div>
        </div>
        <div class="card linkedin" data-tech="linkedin">
          <div class="card__face card__face--front"></div>
          <div class="card__face card__face--back"></div>
        </div>
        <div class="card sass" data-tech="sass">
          <div class="card__face card__face--front"></div>
          <div class="card__face card__face--back"></div>
        </div>
        <div class="card nodejs" data-tech="nodejs">
          <div class="card__face card__face--front"></div>
          <div class="card__face card__face--back"></div>
        </div>
        <div class="card js" data-tech="js">
          <div class="card__face card__face--front">
          </div><div class="card__face card__face--back"></div>
        </div>
        <div class="card js" data-tech="js">
          <div class="card__face card__face--front"></div>
          <div class="card__face card__face--back"></div>
        </div>
        <div class="card heroku" data-tech="heroku">
          <div class="card__face card__face--front"></div>
          <div class="card__face card__face--back"></div>
        </div>
        <div class="card html5" data-tech="html5">
          <div class="card__face card__face--front"></div>
          <div class="card__face card__face--back"></div>
        </div>
        <div class="card aws" data-tech="aws">
          <div class="card__face card__face--front"></div>
          <div class="card__face card__face--back"></div>
        </div>
        <div class="card react" data-tech="react">
          <div class="card__face card__face--front"></div>
          <div class="card__face card__face--back"></div>
        </div>
        <div class="card heroku" data-tech="heroku">
          <div class="card__face card__face--front"></div>
          <div class="card__face card__face--back"></div>
        </div>
        <div class="card react" data-tech="react">
          <div class="card__face card__face--front"></div>
          <div class="card__face card__face--back"></div>
        </div>
        <div class="card react" data-tech="react">
          <div class="card__face card__face--front"></div>
          <div class="card__face card__face--back"></div>
        </div>
        <div class="card sass" data-tech="sass">
          <div class="card__face card__face--front"></div>
          <div class="card__face card__face--back"></div>
        </div>
        <div class="card react" data-tech="react">
          <div class="card__face card__face--front"></div>
          <div class="card__face card__face--back"></div>
        </div>
        <div class="card nodejs" data-tech="nodejs">
          <div class="card__face card__face--front"></div>
          <div class="card__face card__face--back"></div>
        </div>
        <div class="card css3" data-tech="css3">
          <div class="card__face card__face--front"></div>
          <div class="card__face card__face--back"></div>
        </div>
        <div class="card html5" data-tech="html5">
          <div class="card__face card__face--front"></div>
          <div class="card__face card__face--back"></div>
        </div>
        <div class="card sass" data-tech="sass">
          <div class="card__face card__face--front"></div>
          <div class="card__face card__face--back"></div>
        </div>
        <div class="card sass" data-tech="sass">
          <div class="card__face card__face--front"></div>
          <div class="card__face card__face--back"></div>
        </div>
        <div class="card nodejs" data-tech="nodejs">
          <div class="card__face card__face--front"></div>
          <div class="card__face card__face--back"></div>
        </div>
        <div class="card html5" data-tech="html5">
          <div class="card__face card__face--front"></div>
          <div class="card__face card__face--back"></div>
        </div>
        <div class="card aws" data-tech="aws">
          <div class="card__face card__face--front"></div>
          <div class="card__face card__face--back"></div>
        </div>
        <div class="card js" data-tech="js">
          <div class="card__face card__face--front"></div>
          <div class="card__face card__face--back"></div>
        </div>
        <div class="card css3" data-tech="css3">
          <div class="card__face card__face--front"></div>
          <div class="card__face card__face--back"></div>
        </div>
        <div class="card js" data-tech="js">
          <div class="card__face card__face--front"></div>
          <div class="card__face card__face--back"></div>
        </div>
        <div class="card nodejs" data-tech="nodejs">
          <div class="card__face card__face--front"></div>
          <div class="card__face card__face--back"></div>
        </div>
        <div class="card linkedin" data-tech="linkedin">
          <div class="card__face card__face--front"></div>
          <div class="card__face card__face--back"></div>
        </div>
          <div class="card github" data-tech="github">
          <div class="card__face card__face--front"></div>
        <div class="card__face card__face--back"></div>
        </div>
          <div class="card html5" data-tech="html5">
          <div class="card__face card__face--front"></div>
        <div class="card__face card__face--back"></div>
        </div>
        <div class="card heroku" data-tech="heroku">
          <div class="card__face card__face--front"></div>
          <div class="card__face card__face--back"></div>
        </div>
        <div class="card github" data-tech="github">
          <div class="card__face card__face--front"></div>
          <div class="card__face card__face--back"></div>
        </div>
        <div class="card linkedin" data-tech="linkedin">
          <div class="card__face card__face--front"></div>
          <div class="card__face card__face--back"></div></div>
        </div>`
      );
}

function handleGameOver() {
  let { score, level } =game;
  alert(`your score is ${game.score}`);
  game.score = 0;
  game.level = 1;
  resetGameStats();
}

/*******************************************
/     UI update
/******************************************/
function updateScore() {
  let{ score } = game;
  score = game.level * game.timerDisplay;
  game.score += score;
  let scoreBoard = document.querySelector('.game-stats__score--value');
  scoreBoard.innerHTML = game.score;
}

function updateLevel() {
  let { level } = game;
  let levelDisplay = document.querySelector('.game-stats__level--value');
  levelDisplay.innerHTML = game.level += 1;
}

function resetGameStats() {
  let scoreBoard = document.querySelector('.game-stats__score--value');
  scoreBoard.innerHTML = game.score;
  let levelDisplay = document.querySelector('.game-stats__level--value');
  levelDisplay.innerHTML = game.level;
}

function updateTimerDisplay() {
  let { score, timer, timerDisplay, timerBar, timer60Level1, timer60Level2 } = game;
  // const timerBar = document.querySelector('.game-timer__bar');
  // let timer = 60;
  // timerBar = game.timerBar;
  // timer = game.timer;
  if(game.level === 1) { 
    clearInterval(game.timer60Level1);
    clearInterval(game.timer60Level2);
    clearInterval(game.timer60Level3);
    timer60Level1 = setInterval(() => {
      if(timer > 0) {
        timer -= 1;
        // console.log(`${timer/60*100}`);
        timerBar.style = `width: ${timer/60*100}%`;
        timerBar.innerHTML = `${timer}S`;
        game.timerDisplay = timer;
      } else {
        restartGame();
        handleGameOver();
        // nextLevel();
      }
    }, 1000);
    game.timer60Level1 = timer60Level1;
  }
  else if (game.level === 2) {
    clearInterval(game.timer60Level1);
    clearInterval(game.timer60Level2);
    clearInterval(game.timer60Level3);
    timer60Level2 = setInterval(() => {
      if(timer > 0) {
        timer -= 1;
        // console.log(`${timer/60*100}`);
        timerBar.style = `width: ${timer/60*100}%`;
        timerBar.innerHTML = `${timer}S`;
        game.timerDisplay = timer;
      } else {
        restartGame();
        handleGameOver();
        // nextLevel();
      }
    }, 1000);
    game.timer60Level2 = timer60Level2;
  }
  else if (game.level === 3) {
    clearInterval(game.timer60Level1);
    clearInterval(game.timer60Level2);
    clearInterval(game.timer60Level3);
    timer60Level3 = setInterval(() => {
      if(timer > 0) {
        timer -= 1;
        // console.log(`${timer/60*100}`);
        timerBar.style = `width: ${timer/60*100}%`;
        timerBar.innerHTML = `${timer}S`;
        game.timerDisplay = timer;
      } else {
        restartGame();
        handleGameOver();
        // nextLevel();
      }
    }, 1000);
    game.timer60Level3 = timer60Level3;
  }
}

/*******************************************
/     bindings
/******************************************/
function bindStartButton() {}

function unBindCardClick(card) {}

function bindCardClick() {}
