import React from 'react';
import PropTypes from 'prop-types';

import { subscribeToReceiveOrientation } from '../../../socket/socketSubscriptions';

const PlayRoomClient = ({ socket }) => {
  useEffect(() => {
    subscribeToReceiveOrientation(socket, data => {
      console.log('orientation: ', data);
    });
  }, []);

  return (
    <p>
      <span>pr client</span>
    </p>
  );
};

PlayRoomClient.propTypes = {
  socket: PropTypes.object.isRequired,
};
PlayRoomClient.defaultProps = {};

export default PlayRoomClient;
