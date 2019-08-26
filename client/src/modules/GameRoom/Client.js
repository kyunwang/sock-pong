import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { subscribeToReceiveOrientation } from '../../socket/socketSubscriptions';

const GameRoomClient = ({ socket, roomID }) => {
  useEffect(() => {
    subscribeToReceiveOrientation(socket, data => {
      console.log('receive', data);
    });
  }, []);

  return (
    <>
      <p>Gameroom</p>
      <p>
        Go to this site on your phone and enter this code to join the game/room
      </p>
      <pre>CODE - {roomID}</pre>
      <p>No player has entered (List of players (max 2))</p>
      <p>x amount of audience joined</p>
    </>
  );
};

GameRoomClient.propTypes = {};
GameRoomClient.defaultProps = {};

export default GameRoomClient;
