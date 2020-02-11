import initialState from 'redux/initial-states/dashboard';
import dashboardReducerRd from './dashboard';

export default (state = initialState, action = {}) => ({
  ...state,
  ...dashboardReducerRd(state, action),
});
