import { CREATE_VOUCHER_CLEAR } from 'constants/action-types/vouchers/createVoucher';

export default () => dispatch => {
  dispatch({ type: CREATE_VOUCHER_CLEAR });
};
