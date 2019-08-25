import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'gatsby';

import {
  subscribeToPlayerRegister,
  subscribeToClientRegister,
} from '../socket/socketSubscriptions';

import {
  AppContext,
  GameContext,
  SocketContext,
} from '../components/context/AppContext';

import Container from '../components/general/Container';
// import GameRoomClient from './GameRoomClient';
// import GameRoomController from './GameRoomController';
import GameRoomController from '../modules/GameRoom/GameRoomController';
import GameRoomClient from '../modules/GameRoom/GameRoomClient';
import GameRoom from '../modules/GameRoom/GameRoom';

const GameRoomPage = () => {
  // const { global } = useContext(AppContext);
  // const { socket, assignSocket } = useContext(SocketContext);
  // const { roomID, setRoomID } = useContext(GameContext);

  // useEffect(() => {
  //   if (!socket) {
  //     assignSocket();
  //     return;
  //   }

  //   subscribeToClientRegister(socket, uniqueID => setRoomID(uniqueID));
  //   subscribeToPlayerRegister(socket, data => {
  //     console.log('player registered: ', data);
  //   });
  // }, []);

  // console.log(socket, roomID);

  // // if 2 players - not allowed to join as player but as audience

  // if (!socket) return null;

  return (
    <GameRoom />
    // <Container>
    //   <Link to="/">home</Link>

    //   {global.isMobile ? (
    //     <GameRoomController socket={socket} roomID={roomID} />
    //   ) : (
    //     <GameRoomClient socket={socket} roomID={roomID} />
    //   )}
    // </Container>
  );
};

GameRoomPage.propTypes = {};
GameRoomPage.defaultProps = {};

export default GameRoomPage;
