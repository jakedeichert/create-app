import * as React from 'react';
import { BrowserRouter, Switch, Redirect, Route } from 'react-router-dom';
import { injectGlobal } from 'styled-components';
import HomePage from 'components/HomePage';
import AboutPage from 'components/AboutPage';

injectGlobal`
  * {
    border: 0;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    font-size: 125%;
  }

  body {
    font-family: 'Helvetica Neue', 'Arial', 'sans-serif';
  }
`;

const basePath = process.env.BASE_PATH || '';

const AppRoot: React.SFC<{}> = () => (
  <BrowserRouter basename={basePath}>
    <Switch>
      <Route path="/" exact component={HomePage} />
      <Route path="/about" component={AboutPage} />
      <Redirect to="/" />
    </Switch>
  </BrowserRouter>
);

export default AppRoot;
