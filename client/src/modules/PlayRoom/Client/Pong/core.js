// Note: Game logic - possible state machine??? - prevent react rerender
import { collisionBoxSphere } from './helpers';
export const playersData = {}; // playerID: {}
export const gameObjects = {
  gameField: null,
  gameBall: null,
  playerOne: null,
  playerTwo: null,
};

// export let gameBall = { velocity: null, paused: null, position: {} };

export const startGameBall = () => {
  const { gameBall } = gameObjects;
  // const direction = Math.random() > 0.5 ? -1 : 1;
  const direction = 1;
  gameBall.velocity = {
    x: 0,
    z: direction * 1,
  };
  gameBall.paused = false;
};

const updateGameBall = () => {
  const { gameBall, gameField, playerOne, playerTwo } = gameObjects;
  // console.log(gameObjects);

  const { velocity } = gameBall;
  gameBall.mesh.position.x += velocity.x;
  gameBall.mesh.position.z += velocity.z;

  // collisionBoxSphere(gameField.mesh, gameBall.mesh);
  // collisionBoxSphere(playerOne.mesh, gameBall.mesh);
  // collisionBoxSphere(playerOne.mesh, gameBall.mesh);
};

export const handleGameBall = () => {
  const { gameBall } = gameObjects;
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

export const animateScene = players => {
  // if (started/running) {}

  // players.forEach(playerID => {
  //   playersData[playerID].object.mesh.rotation.set(
  //     playersData[playerID].orientation.x,
  //     playersData[playerID].orientation.y,
  //     playersData[playerID].orientation.z
  //   );
  // });

  // update ball movement
  // update paddles movement
  // console.log(gameObjects.gameBall);

  handleGameBall();
};
