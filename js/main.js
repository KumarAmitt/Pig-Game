let scores;
let roundScore;
let activePlayer;
let gamePlaying;

// init function
function init() {
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  gamePlaying = true;

  document.querySelector('.dice').style.display = 'none';

  document.getElementById('score-0').textContent = '0';
  document.getElementById('score-1').textContent = '0';
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';
  document.getElementById('name-0').textContent = 'Player 1';
  document.getElementById('name-1').textContent = 'Player 2';
  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');
  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('active');

  document.querySelector('.player-0-panel').classList.add('active');
}

// Next Player function
function nextPlayer() {
  activePlayer = activePlayer === 0 ? 1 : 0;
  roundScore = 0;

  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';

  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');

  document.querySelector('.dice').style.display = 'none';
}

init();

// ROLL DICE BUTTON
document.querySelector('.btn-roll').addEventListener('click', () => {
  if (gamePlaying) {
    // 1. Random Number
    const dice = Math.floor(Math.random() * 6 + 1);

    // 2. Display the result
    const diceDOM = document.querySelector('.dice');
    diceDOM.style.display = 'block';
    diceDOM.src = `img/dice-${dice}.png`;

    // 3. Update the round score IF the rolled number was NOT a 1
    if (dice !== 1) {
      // Add score
      roundScore += dice;
      document.querySelector(`#current-${activePlayer}`).textContent = roundScore;
    } else {
      // Next Player
      nextPlayer();
    }
  }
});

// HOLD BUTTON
document.querySelector('.btn-hold').addEventListener('click', () => {
  if (gamePlaying) {
    // Ad CURRENT score to GLOBAL score
    scores[activePlayer] += roundScore;

    // Update the UI

    document.querySelector(`#score-${activePlayer}`).textContent = scores[activePlayer];

    // Check if player won the game
    if (scores[activePlayer] >= 20) {
      document.querySelector(`#name-${activePlayer}`).textContent = 'Winner!';
      document.querySelector('.dice').style.display = 'none';
      document.querySelector(`.player-${activePlayer}-panel`).classList.add('winner');
      document.querySelector(`.player-${activePlayer}-panel`).classList.remove('active');
      gamePlaying = false;
    } else {
      nextPlayer();
    }
  }
});

document.querySelector('.btn-new').addEventListener('click', init);
