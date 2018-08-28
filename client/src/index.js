import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

// question, in Andrew's course, we use babel to compile jsx/es6, 
// it feels like everything works fine without babel???
// how do we transform jsx in this course?