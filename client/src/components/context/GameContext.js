import React from 'react';
import PropTypes from 'prop-types';

const contextData = {
  socket: null,
};

const GameContext = React.createContext(contextData);

const GameContextContainer = props => (
  <GameContext.Provider>{props.children}</GameContext.Provider>
);

export default GameContextContainer;
