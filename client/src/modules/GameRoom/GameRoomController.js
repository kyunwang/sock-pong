import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { AppContext, GameContext } from '../../components/context/AppContext';
import { emitRegisterPlayer } from '../../socket/socketEmitters';
import { SOCKET_GAME } from '../../../../general/socketConsts';

const GameRoomController = ({ socket }) => {
  const { global: isMobile } = useContext(AppContext);
  const { roomID, playerID } = useContext(GameContext);
  const [entryID, setEntryID] = useState('');

  useEffect(() => {
    const handleDeviceOrientation = orientation => {
      const { alpha, beta, gamma } = orientation;

      const data = {
        orientation: {
          alpha: (alpha + 180) / 20,
          beta: beta / 20,
          gamma: -gamma / 20,
        },
      };

      socket.emit(SOCKET_GAME.SEND_ORIENTATION, data);
    };

    if (window.DeviceOrientationEvent && isMobile) {
      window.addEventListener(
        'deviceorientation',
        handleDeviceOrientation,
        false
      );
    }

    // on unmount
    return () => {
      if (window.DeviceOrientationEvent && isMobile) {
        window.removeEventListener(
          'deviceorientation',
          handleDeviceOrientation
        );
      }
    };
  }, []);

  const handleSubmit = e => {
    if (!roomID && (entryID && entryID >= 10000 && entryID <= 99999)) {
      const data = { socket, data: { playerID, entryID } };

      emitRegisterPlayer(data);
    }

    e.preventDefault();
  };

  const handleOnChange = ({ target: { value } }) => {
    if (value <= 99999) {
      setEntryID(value);
    }
  };

  return (
    <>
      <p>Controller - {roomID}</p>

      <form onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="e.g. 94587"
          onChange={handleOnChange}
          value={entryID}
        ></input>
        {/* <input type="submit">Enter</input> */}
        <button>Enter</button>
      </form>
    </>
  );
};

GameRoomController.propTypes = {};
GameRoomController.defaultProps = {};

export default GameRoomController;
