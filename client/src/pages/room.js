import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import {
  AppContext,
  AppContextProvider,
} from '../components/context/AppContext';

import { Link } from 'gatsby';
import Container from '../components/general/Container';

import Room from '../modules/GameRoom/GameRoom';

const RoomPage = () => {
  const { global } = useContext(AppContext);
  console.log(global);

  return (
    // <AppContextProvider>
    <Room></Room>
    // </AppContextProvider>
  );
};

RoomPage.propTypes = {};
RoomPage.defaultProps = {};

export default RoomPage;
