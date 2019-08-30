import styled from 'styled-components';
import { codeStyle } from '../GameRoomStyles';

export const CodeInput = styled.input`
  ${codeStyle}
  outline: none;

  &::placeholder {
    opacity: 0.6;
    letter-spacing: 1.5rem;
  }
`;
