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
import { playersData } from './core';

let stats;
let gui;
let sceneManager;

const isDev = process.env.GATSBY_STATS_JS;

const animateScene = players => {
  players.forEach(playerID => {
    playersData[playerID].object.mesh.rotation.set(
      playersData[playerID].orientation.x,
      playersData[playerID].orientation.y,
      playersData[playerID].orientation.z
    );
  });

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
      gui = initialized.gui;
      const { scene, addToUpdate, camera } = sceneManager;

      players.forEach(playerID => {
        // addToUpdate([pSphere]);

        playersData[playerID] = {};
        playersData[playerID].orientation = { x: 0, y: 0, z: 0 };
        // playersData[playerID].object = pSphere;
      });

      handleGui();
    }
  }, []);

  useEffect(() => {
    if (!sceneManager) return;

    const animate = () => {
      if (isDev) {
        checkStats(stats, animateScene, {
          args: players,
          condition: isDev,
        });
      } else {
        animateScene(players);
      }
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
    // subscribeToReceiveOrientation(socket, handleSub);
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
