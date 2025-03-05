import React from 'react';
import ReactDOM from 'react-dom/client';
import HelloWorld from './components/HelloWorld';
import Time from './components/Time';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <HelloWorld />
        <Time />
    </React.StrictMode>
);

reportWebVitals(console.log);