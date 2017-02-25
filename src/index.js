import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';
import levelFactory from './lib/levels-factory';

import './styles/index.css';

ReactDOM.render(
  <App level={levelFactory(4 ** 2)} />,
  document.getElementById('root'),
);
