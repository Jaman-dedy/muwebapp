import { CLEAR_TRANSFER_FUND_STORE } from 'constants/action-types/payBills/transferFund';
import { CLEAR_TRANSFER_CONFIRMATION_STORE } from 'constants/action-types/payBills/transferConfirmation';

export default () => dispatch => {
  dispatch({
    type: CLEAR_TRANSFER_FUND_STORE,
  });
  dispatch({
    type: CLEAR_TRANSFER_CONFIRMATION_STORE,
  });
};
