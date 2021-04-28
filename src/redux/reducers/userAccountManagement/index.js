import initialState from 'redux/initial-states/userAccountManagement';
import saveUserDataReducer from './saveUserData';
import updateUserPhoneListReducer from './updateUserPhoneList';
import updateUserEmailListReducer from './updateUserEmailList';
import updateSecurityQuestionsReducer from './updateSecurityQuestions';
import updatePasswordReducer from './updatePassword';
import updatePINReducer from './updatePIN';
import updateDOBReducer from './updateDOB';
import updateGenderReducer from './updateGender';
import switchUserAccountReducer from './switchUserAccount';
import getBusinessTypeReducer from './getBusinessType';

export default (state = initialState, action = {}) => ({
  ...state,
  ...getBusinessTypeReducer(state, action),
  ...updateSecurityQuestionsReducer(state, action),
  ...updatePINReducer(state, action),
  ...updatePasswordReducer(state, action),
  ...updateDOBReducer(state, action),
  ...updateGenderReducer(state, action),
  ...switchUserAccountReducer(state, action),
  ...updateUserPhoneListReducer(state, action),
  ...updateUserEmailListReducer(state, action),
  ...saveUserDataReducer(state, action),
});
