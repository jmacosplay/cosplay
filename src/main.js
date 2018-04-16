import "babel-polyfill"

import React from 'react'
import ReactDOM from 'react-dom'

import Renderer from './renderer';

import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import {Provider} from 'react-redux';
import reducer from './reducer'

import {loadImages} from './sagas';

const store = createStore(
    reducer,
    applyMiddleware(createSagaMiddleware(loadImages))
);


ReactDOM.render(
    <Provider store ={store}>
    <Renderer />
    </Provider>,
    document.getElementById('jmatitle')
);