import initialState from 'redux/initial-states/authWrapper';
import getDailyEvent from './dailyEvent';

export default (state = initialState, action = {}) => ({
  ...state,
  ...getDailyEvent(state, action),
});
