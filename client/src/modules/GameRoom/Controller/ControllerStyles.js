import styled from 'styled-components';
import { codeStyle } from '../GameRoomStyles';

export const CodeInput = styled.input`
  ${codeStyle}
  outline: none;

  &::placeholder {
    font-size: inherit;
    letter-spacing: 1.5rem;
    opacity: 0.6;
  }
`;
