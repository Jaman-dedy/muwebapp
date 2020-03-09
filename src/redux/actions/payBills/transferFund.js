import {
  TRANSFER_FUND_START,
  TRANSFER_FUND_SUCCESS,
  TRANSFER_FUND_ERROR,
} from 'constants/action-types/payBills/transferFund';
import apiAction from 'helpers/apiAction';

export default data => dispatch =>
  dispatch(
    apiAction({
      method: 'post',
      url: '/PayInvoice',
      data: {
        PIN: data.Pin,
        SupplierID: data.Supplier,
        CountryCode: data.CountryCode,
        InvoiceNumber: data.InvoiceNumber,
        CustomerID: data.ClientNumber,
        InvoiceDate: data.InvoiceDate,
        SourceWallet: data.WalletNumber,
        SourceAmount: data.Amount,
        Reference: data.Reference,
        Description: data.Description,
        NoteToSupplier: data.SupplierNote,
      },
      onStart: () => dispatch =>
        dispatch({
          type: TRANSFER_FUND_START,
        }),
      onSuccess: data => dispatch => {
        return dispatch({
          type: TRANSFER_FUND_SUCCESS,
          payload: {
            data: data[0],
          },
        });
      },
      onFailure: error => dispatch => {
        return dispatch({
          type: TRANSFER_FUND_ERROR,
          payload: {
            error: error[0],
          },
        });
      },
    }),
  );
