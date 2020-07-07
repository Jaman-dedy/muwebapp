import initialState from 'redux/initial-states/dashboard';
import getStoreCategoriesReducer from './getStoreCategories';
import addUpdateStoreReducer from './addUpdateStore';
import getComments from './getComments';
import postComment from './postComment';

export default (state = initialState, action = {}) => ({
  ...state,
  ...getStoreCategoriesReducer(state, action),
  ...addUpdateStoreReducer(state, action),
  ...getComments(state, action),
  ...postComment(state, action),
});
