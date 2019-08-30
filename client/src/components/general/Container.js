import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.section`
  position: relative;
  height: 100%;
`;

const Container = props => <Wrapper {...props}>{props.children}</Wrapper>;

export default Container;
