import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import './styles/index.css';
import levelFactory from './lib/levels-factory';

ReactDOM.render(
  <App level={levelFactory(4 ** 2)} />,
  document.getElementById('root'),
);
