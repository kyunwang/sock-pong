const theme = {
  color: {
    primary: '',
    secondary: '',
    white: '',
  },
  breakpoint: {
    small: style => `@media (max-aspect-ratio: 1/1) { ${style} }`,
    medium: style =>
      `@media (max-aspect-ratio: 1/1) and (min-height: 30rem) and (max-width: 40rem) { ${style} }`,
    large: style =>
      `@media (min-aspect-ratio: 1/1) and (min-height: 40rem) { ${style} }`,
    wide: style =>
      `@media (min-aspect-ratio: 1/1) and (min-height: 30rem) and (min-width: 60rem) { ${style} }`,
  },
  sizes: {},
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
