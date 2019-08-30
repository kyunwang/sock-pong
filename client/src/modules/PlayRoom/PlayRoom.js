// if there is no socket in the context reirect to /room
import React, { useContext, useEffect } from 'react';
import { navigate } from 'gatsby';

import {
  AppContext,
  GameContext,
  SocketContext,
} from '../../components/context/AppContext';
// import { useEventListener } from '../general/hooks/hooks';
import Container from '../../components/general/Container';
import PlayRoomController from './Controller/Controller';

const PlayGamePage = () => {
  const {
    global: { isMobile },
  } = useContext(AppContext);

  const { socket } = useContext(SocketContext);
  const { players } = useContext(GameContext);

  if (!players.length) {
    navigate('/room');
  }

  return (
    <Container>{isMobile && <PlayRoomController socket={socket} />}</Container>
  );
};

PlayGamePage.propTypes = {};
PlayGamePage.defaultProps = {};

export default PlayGamePage;
