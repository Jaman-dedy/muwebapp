import initialState from 'redux/initial-states/dashboard';
import getStoreCategoriesReducer from './getStoreCategories';
import addUpdateStoreReducer from './addUpdateStore';
import getComments from './getComments';

export default (state = initialState, action = {}) => ({
  ...state,
  ...getStoreCategoriesReducer(state, action),
  ...addUpdateStoreReducer(state, action),
  ...getComments(state, action),
});
