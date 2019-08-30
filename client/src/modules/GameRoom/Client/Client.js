import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';

import { GameContext } from '../../../components/context/AppContext';
import {
  subscribeToClientRegister,
  subscribeToPlayerRegister,
} from '../../../socket/socketSubscriptions';

import { Introduction, CodeContainer, StartButton } from '../GameRoomStyles';
import { StepNumber, CodeViewer } from './ClientStyles';

const GameRoomClient = ({ socket }) => {
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
      <StartButton>Let's go!</StartButton>
    </>
  );
};

GameRoomClient.propTypes = {
  socket: PropTypes.object.isRequired,
};
GameRoomClient.defaultProps = {};

export default GameRoomClient;
