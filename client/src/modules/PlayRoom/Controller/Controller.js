import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { SOCKET_GAME } from '../../../../../general/socketConsts';
import { useEventListener } from '../../../general/hooks/hooks';
import {
  AppContext,
  GameContext,
} from '../../../components/context/AppContext';

const PlayRoomController = ({ socket }) => {
  const { global: isMobile } = useContext(AppContext);
  const { playerID, roomID } = useContext(GameContext);

  const handleDeviceOrientation = orientation => {
    const { alpha, beta, gamma } = orientation;

    const data = {
      roomID,
      playerID,
      orientation: {
        alpha: (alpha + 180) / 20,
        beta: beta / 20,
        gamma: -gamma / 20,
      },
    };

    socket.emit(SOCKET_GAME.SEND_ORIENTATION, data);
  };

  useEventListener({
    event: 'deviceorientation',
    handler: handleDeviceOrientation,
    condition: window.DeviceOrientationEvent && isMobile && roomID && playerID,
  });

  return (
    <p>
      <span>cc</span>
    </p>
  );
};

PlayRoomController.propTypes = { socket: PropTypes.object.isRequired };
PlayRoomController.defaultProps = {};

export default PlayRoomController;
