import initialState from 'redux/initial-states/dashboard';
import addReferral from './addReferral';

export default (state = initialState, action = {}) => ({
  ...state,
  ...addReferral(state, action),
});
