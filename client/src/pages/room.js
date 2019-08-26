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
import GameRoomClient from '../modules/GameRoom/Client';
import GameRoomController from '../modules/GameRoom/Controller';

const GameRoomPage = () => {
  const {
    global: { isMobile },
  } = useContext(AppContext);

  const { socket, assignSocket } = useContext(SocketContext);
  const { players, roomID, setPlayerID, setPlayers, setRoomID } = useContext(
    GameContext
  );

  useEffect(() => {
    let connectedSocket = socket;

    if (!socket) {
      connectedSocket = assignSocket();
    }

    if (isMobile) {
      subscribeToPlayerIDRegister(connectedSocket, uniqueID =>
        setPlayerID(uniqueID)
      );
      subscribeToPlayerRegister(connectedSocket, data => {
        console.log('data', data);

        if (data.result) setRoomID(data.result);
      });
    } else {
      subscribeToClientRegister(connectedSocket, uniqueID =>
        setRoomID(uniqueID)
      );
      subscribeToPlayerRegister(connectedSocket, data => {
        if (data.result) {
          if (players.length < 2) setPlayers([...players, data.playerID]);

          console.log('Add player: ', data);
        }
      });
    }

    // subscribeToPlayerRegister(connectedSocket, data => {
    //   if (data.result) {
    //     setRoomID(data.result); // should be only for controller
    //     if (players.length < 2) {
    //       setPlayers([...players, playerID]);
    //     }

    //     console.log('player registered: ', data);
    //   }
    // });
  }, []);

  // if 2 players - not allowed to join as player but as audience
  if (!socket) return null;

  return (
    <Container>
      <Link to="/">home</Link>
      <Link to="/play">play</Link>
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
