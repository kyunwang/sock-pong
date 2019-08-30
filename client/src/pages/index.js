import React from 'react';
import { Link } from 'gatsby';

import Container from '../components/general/Container';

export default () => {
  return (
    <Container>
      <Link to="/room">page</Link>
      <h1>Title</h1>
      <p>Paragraph</p>
    </Container>
  );
};
