import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

import Stats from 'stats-js';

// import SceneManager from './SceneManager';

import * as THREE from 'three';
import OrbitControls from 'three-orbit-controls';
import { subscribeToReceiveOrientation } from '../../../../socket/socketSubscriptions';

import SceneManager from '../../../../general/bhreesey/SceneManager';
import GeneralLight from '../../../../general/bhreesey/GeneralSubjects/GeneralLight';
import PerlinSphere from './sceneSubjects/PerlinSphere';
import {
  createStats,
  checkStats,
} from '../../../../general/bhreesey/utils/stats';

// Remove orbitcontrols at the end
const Controls = OrbitControls(THREE);

let stats;
let sceneManager = null;

const playersOrientation = {};

let cube = null;
let cubeTwo = null;

const isDev = process.env.GATSBY_STATS_JS;

const initializeScene = canvas => {
  sceneManager = new SceneManager(canvas);
  const { camera, scene, addToUpdate } = sceneManager;

  const light = new GeneralLight(scene, {
    type: 'Ambient',
    hasHelper: true,
  });

  const pSphere = new PerlinSphere(scene);
  addToUpdate([pSphere]);

  // const { camera, buildCube, addLight } = sceneManager;
  // cube = buildCube();
  // cubeTwo = buildCube();

  // cubeTwo.position.set(2, 0, 0);
  camera.position.set(0, 0, 5);

  new Controls(camera, canvas);
};

const animateScene = players => {
  // const { scene, renderer, camera } = sceneManager;

  // players.forEach(playerID => {})

  // cube.rotation.set(
  //   playersOrientation[players[0]].x,
  //   playersOrientation[players[0]].y,
  //   playersOrientation[players[0]].z
  // );

  // cubeTwo.rotation.set(
  //   playersOrientation[players[1]].x,
  //   playersOrientation[players[1]].y,
  //   playersOrientation[players[1]].z
  // );

  sceneManager.update();
};

const handleSub = data => {
  const {
    orientation: { x, y, z },
    playerID,
  } = data;

  playersOrientation[playerID] = {
    x,
    y,
    z,
  };
};

const Pong = ({ socket, players }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (isDev && !stats) {
      stats = createStats(); // 0: fps, 1: ms, 2: mb, 3+: custom
    }

    // If the sceneManager is not set, means players have yet to be set too
    if (!sceneManager) {
      const canvas = canvasRef.current;
      initializeScene(canvas);
      players.forEach(
        playerID => (playersOrientation[playerID] = { x: 0, y: 0, z: 0 })
      );
    }
  }, []);

  useEffect(() => {
    // subscribeToReceiveOrientation(socket, handleSub);

    const animate = () => {
      checkStats(stats, animateScene, {
        args: players,
        condition: isDev,
      });
      requestAnimationFrame(animate);
    };

    animate();
    sceneManager.onWindowResize();

    return () => {
      cancelAnimationFrame(animate);
      // Add socket remove listener
    };
  }, []);

  return <canvas ref={canvasRef}></canvas>;
};

Pong.propTypes = {};
Pong.defaultProps = {};

export default Pong;
