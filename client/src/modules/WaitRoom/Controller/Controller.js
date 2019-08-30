import React, { useState, useContext, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { navigate } from 'gatsby';

import { GameContext } from '../../../components/context/AppContext';
import { emitRegisterPlayer } from '../../../socket/socketEmitters';

import {
  Introduction,
  CodeContainer,
  SystemMessage,
  StartButton,
} from '../WaitRoomStyles';
import { CodeInput } from './ControllerStyles';
import {
  subscribeToPlayerIDRegister,
  subscribeToPlayerRegister,
} from '../../../socket/socketSubscriptions';

const WaitRoomController = ({ socket }) => {
  const conRef = useRef(null);
  const { roomID, setRoomID, playerID, setPlayerID, players } = useContext(
    GameContext
  );
  const [entryID, setEntryID] = useState('');

  useEffect(() => {
    subscribeToPlayerIDRegister(socket, uniqueID => setPlayerID(uniqueID));
    subscribeToPlayerRegister(socket, ({ result }) => {
      setRoomID(result);

      navigate('/play');
    });
  });

  const handleSubmit = e => {
    if (!roomID && (entryID && entryID >= 10000 && entryID <= 99999)) {
      const data = { socket, data: { playerID, entryID } };

      emitRegisterPlayer(data);
    }
    e.preventDefault();
  };

  const handleOnChange = ({ target }) => {
    if (target.value <= 99999) {
      setEntryID(target.value);
      // conRef.current.style.setProperty(
      //   '--translateX',
      //   target.value.length * 20 + '%'
      // );
    }
  };

  return (
    <>
      {/* <CodePeek>{12456}</CodePeek> */}
      <Introduction>
        Go to xxx.com and enter the game code displayed
      </Introduction>
      <CodeContainer ref={conRef} afterWidth={entryID}>
        <CodeInput
          type="number"
          onChange={handleOnChange}
          value={entryID}
          placeholder="\\\\\"
        />
        <SystemMessage status="">Wups, no game has this code</SystemMessage>
      </CodeContainer>
      <StartButton onClick={handleSubmit}>Let's go</StartButton>
    </>
  );
};

WaitRoomController.propTypes = {
  socket: PropTypes.object.isRequired,
};
WaitRoomController.defaultProps = {};

export default WaitRoomController;
