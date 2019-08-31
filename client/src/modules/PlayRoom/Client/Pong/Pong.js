import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  BoxGeometry,
  MeshBasicMaterial,
  Mesh,
  MeshLambertMaterial,
} from 'three';

import SceneManager from './SceneManager';

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

      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      renderer.render(scene, camera);
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
