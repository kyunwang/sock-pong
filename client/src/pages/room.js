import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';

import Container from '../components/general/Container';

import GameRoom from '../modules/GameRoom/GameRoom';

const GameRoomPage = () => (
  <Container>
    {/* <Link to="/">home</Link>
      <Link to="/play">play</Link>
			{roomID} */}

    <GameRoom />
  </Container>
);

GameRoomPage.propTypes = {};
GameRoomPage.defaultProps = {};

export default GameRoomPage;
