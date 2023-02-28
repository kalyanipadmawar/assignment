const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const assert = require('assert');
try{
// Function to validate age and position
function validateAgeAndPosition(age, position) {
  if (age < 0 || position < 0) {
    return false;
  }
  return true;
}

// Test cases
validateAgeAndPosition('Age and Position validation', () => {
  it('Should return true if age and position are greater than or equal to 0', () => {
    assert.strictEqual(validateAgeAndPosition(0, 0), true);
    assert.strictEqual(validateAgeAndPosition(25, 10), true);
    assert.strictEqual(validateAgeAndPosition(50, 20), true);
  });

  it('Should return false if age or position is less than 0', () => {
    assert.strictEqual(validateAgeAndPosition(-1, 0), false);
    assert.strictEqual(validateAgeAndPosition(0, -1), false);
    assert.strictEqual(validateAgeAndPosition(-10, -5), false);
  });
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

}catch(e){
  console.error("An error occured",e);
}
