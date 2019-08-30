// if there is no socket in the context reirect to /room
import React, { useContext, useEffect } from 'react';
import { navigate } from 'gatsby';

import { GameContext, SocketContext } from '../components/context/AppContext';
// import { useEventListener } from '../general/hooks/hooks';
import { subscribeToReceiveOrientation } from '../socket/socketSubscriptions';

const PlayGamePage = () => {
  const { socket } = useContext(SocketContext);
  const { players } = useContext(GameContext);

  if (!players.length) {
    navigate('/room');
  }

  // useEffect(() => {}, []);

  useEffect(() => {
    subscribeToReceiveOrientation(socket, data => {
      console.log('receive', data);
    });
  }, []);

  return (
    <p>
      dsadsadasdasd<span>dsad</span>
    </p>
  );
};

PlayGamePage.propTypes = {};
PlayGamePage.defaultProps = {};

export default PlayGamePage;

// const handleDeviceOrientation = orientation => {
// 	const { alpha, beta, gamma } = orientation;

// 	const data = {
// 		roomID,
// 		playerID,
// 		orientation: {
// 			alpha: (alpha + 180) / 20,
// 			beta: beta / 20,
// 			gamma: -gamma / 20,
// 		},
// 	};

// 	socket.emit(SOCKET_GAME.SEND_ORIENTATION, data);
// };

// useEventListener({
// 	event: 'deviceorientation',
// 	handler: handleDeviceOrientation,
// 	condition: window.DeviceOrientationEvent && isMobile && roomID && playerID,
// });
