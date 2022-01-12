import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Timer } from './timer/Timer';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <Timer />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
