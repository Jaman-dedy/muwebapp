import initialState from 'redux/initial-states/dashboard';
import getStoreCategoriesReducer from './getStoreCategories';
import addUpdateStoreReducer from './addUpdateStore';
import getComments from './getComments';
import postComment from './postComment';
import addStoreAgents from './addStoreAgents';
import listStoreAgents from './listStoreAgents';
import deleteStoreAgents from './deleteStoreAgents';


export default (state = initialState, action = {}) => ({
  ...state,
  ...getStoreCategoriesReducer(state, action),
  ...addUpdateStoreReducer(state, action),
  ...getComments(state, action),
  ...postComment(state, action),
  ...addStoreAgents(state, action),
  ...listStoreAgents(state, action),
  ...deleteStoreAgents(state, action),
});
