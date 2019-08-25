import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const GameRoomClient = ({ roomID }) => {
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
