import initialState from 'redux/initial-states/sendEmail';
import sendEmail from './sendEmail';

export default (state = initialState, action = {}) => ({
  ...state,
  ...sendEmail(state, action),
});
