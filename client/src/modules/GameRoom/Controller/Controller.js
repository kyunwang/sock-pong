import React, { useState, useContext, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  AppContext,
  GameContext,
} from '../../../components/context/AppContext';
import { SOCKET_GAME } from '../../../../../general/socketConsts';
import { emitRegisterPlayer } from '../../../socket/socketEmitters';
import { useEventListener } from '../../../general/hooks/hooks';

import {
  Introduction,
  CodeContainer,
  SystemMessage,
  StartButton,
} from '../GameRoomStyles';
import { CodeInput } from './ControllerStyles';

const GameRoomController = ({ socket }) => {
  const conRef = useRef(null);
  const { global: isMobile } = useContext(AppContext);
  const { roomID, playerID } = useContext(GameContext);
  const [entryID, setEntryID] = useState('');

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

  const handleSubmit = e => {
    if (!roomID && (entryID && entryID >= 10000 && entryID <= 99999)) {
      const data = { socket, data: { playerID, entryID } };

      emitRegisterPlayer(data);
    }

    e.preventDefault();
  };

  const handleOnChange = ({ target }) => {
    if (target.value <= 99999) {
      setEntryID(target.value);
      // conRef.current.style.setProperty(
      //   '--translateX',
      //   target.value.length * 20 + '%'
      // );
    }
  };

  return (
    <>
      <Introduction>
        Go to xxx.com and enter the game code displayed
      </Introduction>
      <CodeContainer ref={conRef} afterWidth={entryID}>
        <CodeInput
          type="number"
          onChange={handleOnChange}
          value={entryID}
          placeholder="\\\\\"
        />
        <SystemMessage status="">Wups, no game has this code</SystemMessage>
      </CodeContainer>
      <StartButton onClick={handleSubmit}>Let's go</StartButton>

      {/* <form onSubmit={handleSubmit}>
          <input
            type="number"
            placeholder="e.g. 94587"
            onChange={handleOnChange}
            value={entryID}
          ></input>
          <button>Enter</button>
				</form> */}
    </>
  );
};

GameRoomController.propTypes = {};
GameRoomController.defaultProps = {};

export default GameRoomController;
