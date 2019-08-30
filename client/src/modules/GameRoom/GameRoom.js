import React, { useContext, useEffect } from 'react';

import { AppContext, SocketContext } from '../../components/context/AppContext';

import GameRoomClient from '../../modules/GameRoom/Client/Client';
import GameRoomController from '../../modules/GameRoom/Controller/Controller';
import { Container, Title } from './GameRoomStyles';

const GameRoom = () => {
  const {
    global: { isMobile },
  } = useContext(AppContext);

  const { socket, assignSocket } = useContext(SocketContext);

  useEffect(() => {
    if (!socket) {
      assignSocket();
    }
  }, []);

  if (!socket) return null;

  const titleText = isMobile ? 'Join \n game' : 'Game \n room';

  return (
    <>
      <Container>
        <Title text={titleText}>{titleText}</Title>
        {isMobile ? (
          <GameRoomController socket={socket} />
        ) : (
          <GameRoomClient socket={socket} />
        )}
        {/* <StartButton onClick={() => {}}>Let's go</StartButton> */}
      </Container>
    </>
  );
};

GameRoom.propTypes = {};
GameRoom.defaultProps = {};

export default GameRoom;
