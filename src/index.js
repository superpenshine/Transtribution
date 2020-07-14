import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
// CSS & components
import './vectorIcon.css'
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import App from './App';
// Router
import { BrowserRouter } from 'react-router-dom'; 
// Redux related
import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'; 
import { Provider } from 'react-redux';
import reducer from './store/reducers/reducer';
// Google analytics
import ReactGA from 'react-ga';

require('react-web-vector-icons/fonts');
ReactGA.initialize('UA-108528327-2', {debug: false});
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ trace: false, traceLimit: 10 }) || compose;
const store = createStore(reducer, composeEnhancers(
    applyMiddleware(thunk)
));

ReactDOM.render(            
    <BrowserRouter>
        <Provider store={ store }>
            <App/>
        </Provider>
    </BrowserRouter>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

// Use this in browser console to check tab index
// document.addEventListener('keyup', function() {console.log(document.activeElement)})
