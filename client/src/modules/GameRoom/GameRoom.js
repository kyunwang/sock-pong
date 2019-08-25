import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'gatsby';

import {
  subscribeToPlayerRegister,
  subscribeToClientRegister,
} from '../../socket/socketSubscriptions';

import {
  AppContext,
  GameContext,
  SocketContext,
} from '../../components/context/AppContext';

import Container from '../../components/general/Container';
import GameRoomClient from './GameRoomClient';
import GameRoomController from './GameRoomController';

const GameRoom = () => {
  const { global } = useContext(AppContext);
  const { socket, assignSocket } = useContext(SocketContext);
  const { roomID, setRoomID } = useContext(GameContext);

  useEffect(() => {
    let connectedSocket = socket;

    if (!socket) {
      connectedSocket = assignSocket();
    }

    subscribeToClientRegister(connectedSocket, uniqueID => setRoomID(uniqueID));

    subscribeToPlayerRegister(connectedSocket, data => {
      console.log('player registered: ', data);
    });
  }, []);

  console.log(socket, roomID);

  // if 2 players - not allowed to join as player but as audience
  if (!socket) return null;

  return (
    <Container>
      <Link to="/">home</Link>
      {roomID}

      {global.isMobile ? (
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

GameRoom.propTypes = {};
GameRoom.defaultProps = {};

export default GameRoom;
