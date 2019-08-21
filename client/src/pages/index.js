import React, { useState } from 'react';
import styled from 'styled-components';
import Container from '../components/general/Container';
import { initSocket } from '../general/socket';

export default () => {
  const [socketURL, setSocketURL] = useState('http://192.168.1.8/7000');
  const socket = initSocket({
    url: '192.168.1.8:7000',
    config: {
      transports: ['websocket', 'xhr-polling'],
    },
  });

  return (
    <Container>
      <h1>Title</h1>
      <p>Paragraph</p>
    </Container>
  );
};
