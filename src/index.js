import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './view/components/App.js';
import './view/stylesheets/index.css';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App />
);

//<React.StrictMode>
//</React.StrictMode>




/*
To do:
- convert store instances to classes
- make pages



done:
- do gameover
- diagnose weird errors (maybe async issue with updates)
- make observed var a class
- make fading work
- get moving to work
- update controllers
- get rid of excess animator files
- fix emitter issues
- make keyboard, timer into singletons
- make animator into singleton?


*/
