import React from 'react';
// import { Link } from 'gatsby';

import Container from '../components/general/Container';
import GameRoom from '../modules/WaitRoom/WaitRoom';

const WaitRoomPage = () => (
  <Container>
    {/* <Link to="/">home</Link>
      <Link to="/play">play</Link>
			{roomID} */}

    <GameRoom />
  </Container>
);

WaitRoomPage.propTypes = {};
WaitRoomPage.defaultProps = {};

export default WaitRoomPage;
