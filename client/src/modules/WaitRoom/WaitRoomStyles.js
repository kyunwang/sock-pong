import styled, { css } from 'styled-components';
import {
  largeTitle,
  paragraph,
  redefineFont,
  button,
} from '../../styles/fonts';

export const Container = styled.section`
  position: relative;
  top: 50%;
  transform: translate(0, -50%);
  height: 75%;
  width: 75%;
  max-width: 28rem;
  background-color: ${({ theme: { color } }) => color.greyLight};
  /* border-radius: 0 1.6rem 1.6rem 0; */
  border-radius: 0 1.6rem 0 0;
  padding: 0 2.4rem 0 1rem;

  box-shadow: 0 12px 20px rgba(0, 0, 0, 0.2);
`;

export const Title = styled.h1`
	${largeTitle}
  position: relative;
	top: -2rem;
	/* left:  */

  &::after {
    content: '${({ text }) => (text ? text : '')}';
    display: inline-block;
    position: absolute;
    left: .15rem;
    top: .15rem;
		opacity: .3;
  }
`;

export const Introduction = styled.p`
  ${paragraph}
`;

export const StartButton = styled.button`
  ${redefineFont}
  ${button}
  position: absolute;
  bottom: 0;
  left: 0;
  height: 4rem;
  width: 100%;
  background-color: ${({ theme: { color } }) => color.primary};
  border: none;
  border-radius: 0 1.6rem 0 0;
`;

export const SystemMessage = styled.p`
  position: absolute;
  bottom: -1.2rem;
  left: 1rem;
  font-size: 0.75rem;
  font-weight: 200;
  color: ${({ theme: { color } }) => color.secondary};
  /* color depends on status */
  width: 110%;
  /* overflow */
`;

export const CodePeek = styled.div`
  position: absolute;
  top: 50%;
  right: -2.4rem;
  font-size: 4.4rem;
  font-weight: 800;
  opacity: 0.1;
  transform: translateY(-50%);
  writing-mode: vertical-rl;
  text-orientation: upright;
  text-combine-upright: digits 5;
`;

export const CodeContainer = styled.div`
	--translateX: -120%;

  position: absolute;
  top: 50%;
  left: 0;
  transform: translate(0, -50%);
  background-color: ${({ theme: { color } }) => color.white};
  height: 3.6rem;
  width: 70%;
  border-radius: 0 2.2rem 2.2rem 0;

  &::after {
    content: '';
    display: inline-block;
    position: absolute;
    height: 100%;
		width: 100%;
    /* width - props based */
    /* width: ${({ afterWidth = 0 }) => `${afterWidth.length * (100 / 5)}%`}; */

    background-color: ${({ theme: { color } }) => color.primary};
    border-radius: inherit;
		transform: translateX(var(--translateX, -100%));
  }

  ${({ theme: { breakpoint } }) =>
    breakpoint.medium(`
	`)}
  
	${({ theme: { breakpoint } }) =>
    breakpoint.large(`
			height: 4.8rem;
	`)}
`;

export const codeStyle = css`
  ${redefineFont}
  position: absolute;
  left: 1.2rem;
  font-size: 1.2rem;
  font-weight: 800;
  letter-spacing: 1.2rem;

  height: 100%;
  width: 100%;
  background-color: transparent;
  border: none;
  z-index: 1;

  ${({ theme: { breakpoint } }) =>
    breakpoint.medium(`
	`)}

  ${({ theme: { breakpoint } }) =>
    breakpoint.large(`
		left: 2rem;
		font-size: 2rem;
		letter-spacing: 1.8rem;
	`)}
`;
