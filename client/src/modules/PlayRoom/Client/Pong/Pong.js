// NoOTE: Data handling - e.g. sockets etc.

// TODO: useLayoutEffect or old class constructor

import React, { useRef, useEffect } from 'react';
import {
  createStats,
  checkStats,
} from '../../../../general/bhreesey/utils/stats';
import PropTypes from 'prop-types';
import { subscribeToReceiveOrientation } from '../../../../socket/socketSubscriptions';

import { initializeCanvas } from './initial';
import { playersData, gameObjects, gameBall } from './core';
import { handleGameBall } from './core';

let stats;
let gui;
let sceneManager;

const isDev = process.env.GATSBY_STATS_JS;

const animateScene = players => {
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

  sceneManager.update();
};

const handleSub = data => {
  const {
    orientation: { x, y, z },
    playerID,
  } = data;

  playersData[playerID].orientation = { x, y, z };
};

const Pong = ({ socket, players, canvas }) => {
  useEffect(() => {
    if (isDev && !stats) {
      stats = createStats(); // 0: fps, 1: ms, 2: mb, 3+: custom
    }

    // If the sceneManager is not set, means players have yet to be set too
    if (!sceneManager) {
      const initialized = initializeCanvas({ canvas, hasGui: true });
      // const { subjects } = initialized;
      sceneManager = initialized.sceneManager;
      const { gameBall } = initialized.subjects;
      gui = initialized.gui;
      const { scene, addToUpdate, camera } = sceneManager;

      gameObjects.gameBall = gameBall;

      // camera.lookAt(possibly the ball?);

      players.forEach(playerID => {
        // addToUpdate([pSphere]);

        playersData[playerID] = {};
        playersData[playerID].orientation = { x: 0, y: 0, z: 0 };
        playersData[playerID].object = {};
      });

      handleGui();
    }
  }, []);

  useEffect(() => {
    // return; // Debug
    if (!sceneManager) return;

    const animate = () => {
      isDev
        ? checkStats(stats, animateScene, {
            args: players,
            condition: isDev,
          })
        : animateScene(players);

      requestAnimationFrame(animate);
    };

    animate();
    sceneManager.onWindowResize();

    return () => {
      cancelAnimationFrame(animate);
      // Add socket remove listener
    };
  }, []);

  useEffect(() => {
    return; // Debug
    subscribeToReceiveOrientation(socket, handleSub);
  });

  // Start game - debug
  useEffect(() => {
    // put stuff in update of scenemanager?
    // sceneManager.addToUpdate([]);
    //
    // const handlePress = e => {
    //   if (e.code === 'Space') {
    //     animate();
    //     document.removeEventListener(handlePress);
    //     console.log(111);
    //   }
    // };
    // document.addEventListener('keypress', handlePress);
  });

  return null;
};

Pong.propTypes = {
  socket: PropTypes.object.isRequired,
  players: PropTypes.arrayOf(PropTypes.number).isRequired,
};

Pong.defaultProps = { players: [12421] };

export default Pong;

function handleGui() {
  const { camera } = sceneManager;
  gui.addCamera('Camera', camera);
}
