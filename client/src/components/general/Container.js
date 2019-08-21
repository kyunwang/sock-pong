import React from 'react';
import styled, { css } from 'styled-components';

const Wrapper = styled.section``;

const Container = props => <Wrapper {...props}>{props.children}</Wrapper>;

export default Container;
