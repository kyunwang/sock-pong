import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

import Stats from 'stats-js';

import SceneManager from './SceneManager';

import * as THREE from 'three';
import OrbitControls from 'three-orbit-controls';
import { subscribeToReceiveOrientation } from '../../../../socket/socketSubscriptions';

const Controls = OrbitControls(THREE);

let stats = false;

let Manager = null;

const playersOrientation = {};

let cube = null;
let cubeTwo = null;

const initializeScene = canvas => {
  Manager = new SceneManager(canvas);
  const { camera, buildCube, addLight } = Manager;
  cube = buildCube();
  cubeTwo = buildCube();

  cubeTwo.position.set(2, 0, 0);

  addLight();

  camera.position.x = 0;
  camera.position.y = 0;
  camera.position.z = 5;

  new Controls(camera, canvas);
};

const animateScene = players => {
  const { scene, renderer, camera } = Manager;

  if (process.env.GATSBY_STATS_JS && stats) {
    stats.begin();
  }

  // players.forEach(playerID => {})

  cube.rotation.set(
    playersOrientation[players[0]].x,
    playersOrientation[players[0]].y,
    playersOrientation[players[0]].z
  );

  cubeTwo.rotation.set(
    playersOrientation[players[1]].x,
    playersOrientation[players[1]].y,
    playersOrientation[players[1]].z
  );

  renderer.render(scene, camera);

  if (process.env.GATSBY_STATS_JS && stats) {
    stats.end();
  }
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
    subscribeToReceiveOrientation(socket, handleSub);

    if (process.env.GATSBY_STATS_JS && !stats) {
      stats = new Stats();
      stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
      document.body.appendChild(stats.dom);
    }

    const canvas = canvasRef.current;
    canvas.style.width = '100%';
    canvas.style.height = '100%';

    // If the Manager is not set, means players have yet to be set too
    if (!Manager) {
      initializeScene(canvas);
      players.forEach(
        playerID => (playersOrientation[playerID] = { x: 0, y: 0, z: 0 })
      );
    }

    const animate = () => {
      requestAnimationFrame(animate);
      animateScene(players);
    };

    animate();

    return () => {
      cancelAnimationFrame(animate);
    };
  }, []);

  return (
    <>
      <canvas ref={canvasRef}></canvas>
    </>
  );
};

Pong.propTypes = {};
Pong.defaultProps = {};

export default Pong;
