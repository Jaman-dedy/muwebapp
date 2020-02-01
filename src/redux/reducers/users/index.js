import initialState from 'redux/initial-states/user';
import loginReducer from './login';
import searchUserReducer from './searchUser';

export default (state = initialState, action = {}) => ({
  ...state,
  ...loginReducer(state, action),
  ...searchUserReducer(state, action),
});
