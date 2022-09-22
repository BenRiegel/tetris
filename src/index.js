import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './view/components/App.js';
import './controller/keyboard-controller.js';
import './controller/timer-controller.js';
import './controller/state-controller.js';
import './view/stylesheets/index.css';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App />
);

//<React.StrictMode>
//</React.StrictMode>
