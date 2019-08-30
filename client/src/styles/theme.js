const theme = {
  color: {
    primary: '#F0DCC1',
    secondary: '#F24E8A',
    white: '#fff',
    black: '#4a4a4a',
    greyLight: '#F3F3F3',
    // shadow: rgba(0, 0, 0),
  },
  breakpoint: {
    small: style => `@media (max-aspect-ratio: 1/1) { ${style} }`,
    medium: style => `@media (min-width: 40rem) { ${style} }`,
    // medium: style =>
    //   `@media (max-aspect-ratio: 1/1) and (min-height: 30rem) and (max-width: 40rem) { ${style} }`,
    large: style =>
      `@media (min-aspect-ratio: 1/1) and (min-height: 40rem) { ${style} }`,
    // large: style =>
    //   `@media (min-aspect-ratio: 1/1) and (min-height: 40rem) { ${style} }`,
    wide: style =>
      `@media (min-aspect-ratio: 1/1) and (min-height: 30rem) and (min-width: 60rem) { ${style} }`,
  },
  transition: {
    duration: {
      // currently arbitrarily added
      short: 100,
      normal: 300,
      long: 500,
    },
    bezier: {
      easeOutQuint: 'cubic-bezier(.237,1,.237,1)',
    },
  },
};

export default theme;
