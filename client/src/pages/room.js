import React from 'react';
// import { Link } from 'gatsby';

import Container from '../components/general/Container';
import WaitRoom from '../modules/WaitRoom/WaitRoom';

const WaitRoomPage = () => (
  <Container>
    {/* <Link to="/">home</Link>
      <Link to="/play">play</Link>
			{roomID} */}

    <WaitRoom />
  </Container>
);

WaitRoomPage.propTypes = {};
WaitRoomPage.defaultProps = {};

export default WaitRoomPage;
