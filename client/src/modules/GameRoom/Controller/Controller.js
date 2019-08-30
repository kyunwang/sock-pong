import React, { useState, useContext, useEffect } from 'react';
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
  Container,
  Title,
  Introduction,
  StartButton,
  CodeContainer,
  SystemMessage,
  CodeInput,
} from '../GameRoomStyles';

const GameRoomController = ({ socket }) => {
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

  const handleOnChange = ({ target: { value } }) => {
    if (value <= 99999) {
      setEntryID(value);
    }
  };

  const titleText = 'Join \n game';

  return (
    <Container>
      <Title text={titleText}>{titleText}</Title>
      <Introduction>
        Go to xxx.com and enter the game code displayed
      </Introduction>
      <CodeContainer>
        <CodeInput placeholder="\\\\\" />
        <SystemMessage status="">Wups, no game has this code</SystemMessage>
      </CodeContainer>
      {/* <p>Controller - {roomID}</p>

        <form onSubmit={handleSubmit}>
          <input
            type="number"
            placeholder="e.g. 94587"
            onChange={handleOnChange}
            value={entryID}
          ></input>
          <button>Enter</button>
				</form> */}
      <StartButton>Let's go</StartButton>
    </Container>
  );
};

GameRoomController.propTypes = {};
GameRoomController.defaultProps = {};

export default GameRoomController;
