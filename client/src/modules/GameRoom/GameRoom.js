import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';

import {
  AppContext,
  GameContext,
  SocketContext,
} from '../../components/context/AppContext';

import {
  subscribeToPlayerRegister,
  subscribeToClientRegister,
  subscribeToPlayerIDRegister,
} from '../../socket/socketSubscriptions';

import GameRoomClient from '../../modules/GameRoom/Client/Client';
import GameRoomController from '../../modules/GameRoom/Controller/Controller';
import { Container, Title, StartButton } from './GameRoomStyles';

const GameRoom = () => {
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
  }, []);

  if (!socket) return null;

  const titleText = isMobile ? 'Join \n game' : 'Game \n room';

  return (
    <>
      <Container>
        <Title text={titleText}>{titleText}</Title>
        {isMobile ? (
          <GameRoomController
            socket={socket}
            roomID={roomID}
            setRoomID={setRoomID}
          />
        ) : (
          <GameRoomClient socket={socket} roomID={roomID} />
        )}
        {/* <StartButton onClick={() => {}}>Let's go</StartButton> */}
      </Container>
    </>
  );
};

GameRoom.propTypes = {};
GameRoom.defaultProps = {};

export default GameRoom;
