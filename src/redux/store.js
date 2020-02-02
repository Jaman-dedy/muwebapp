import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import rootReducer from './reducers';
import initialState from './initialState';
import apiMiddleware from '../middlewares/apiMiddleware';

const middleware = [apiMiddleware];

const store = createStore(
  combineReducers(rootReducer),
  initialState,
  composeWithDevTools(applyMiddleware(...middleware)),
);

export default store;
