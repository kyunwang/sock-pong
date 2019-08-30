import React, { useContext, useEffect } from 'react';

import { AppContext, SocketContext } from '../../components/context/AppContext';

import WaitRoomClient from './Client/Client';
import WaitRoomController from './Controller/Controller';
import { Container, Title } from './WaitRoomStyles';

const WaitRoom = () => {
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
          <WaitRoomController socket={socket} />
        ) : (
          <WaitRoomClient socket={socket} />
        )}
        {/* <StartButton onClick={() => {}}>Let's go</StartButton> */}
      </Container>
    </>
  );
};

WaitRoom.propTypes = {};
WaitRoom.defaultProps = {};

export default WaitRoom;
