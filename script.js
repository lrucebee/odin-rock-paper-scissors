let playerScore = 0;
let cpuScore = 0;
const scoreToWin = 5;

const rock = document.querySelector('.rock').value;
const paper = document.querySelector('.paper').value;
const scissors = document.querySelector('.scissors').value;

const choices = document.querySelectorAll('.choice');
const p1Div = document.querySelector('.player-choice-p1');
const p2Div = document.querySelector('.player-choice-p2');
const gameHeading = document.querySelector('.game-heading');
const gamePara = document.querySelector('.game-para');
const playerScoreText = document.querySelector('.player-score-p2');
const cpuScoreText = document.querySelector('.player-score-p1');
const choicesContainer = document.querySelector('.choices');
const resetButton = document.querySelector('.reset');

function startGame(e) {
  const playerSelection = this.value;
  const cpuSelection = getCpuSelection();
  const winningSelection = getWinningSelection(playerSelection, cpuSelection);

  displayPlayersSelection(cpuSelection, playerSelection);
  updateUI(playerSelection, cpuSelection, winningSelection);

  if (playerScore === scoreToWin || cpuScore === scoreToWin) {
    updateUiWinner(playerScore === scoreToWin);
  }
}

function getCpuSelection() {
  const randomNum = Math.floor(Math.random() * 3);
  if (randomNum === 0) return rock;
  else if (randomNum === 1) return paper;
  return scissors;
}

function getWinningSelection(player, cpu) {
  if (player === cpu) return 0;
  if (checkPlayerWin(player, cpu)) return player;
  return cpu;
}

function checkPlayerWin(player, cpu) {
  return (
    (player === rock && cpu === scissors) ||
    (player === paper && cpu === rock) ||
    (player === scissors && cpu === paper)
  );
}

function displayPlayersSelection(p1, p2) {
  p1Div.textContent = getSelectionIcon(p1);
  p2Div.textContent = getSelectionIcon(p2);
}

function getSelectionIcon(item) {
  if (item === rock) return '✊';
  if (item === paper) return '🖐';
  if (item === scissors) return '✌';
}

function updateUI(playerSel, cpuSel, winSel) {
  const isTied = !winSel;
  const didPlayerWin = playerSel === winSel;
  const losingSel = didPlayerWin ? cpuSel : playerSel;

  p1Div.classList.remove('player-win', 'player-lose');
  p2Div.classList.remove('player-win', 'player-lose');

  if (isTied) {
    gameHeading.textContent = 'Tied!';
    gamePara.textContent = `You both selected ${playerSel}`;
  } else {
    gamePara.textContent = `${winSel} beats ${losingSel}`;

    if (didPlayerWin) updateUiPlayerWin();
    else updateUiCpuWin();
  }
}

function updateUiPlayerWin() {
  gameHeading.textContent = 'You Scored!';
  playerScore++;
  playerScoreText.textContent = playerScore;
  p2Div.classList.toggle('player-win');
  p1Div.classList.toggle('player-lose');
}

function updateUiCpuWin() {
  gameHeading.textContent = 'Computer Scored!';
  cpuScore++;
  cpuScoreText.textContent = cpuScore;
  p1Div.classList.toggle('player-win');
  p2Div.classList.toggle('player-lose');
}

function updateUiWinner(didPlayerWonGame) {
  if (didPlayerWonGame) {
    gameHeading.textContent = 'You Won!';
    gamePara.textContent = '🎉🎉🎉🎉🎉🎉🎉';
  } else {
    gameHeading.textContent = 'You Lose!';
    gamePara.textContent = 'Better Luck Next Time';
  }
  toggleHideButtons();
}

function toggleHideButtons() {
  choicesContainer.classList.toggle('hide');
  resetButton.classList.toggle('hide');
}

function resetGame(e) {
  location.reload();
}

choices.forEach((choice) => choice.addEventListener('click', startGame));
resetButton.addEventListener('click', resetGame);
