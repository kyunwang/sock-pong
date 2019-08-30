import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { subscribeToReceiveOrientation } from '../../../socket/socketSubscriptions';
import { Introduction, CodeContainer, StartButton } from '../GameRoomStyles';
import { StepNumber, CodeViewer } from './ClientStyles';

const GameRoomClient = ({ socket, roomID }) => {
  // useEffect(() => {
  //   subscribeToReceiveOrientation(socket, data => {
  //     console.log('receive', data);
  //   });
  // }, []);

  return (
    <>
      <Introduction>
        <StepNumber>1</StepNumber>
        Go to gra-pila.nl o your phone
      </Introduction>
      <CodeContainer>
        <CodeViewer>21321</CodeViewer>
      </CodeContainer>
      <StartButton>Let's go!</StartButton>
    </>
  );
};

GameRoomClient.propTypes = {};
GameRoomClient.defaultProps = {};

export default GameRoomClient;
