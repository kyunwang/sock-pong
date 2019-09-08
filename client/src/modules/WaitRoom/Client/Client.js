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
import { copyToClipboard } from '../../../../../general/helpers';

const WaitRoomClient = ({ socket }) => {
  const { roomID, setRoomID, players, dispatchPlayers } = useContext(
    GameContext
  );

  useEffect(() => {
    subscribeToClientRegister(socket, uniqueID => setRoomID(uniqueID));
    subscribeToPlayerRegister(socket, ({ result, playerID }) => {
      if (result) {
        if (players.length < 2) {
          dispatchPlayers({ type: 'addPlayer', playerID });
        }
      }
    });
  }, []);

  const handleOnCopy = () => {
    copyToClipboard(roomID);
  };

  const handleOnStart = () => {
    // if (!players.length === 2) return;
    navigate('/play');
  };

  return (
    <>
      <Introduction>
        <StepNumber>1</StepNumber>
        Go to gra-pila.nl o your phone
      </Introduction>
      <CodeContainer>
        <CodeViewer onClick={handleOnCopy}>{roomID}</CodeViewer>
      </CodeContainer>
      <ul>
        {players.map(ID => (
          <li key={ID}>
            - {ID}
            <button
              onClick={() =>
                dispatchPlayers({ type: 'removePlayer', playerID: ID })
              }
            >
              remove
            </button>
          </li>
        ))}
      </ul>

      <StartButton onClick={handleOnStart}>Let's go!</StartButton>
    </>
  );
};

WaitRoomClient.propTypes = {
  socket: PropTypes.object.isRequired,
};
WaitRoomClient.defaultProps = {};

export default WaitRoomClient;
