import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Container from '../components/general/Container';

import { Link } from 'gatsby';

export default () => {
  return (
    <Container>
      <Link to="/room">page</Link>
      <h1>Title</h1>
      <p>Paragraph</p>
    </Container>
  );
};
