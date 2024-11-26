import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, 
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    line-height: 1.6;
    background-color: ${props => props.theme.colors.background};
    color: ${props => props.theme.colors.text};
  }

  a {
    text-decoration: none;
    color: inherit;
  }
`;

export default GlobalStyle;
