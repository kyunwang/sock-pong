import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { socketEmitter } from '../../socket/socket';
import { SOCKET_ACTIONS } from '../../../../general/socketConsts';

const GameRoomController = ({ roomID, socket }) => {
  // const { roomID, setRoomID } = useContext(GameContext);
  const [entryID, setEntryID] = useState('');

  const handleSubmit = e => {
    if (!roomID && (entryID && entryID >= 10000 && entryID <= 99999)) {
      socketEmitter(socket, SOCKET_ACTIONS.REGISTER_PLAYER, entryID);
    }
    e.preventDefault();
  };

  const handleOnChange = ({ target: { value } }) => {
    if (value <= 99999) {
      setEntryID(value);
    }
  };

  return (
    <>
      <p>Controller - {roomID}</p>

      <form onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="e.g. 94587"
          onChange={handleOnChange}
          value={entryID}
        ></input>
        {/* <input type="submit">Enter</input> */}
        <button>Enter</button>
      </form>
    </>
  );
};

GameRoomController.propTypes = {};
GameRoomController.defaultProps = {};

export default GameRoomController;
