import React, { useEffect, useContext, useState } from 'react';
import PropTypes from 'prop-types';

import { GameContext } from '../../../components/context/AppContext';
import { subscribeToReceiveOrientation } from '../../../socket/socketSubscriptions';
import Pong from './Pong/Pong';

const PlayRoomClient = ({ socket }) => {
  const { players } = useContext(GameContext);
  const [coords, setCoords] = useState([null, null]);

  const handleSub = data => {
    // orienation, playerID
    const playerIndex = players.indexOf(data.playerID); // should be only 0 or 1
    setCoords(oldArr => [
      ...oldArr.slice(0, playerIndex),
      data.orientation,
      ...oldArr.slice(playerIndex + 1, coords.length),
    ]);
  };

  // useEffect(() => {
  //   subscribeToReceiveOrientation(socket, handleSub);
  // }, []);

  return (
    <>
      <span>pr client</span>
      <ul>
        {players.length &&
          coords.length &&
          players.map((id, index) => (
            <li key={id}>
              {id} - {coords[index] && coords[index].alpha}
            </li>
          ))}
      </ul>
      <Pong socket={socket} players={players} />
    </>
  );
};

PlayRoomClient.propTypes = {
  socket: PropTypes.object.isRequired,
};
PlayRoomClient.defaultProps = {};

export default PlayRoomClient;
