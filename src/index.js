// @ts-check

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import levelFactory from './lib/levels-factory';

import './styles/index.css';

const MuiTheme = () => (
  <MuiThemeProvider>
    <App level={levelFactory(4 ** 2)} />
  </MuiThemeProvider>
);

ReactDOM.render(<MuiTheme />, document.getElementById('root'));
