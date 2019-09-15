import * as THREE from 'three';
import SceneManager from '../../../../general/bhreesey/SceneManager';
import {
  debounce,
  bindEventListeners,
} from '../../../../general/bhreesey/utils/helpers';
import GeneralLight from '../../../../general/bhreesey/GeneralSubjects/GeneralLight';
import { createDatGUI } from '../../../../general/bhreesey/utils/dat.gui';

// global.THREE = THREE; // For orbit controls
// Remove orbitcontrols at the end
// require('three/examples/js/controls/OrbitControls');

const gui = createDatGUI();

export const initializeScene = canvas => {
  const sceneManager = new SceneManager(canvas);
  const { camera } = sceneManager;

  const onResize = debounce(() => {
    sceneManager.onWindowResize();
  }, 300);

  camera.position.set(0, 0, 5);
  camera.lookAt(new THREE.Vector3());

  bindEventListeners([
    {
      type: 'resize',
      callback: onResize,
      target: window,
    },
  ]);

  // Delete later on
  // new THREE.OrbitControls(camera, canvas);

  return sceneManager;
};

export const addLight = scene => {
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
};
