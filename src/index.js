import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import init from './Config';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App init={init} />, document.getElementById('root'));
registerServiceWorker();
