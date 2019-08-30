import React, { useEffect, useContext, useState } from 'react';
import PropTypes from 'prop-types';

import { GameContext } from '../../../components/context/AppContext';
import { subscribeToReceiveOrientation } from '../../../socket/socketSubscriptions';

const PlayRoomClient = ({ socket }) => {
  const { players } = useContext(GameContext);

  const [alpha, setAlpha] = useState(0);

  useEffect(() => {
    subscribeToReceiveOrientation(socket, data => {
      console.log('orientation: ', data.orientation);
      setAlpha(data.orientation.alpha);
    });
  }, []);

  return (
    <p>
      <span>pr client</span>
      <ul>
        {players.map(id => (
          <li key={id}>
            {id} - {alpha}
          </li>
        ))}
      </ul>
    </p>
  );
};

PlayRoomClient.propTypes = {
  socket: PropTypes.object.isRequired,
};
PlayRoomClient.defaultProps = {};

export default PlayRoomClient;
