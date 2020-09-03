import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './containers/App';
import registerServiceWorker from './registerServiceWorker';
import axios from 'axios';



ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
