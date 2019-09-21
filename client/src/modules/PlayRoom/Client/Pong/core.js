// Note: Game logic - possible state machine??? - prevent react rerender
export const playersData = {}; // playerID: {}
export const gameObjects = {
  gameBall: null,
};

// export let gameBall = { velocity: null, paused: null, position: {} };

export const startGameBall = () => {
  const { gameBall } = gameObjects;
  const direction = Math.random() > 0.5 ? -1 : 1;
  gameBall.velocity = {
    x: 0,
    z: direction * 1,
  };
  gameBall.paused = false;
};

const updateGameBall = () => {
  const { gameBall } = gameObjects;
  const { velocity } = gameBall;
  gameBall.mesh.position.x += velocity.x;
  gameBall.mesh.position.z += velocity.z;

  // gameBall.mesh.position.y = ;
};

export const handleGameBall = () => {
  const { gameBall } = gameObjects;
  console.log(gameBall);
  if (!gameBall.velocity) {
    startGameBall();
  }

  if (gameBall.paused) {
    return;
  }

  updateGameBall();

  // collided with
  // walls (horizontal? vertical?) - increase speed?
  // player1
  // player2
  // player1back score for player 2
  // player2back score for player 1
};
