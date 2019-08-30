// if there is no socket in the context reirect to /room
import React, { useContext } from 'react';
import { navigate } from 'gatsby';

import {
  AppContext,
  GameContext,
  SocketContext,
} from '../../components/context/AppContext';
// import { useEventListener } from '../general/hooks/hooks';
import Container from '../../components/general/Container';
import PlayRoomController from './Controller/Controller';
import PlayRoomClient from './Client/Client';

const PlayGamePage = () => {
  const {
    global: { isMobile },
  } = useContext(AppContext);

  const { socket } = useContext(SocketContext);
  const { players, playerID } = useContext(GameContext);

  // if (!isMobile && !players.length) {
  if ((!isMobile && !players.length) || (isMobile && !playerID)) {
    navigate('/room');
    return null;
  }

  return (
    <Container>
      {isMobile ? (
        <PlayRoomController socket={socket} />
      ) : (
        <PlayRoomClient socket={socket} />
      )}
    </Container>
  );
};

PlayGamePage.propTypes = {};
PlayGamePage.defaultProps = {};

export default PlayGamePage;
