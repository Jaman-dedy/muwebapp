import initialState from 'redux/initial-states/remindUsername.js';
import remindUsername from './remindUsername';

export default (state = initialState, action = {}) => ({
  ...state,
  ...remindUsername(state, action),
});
