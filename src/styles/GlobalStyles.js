import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body, #root {
    width: 100%;
    height: 100%;
    font-family: 'Poppins', sans-serif;
    background-color: ${props => props.theme.colors.background};
    color: ${props => props.theme.colors.text};
    overflow-x: hidden;
    scroll-behavior: smooth;
    
    /* Hide scrollbar but keep functionality */
    &::-webkit-scrollbar {
      display: none; /* Safari and Chrome */
    }
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
  }

  body {
    line-height: 1.5;
  }

  #root {
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 100%;
    margin: 0;
    padding: 0;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  button {
    cursor: pointer;
    border: none;
    outline: none;
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: 700;
  }

  canvas {
    touch-action: none;
  }

  .container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;

    @media (min-width: 768px) {
      padding: 0 2rem;
    }
  }

  section {
    padding: 6rem 0;
    width: 100%;
  }
`;

export default GlobalStyles;