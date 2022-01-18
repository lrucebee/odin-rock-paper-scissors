function computerPlay() {
  const randomNum = Math.floor(Math.random() * 3);
  if (randomNum === 0) return 'Rock';
  else if (randomNum === 1) return 'Paper';
  return 'Scissors';
}

function capitalize(str) {
  const trimmedStr = str.trim();
  const firstLetterCap = trimmedStr[0].toUpperCase();
  const restStr = trimmedStr.slice(1).toLowerCase();
  return firstLetterCap + restStr;
}

function checkWin(yourItem, theirItem) {
  return (
    (yourItem === 'R' && theirItem === 'S') ||
    (yourItem === 'P' && theirItem === 'R') ||
    (yourItem === 'S' && theirItem === 'P')
  );
}

function playRound(playerSelection, computerSelection) {
  const playerItem = capitalize(playerSelection);
  const computerItem = capitalize(computerSelection);
  const isWinner = checkWin(playerItem[0], computerItem[0]);
  const declaration = isWinner
    ? `You Win! ${playerItem} beats ${computerItem}`
    : `You Lose! ${computerItem} beats ${playerItem}`;

  if (playerItem === computerItem) return 'Tied!';
  return declaration;
}

function game(games = 5) {
  for (let i = 0; i < games; i++) {
    const userSelection = prompt('Input: Rock | Paper | Scissors', '');
    const cpuSelection = computerPlay();
    console.log(playRound(userSelection, cpuSelection));
  }
}

game();
