import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { navigate } from 'gatsby';

import { GameContext } from '../../../components/context/AppContext';
import {
  subscribeToClientRegister,
  subscribeToPlayerRegister,
} from '../../../socket/socketSubscriptions';

import { Introduction, CodeContainer, StartButton } from '../WaitRoomStyles';
import { StepNumber, CodeViewer } from './ClientStyles';

const WaitRoomClient = ({ socket }) => {
  const { roomID, setRoomID, players, setPlayers } = useContext(GameContext);

  useEffect(() => {
    subscribeToClientRegister(socket, uniqueID => setRoomID(uniqueID));
    subscribeToPlayerRegister(socket, ({ result, playerID }) => {
      if (result) {
        if (players.length < 2) setPlayers([...players, playerID]);
        console.log('Added player: ', playerID);
      }
    });
  }, []);

  const handleOnClick = () => {
    // if (!players.length === 2) return;
    navigate('/play', {
      state: { players, roomID },
    });
  };

  return (
    <>
      <Introduction>
        <StepNumber>1</StepNumber>
        Go to gra-pila.nl o your phone
      </Introduction>
      <CodeContainer>
        <CodeViewer>{roomID}</CodeViewer>
      </CodeContainer>
      <ul>
        {players.map(ID => (
          <li>- {ID}</li>
        ))}
      </ul>
      <StartButton onClick={handleOnClick}>Let's go!</StartButton>
    </>
  );
};

WaitRoomClient.propTypes = {
  socket: PropTypes.object.isRequired,
};
WaitRoomClient.defaultProps = {};

export default WaitRoomClient;
