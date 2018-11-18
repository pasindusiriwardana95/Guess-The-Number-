/*
Game functions:
$ player must guess a number between the min and the max
$ player gets only acertain amount of guesses
$ notify the player the remining guesses
$ notify the player the correct answer if he looses
$ let player choose to play again
*/

// game values
let min=1, max=10, win_num=getWinNum(min,max), guesses_left=3;

// UI Elements
const game = document.querySelector('#game'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessBtn = document.querySelector('#guess-btn'),
      guessInput = document.querySelector('#guess-input'),
      message = document.querySelector('.message');

// assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

//play again event listener
game.addEventListener('mousedown',function(e){
  if(e.target.className==='play-again'){
    window.location.reload();
  }
})

// listen for guess
guessBtn.addEventListener('click',function(){
  let guess = parseInt(guessInput.value);
  console.log(guess);

  // validate players input
  if(isNaN(guess) || guess<min || guess>max){
    setMessage(`please enter numbers between ${min} & ${max}`,'red');

  }

  // check if won
  if(guess === win_num){
    gameOver(true,`${win_num} is correct!`);
  }else {
    // if wrong
    guesses_left -= 1;
    if(guesses_left == 0){
      gameOver(false,`Game OVER! answer was ${win_num}`);
    }else {
      guessInput.style.borderColor = 'yellow';
      setMessage(`${guess} is not correct, you have only ${guesses_left} chances!`,'red');
      guessInput.value='';

    }

  }
});

function setMessage(msg,color){
  message.style.color=color;
  message.textContent=msg;
}

function gameOver(won,msg){
  let color;
  won===true?color='green':color='red';
  guessInput.disabled=true;
  guessInput.style.borderColor = color;
  message.style.color = color;
  setMessage(msg);

  //play again
  guessBtn.value='Play Again';
  guessBtn.className += 'play-again';

  // get the winning number
}

function getWinNum(min,max){
  return Math.floor(Math.random()*(max-min+1)+min);
}