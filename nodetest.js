const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function playGame(player1, player2) {
  // determine who is older and who starts first
  const [olderPlayer, youngerPlayer] = player1.age > player2.age ? [player1, player2] : [player2, player1];
  let currentPlayer = olderPlayer;

  // initialize players' positions
  player1.pos = parseInt(player1.pos);
  player2.pos = parseInt(player2.pos);

  while (true) {
    // calculate optimal move for current player
    const optimalMove = currentPlayer === olderPlayer ? Math.min(2, youngerPlayer.pos - currentPlayer.pos) : Math.min(2, currentPlayer.pos - youngerPlayer.pos);
    const newPosition = currentPlayer.pos + optimalMove;

    // check if the move is valid
    if (newPosition === youngerPlayer.pos || newPosition < 1 || newPosition > 100) {
      return currentPlayer === player1 ? 0 : 1;
    }

    // update player's position and switch turns
    currentPlayer.pos = newPosition;
    currentPlayer = currentPlayer === player1 ? player2 : player1;

    // check if the game has ended
    if (currentPlayer.pos === youngerPlayer.pos) {
      return currentPlayer === player1 ? 1 : 0;
    }
  }
}

rl.question('Enter number of test cases: ', (t) => {
  for (let i = 0; i < t; i++) {
    rl.question(`Enter details for test case ${i + 1}: `, (input) => {
      const [p1age, p1pos, p2age, p2pos] = input.split(' ');
      const player1 = { age: parseInt(p1age), pos: p1pos };
      const player2 = { age: parseInt(p2age), pos: p2pos };
      const winner = playGame(player1, player2);
      console.log(winner);
    });
  }
});
