import { css } from 'styled-components';

export const largeTitle = css`
  font-size: 3rem;
  font-weight: 800;
  line-height: 0.9;
  letter-spacing: 0.2rem;
`;

export const paragraph = css`
  font-weight: 300;
  line-height: 1.3;
`;

export const button = css`
  font-weight: 800;
  letter-spacing: 0.2rem;
  text-transform: uppercase;
`;

// For buttons etc
export const redefineFont = css`
  font-family: 'Hiragino Sans', 'work sans', sans-serif;
  font-weight: 400;
  font-size: 16px; /* 1rem = 16px */
  color: ${({ theme }) => theme.color.black};
  line-height: 1.2;
`;
