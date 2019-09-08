import React, { useRef, useEffect } from 'react';
import {
  createStats,
  checkStats,
} from '../../../../general/bhreesey/utils/stats';
import { createDatGUI } from '../../../../general/bhreesey/utils/dat.gui';
import { subscribeToReceiveOrientation } from '../../../../socket/socketSubscriptions';
import PropTypes from 'prop-types';

import PerlinSphere from './sceneSubjects/PerlinSphere';
import { initializeScene, addLight } from './initial';

import { playersData } from './core';

let stats;
let sceneManager = null;
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

const Pong = ({ socket, players }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (isDev && !stats) {
      stats = createStats(); // 0: fps, 1: ms, 2: mb, 3+: custom
    }

    // If the sceneManager is not set, means players have yet to be set too
    if (!sceneManager) {
      const canvas = canvasRef.current;
      sceneManager = initializeScene(canvas);
      const { scene, addToUpdate } = sceneManager;

      addLight(scene);

      players.forEach(playerID => {
        const pSphere = new PerlinSphere(scene);
        addToUpdate([pSphere]);

        playersData[playerID] = {};
        playersData[playerID].orientation = { x: 0, y: 0, z: 0 };
        playersData[playerID].object = pSphere;
      });
    }
  }, []);

  useEffect(() => {
    // subscribeToReceiveOrientation(socket, handleSub);

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

  return <canvas ref={canvasRef}></canvas>;
};

Pong.propTypes = {
  socket: PropTypes.object.isRequired,
  players: PropTypes.arrayOf(PropTypes.number).isRequired,
};

Pong.defaultProps = { players: [12421] };

export default Pong;
