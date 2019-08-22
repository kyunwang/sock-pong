import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'gatsby';

import Container from '../../components/general/Container';
import {
  subscribeToPlayerRegister,
  subscribeToClientRegister,
} from '../../general/socket';

import {
  AppContext,
  GameContext,
  SocketContext,
} from '../../components/context/AppContext';

const GameRoom = () => {
  // const appCtx = useContext(AppContext);
  const { socket, assignSocket } = useContext(SocketContext);
  const { roomID, setRoomID } = useContext(GameContext);

  console.log('socket: ', socket);

  useEffect(() => {
    if (!socket) {
      assignSocket();
      return;
    }

    subscribeToClientRegister(socket, uniqueID => setRoomID(uniqueID));
    subscribeToPlayerRegister(socket, data => {
      console.log('player registered: ', data);
    });
  }, [socket]);

  // if 2 players - not allowed to join as player but as audience

  return (
    <Container>
      <Link to="/">home</Link>
      <p>Gameroom</p>
      <p>
        Go to this site on your phone and enter this code to join the game/room
      </p>
      <pre>CODE - {roomID}</pre>
      <p>No player has entered (List of players (max 2))</p>
      <p>x amount of audience joined</p>
    </Container>
  );
};

GameRoom.propTypes = {};
GameRoom.defaultProps = {};

export default GameRoom;
