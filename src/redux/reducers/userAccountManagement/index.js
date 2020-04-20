import initialState from 'redux/initial-states/user';
import saveUserDataReducer from './saveUserData';
import updateUserPhoneListReducer from './updateUserPhoneList';
import updateUserEmailListReducer from './updateUserEmailList';
import updateSecurityQuestionsReducer from './updateSecurityQuestions';
import updatePasswordReducer from './updatePassword';
import updatePINReducer from './updatePIN';
import updateDOBReducer from './updateDOB';

export default (state = initialState, action = {}) => ({
  ...state,
  ...saveUserDataReducer(state, action),
  ...updateUserPhoneListReducer(state, action),
  ...updateUserEmailListReducer(state, action),
  ...updateSecurityQuestionsReducer(state, action),
  ...updatePINReducer(state, action),
  ...updatePasswordReducer(state, action),
  ...updateDOBReducer(state, action),
});
