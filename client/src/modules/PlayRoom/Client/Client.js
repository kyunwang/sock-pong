import React, { useEffect, useContext, useState, useRef } from 'react';
import PropTypes from 'prop-types';

import { GameContext } from '../../../components/context/AppContext';
import { subscribeToReceiveOrientation } from '../../../socket/socketSubscriptions';
import Pong from './Pong/Pong';

const PlayRoomClient = ({ socket }) => {
  const canvasRef = useRef(null);
  const [canvas, setCanvas] = useState();

  useEffect(() => {
    setCanvas(canvasRef.current);

    return () => {};
  }, []);

  return (
    <>
      {/* <Pong socket={socket} players={players} canvas={canvas} /> */}
      <canvas ref={canvasRef}></canvas>
      {canvas && <Pong canvas={canvas} />}
    </>
  );
};

PlayRoomClient.propTypes = {
  socket: PropTypes.object.isRequired,
};
PlayRoomClient.defaultProps = {};

export default PlayRoomClient;
