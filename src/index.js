import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {createStore, applyMiddleware, compose} from 'redux';
import rootReducer from "./local-men/redux/reducers";
import  thunk  from 'redux-thunk';
import {Provider} from 'react-redux';

const middleware = [thunk];

const composeEnhancers =
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? // this is to see the store in the browser
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
            // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
        }) : compose;

const enhancer = composeEnhancers(
    applyMiddleware(...middleware),
);

const store = createStore(
    rootReducer,
    enhancer,
);

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>
    , document.getElementById('root')
);

serviceWorker.unregister();

