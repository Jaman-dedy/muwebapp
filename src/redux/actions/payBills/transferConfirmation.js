import {
  TRANSFER_CONFIRMATION_START,
  TRANSFER_CONFIRMATION_SUCCESS,
  TRANSFER_CONFIRMATION_ERROR,
} from 'constants/action-types/payBills/transferConfirmation';
import apiAction from 'helpers/apiAction';
import { SUPPLIERS_PAY_BILLS } from 'constants/general';

export default data => dispatch =>
  dispatch(
    apiAction({
      method: 'post',
      url: '/TransferConfirmation',
      data: {
        PIN: data.pin,
        CountryCode: data.CountryCode,
        TargetType: SUPPLIERS_PAY_BILLS,
        Amount: data.Amount,
        SourceWallet: data.WalletNumber,
        TargetCurrency: data.Currency,
      },
      onStart: () => dispatch =>
        dispatch({
          type: TRANSFER_CONFIRMATION_START,
        }),
      onSuccess: data => dispatch => {
        return dispatch({
          type: TRANSFER_CONFIRMATION_SUCCESS,
          payload: {
            data: data[0],
          },
        });
      },
      onFailure: error => dispatch => {
        return dispatch({
          type: TRANSFER_CONFIRMATION_ERROR,
          payload: {
            error: error[0],
          },
        });
      },
    }),
  );
