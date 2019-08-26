// if there is no socket in the context reirect to /room
import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { navigate } from 'gatsby';

import { GameContext } from '../components/context/AppContext';

const PlayGamePage = () => {
  const { players } = useContext(GameContext);

  if (!players.length) {
    navigate('/room');
  }

  useEffect(() => {}, []);

  return (
    <p>
      dsadsadasdasd<span>dsad</span>
    </p>
  );
};

PlayGamePage.propTypes = {};
PlayGamePage.defaultProps = {};

export default PlayGamePage;
