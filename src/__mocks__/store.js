import { createStore, applyMiddleware, combineReducers } from 'redux';
import rootReducer from 'redux/reducers';
import initialState from 'redux/initialState';
import apiMiddleware from 'middlewares/apiMiddleware';

const middleware = [apiMiddleware];

const mockStore = createStore(
  combineReducers(rootReducer),
  initialState,
  applyMiddleware(...middleware),
);

export default mockStore;
