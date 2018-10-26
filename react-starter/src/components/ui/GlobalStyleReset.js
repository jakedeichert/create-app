import { createGlobalStyle } from 'styled-components';

const GlobalStyleReset = createGlobalStyle`
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

export default GlobalStyleReset;
