import styled from 'styled-components';
import { codeStyle } from '../GameRoomStyles';

export const CodeViewer = styled.div`
  ${codeStyle}
  display: flex;
  align-items: center;
`;

export const StepNumber = styled.span`
  font-size: 8rem;
  font-weight: 800;
  opacity: 0.1;
`;
