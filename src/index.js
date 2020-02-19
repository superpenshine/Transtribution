import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
// CSS & components
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.css';
// Router
import { BrowserRouter } from 'react-router-dom'; 
// Redux related
import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'; 
import { Provider } from 'react-redux';
import reducer from './store/reducers/auth';

const composeEnhances = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, composeEnhances(
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
