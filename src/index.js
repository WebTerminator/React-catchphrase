import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import questions from './questions';

ReactDOM.render(<App questions={questions} />, document.getElementById('root'));
registerServiceWorker();
