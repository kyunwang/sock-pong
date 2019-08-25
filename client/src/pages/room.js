import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'gatsby';

import {
  subscribeToPlayerRegister,
  subscribeToClientRegister,
  subscribeToPlayerIDRegister,
} from '../socket/socketSubscriptions';

import {
  AppContext,
  GameContext,
  SocketContext,
} from '../components/context/AppContext';

import Container from '../components/general/Container';
import GameRoomClient from '../modules/GameRoom/GameRoomClient';
import GameRoomController from '../modules/GameRoom/GameRoomController';

const GameRoomPage = () => {
  const {
    global: { isMobile },
  } = useContext(AppContext);

  const { socket, assignSocket } = useContext(SocketContext);
  const { roomID, setRoomID, setPlayerID } = useContext(GameContext);

  useEffect(() => {
    let connectedSocket = socket;

    if (!socket) {
      connectedSocket = assignSocket();
    }

    if (isMobile) {
      subscribeToPlayerIDRegister(connectedSocket, uniqueID =>
        setPlayerID(uniqueID)
      );
    } else {
      subscribeToClientRegister(connectedSocket, uniqueID =>
        setRoomID(uniqueID)
      );
    }

    subscribeToPlayerRegister(connectedSocket, data => {
      setRoomID(data.result); // should be only for controller
      console.log('player registered: ', data);
    });
  }, []);

  // if 2 players - not allowed to join as player but as audience
  if (!socket) return null;

  return (
    <Container>
      <Link to="/">home</Link>
      {roomID}

      {isMobile ? (
        <GameRoomController
          socket={socket}
          roomID={roomID}
          setRoomID={setRoomID}
        />
      ) : (
        <GameRoomClient socket={socket} roomID={roomID} />
      )}
    </Container>
  );
};

GameRoomPage.propTypes = {};
GameRoomPage.defaultProps = {};

export default GameRoomPage;
