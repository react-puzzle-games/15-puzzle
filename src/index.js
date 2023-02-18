// @ts-check

import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import levelFactory from './lib/levels-factory';

import './styles/index.css';

const MuiTheme = () => (
    <App level={levelFactory(4 ** 2)} />
);

ReactDOM.render(<MuiTheme />, document.getElementById('root'));
