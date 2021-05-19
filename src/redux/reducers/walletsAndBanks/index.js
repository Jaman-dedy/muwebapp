import initialState from 'redux/initial-states/walletsAndBanks';
import linkedBankAccountReducer from './linkedBankAccount';
import linkBankAccountRequestReducer from './linkBankAccountRequest';
import getBankListReducer from './getBankList';
import selfLinkBankAccountReducer from './selfLinkBankAccount';
import unlinkAccountReducer from './unlinkAccount';
import linkBankAccount from './linkBankAccount';
import addMoneyToWalletReducer from './addMoneyToWallet';
import sendMoneyToBankReducer from './sendMoneyToBank';

export default (state = initialState, action = {}) => ({
  ...state,
  ...linkedBankAccountReducer(state, action),
  ...linkBankAccountRequestReducer(state, action),
  ...getBankListReducer(state, action),
  ...selfLinkBankAccountReducer(state, action),
  ...unlinkAccountReducer(state, action),
  ...linkBankAccount(state, action),
  ...addMoneyToWalletReducer(state, action),
  ...sendMoneyToBankReducer(state, action),
});
