// Note: Scene handling and setting ready
import * as THREE from 'three';
import SceneManager from '../../../../general/bhreesey/SceneManager';
import {
  debounce,
  bindEventListeners,
} from '../../../../general/bhreesey/utils/helpers';
import GeneralLight from '../../../../general/bhreesey/GeneralSubjects/GeneralLight';
import { createDatGUI } from '../../../../general/bhreesey/utils/dat.gui';
import SquareField from './sceneSubjects/SquareField';
import { cameraPositions } from './consts';
import PlayerBar from './sceneSubjects/PlayerBar';
import { playerSettings } from './consts';
import GameBall from './sceneSubjects/GameBall';
import SphereField from './sceneSubjects/SphereField';
import PlayerPaddle from './sceneSubjects/PlayerPaddle';

global.THREE = THREE; // For orbit controls
// Remove orbitcontrols at the end
require('three/examples/js/controls/OrbitControls');

const gui = createDatGUI();

export const initializeCanvas = ({ canvas, hasGui }) => {
  const sceneManager = new SceneManager(canvas);
  const { camera, scene, onWindowResize } = sceneManager;

  // camera.position.set(...cameraPositions.default);
  camera.position.set(...cameraPositions.audience.topSide.position);
  camera.rotation.set(...cameraPositions.audience.topSide.rotation);
  camera.fov = 15;
  // camera.far = 1000;

  // camera.lookAt(new THREE.Vector3()); // Center world

  // Delete later on
  new THREE.OrbitControls(camera, canvas);

  handleEventBinding(onWindowResize);
  addLight(scene);

  const subjects = addSubjects(scene);

  const returnObj = { sceneManager, subjects };

  if (hasGui) {
    returnObj.gui = gui;
  }

  return returnObj;
};

function addSubjects(scene) {
  // const gameField = new SquareField(scene);
  const gameBall = new GameBall(scene);
  const gameField = new SphereField(scene);
  const playerOne = new PlayerPaddle(scene);
  const playerTwo = new PlayerPaddle(scene);

  gameField.pivotPoint.add(playerOne.mesh);

  // var quaternion = new THREE.Quaternion();
  // quaternion.setFromAxisAngle(playerSettings.playerOne.position, Math.PI / 2);

  // var vector = new THREE.Vector3( 1, 0, 0 );
  // playerOne.mesh.rotation.applyQuaternion(quaternion);
  // playerOne.mesh.rotation.set(new THREE.Euler().setFromQuaternion(quaternion));
  // new THREE.Euler().setFromQuaternion( quaternion )

  playerOne.mesh.position.set(...playerSettings.playerOne.position);
  playerTwo.mesh.position.set(...playerSettings.playerTwo.position);
  // playerOne.mesh.rotation.set(...playerSettings.playerOne.rotation);
  // playerTwo.mesh.rotation.set(...playerSettings.playerTwo.rotation);

  window.playerOne = playerOne.mesh;

  gui.addMesh('p1', playerOne.mesh);
  gui.addMesh('ball', gameBall.mesh);
  gui.addMesh('field', gameField.mesh);
  // assign id?

  return {
    gameBall,
    gameField,
    playerOne,
    playerTwo,
  };
}

function addLight(scene) {
  const { light } = new GeneralLight(scene, {
    type: 'Point',
    hasHelper: true,
    light: {
      color: 0x2222ff,
      intesity: 3,
    },
  });

  light.position.set(0, 10, 0);

  gui.addLight('Light', light);

  return light;
}

function handleEventBinding(onWindowResize) {
  const onResize = debounce(() => {
    onWindowResize();
  }, 300);

  bindEventListeners([
    {
      type: 'resize',
      callback: onResize,
      target: window,
    },
  ]);
}
