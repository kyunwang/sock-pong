export const cameraPositions = {
  default: [0, 0, 5],
  playerOne: { position: [-50, 10, 185], rotation: [0, 0, 0] },
  playerTwo: { position: [0, 0, -70], rotation: [0, 0, 0] },
  audience: {
    camOne: [], // top view?
    topSide: { position: [-375, 200, 600] },
    // Player one view?
    // Player two view?
  },
};

export const fieldSettings = {
  size: [85, 40, 150],
  sphereSize: [80, 12, 12],
};

export const playerSettings = {
  size: [14, 3, 2],
  paddleSize: [12, 12, 3, 32],
  playerOne: { position: [0, 0, 65], rotation: [90, 0, 0] }, // position
  playerTwo: { position: [0, 0, -65], rotation: [-90, 0, 0] },
};
