import React from 'react';
import ReactDOM from 'react-dom';
import { injectGlobal } from 'styled-components';
import App from './components/App';
import levels from './conf/levels';

/* eslint-disable no-unused-expressions */
injectGlobal`
  @import url('https://fonts.googleapis.com/css?family=Dosis:400,500,600,700,800');

  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: 'Dosis', sans-serif;
    background: url(${process.env.PUBLIC_URL}/background.png) repeat;
  }

  #root {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }
`;

ReactDOM.render(<App levelData={levels[0]} />, document.getElementById('root'));
