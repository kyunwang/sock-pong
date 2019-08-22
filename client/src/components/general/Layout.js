import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import styled, { ThemeProvider } from 'styled-components';

import GlobalStyle from '../../styles/global';
import theme from '../../styles/theme';
// import favicon
// import navigation
import AppContextProvider from '../context/AppContext';

const Layout = ({ children }) => (
  <ThemeProvider theme={theme}>
    <>
      <GlobalStyle />
      <Helmet>
        <html lang="en" />
        {/* <link rel="icon" href={favicon} /> */}
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Helmet>
      <AppContextProvider>
        <main>{children}</main>
      </AppContextProvider>
    </>
  </ThemeProvider>
);

export default Layout;
