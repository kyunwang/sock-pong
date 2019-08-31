import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

import Stats from 'stats-js';

import SceneManager from './SceneManager';

let stats = false;

if (process.env.GATSBY_STATS_JS) {
  stats = new Stats();
  stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
  document.body.appendChild(stats.dom);
}

const Pong = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.style.width = '100%';
    canvas.style.height = '100%';

    const Manager = new SceneManager(canvas);
    const { scene, camera, renderer, buildCube } = Manager;
    const cube = buildCube();

    camera.position.x = 0;
    camera.position.y = 0;
    camera.position.z = 5;

    const animate = () => {
      requestAnimationFrame(animate);

      if (process.env.GATSBY_STATS_JS && stats) {
        stats.begin();
      }
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      renderer.render(scene, camera);

      if (process.env.GATSBY_STATS_JS && stats) {
        stats.end();
      }
    };

    animate();

    return () => {};
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
