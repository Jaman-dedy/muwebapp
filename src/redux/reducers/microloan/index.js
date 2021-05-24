import initialState from 'redux/initial-states/microloan';
import getLoanList from './getLoanList';
import applyLoan from './applyLoan';
import checkLoan from './checkLoan';
import payLoan from './payLoan';
import confirmLoan from './confirmLoan';

export default (state = initialState, action = {}) => ({
  ...state,
  ...getLoanList(state, action),
  ...applyLoan(state, action),
  ...checkLoan(state, action),
  ...payLoan(state, action),
  ...confirmLoan(state, action),
});
