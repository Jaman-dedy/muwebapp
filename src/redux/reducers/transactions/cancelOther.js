import {
  CANCEL_OTHER_TRANSACTION_START,
  CANCEL_OTHER_TRANSACTION_SUCCESS,
  CANCEL_OTHER_TRANSACTION_ERROR,
} from 'constants/action-types/transactions/cancelTransaction';

export default (state, { type, payload }) => {
  switch (type) {
    case CANCEL_OTHER_TRANSACTION_START:
      return {
        ...state,
        editOrCancelOther: {
          ...state.editOrCancelOther,
          loading: true,
          error: null,
        },
      };
    case CANCEL_OTHER_TRANSACTION_ERROR:
      return {
        ...state,
        editOrCancelOther: {
          ...state.editOrCancelOther,
          error: payload,
          loading: false,
        },
      };
    case CANCEL_OTHER_TRANSACTION_SUCCESS:
      return {
        ...state,
        editOrCancelOther: {
          ...state.editOrCancelOther,
          error: null,
          loading: false,
          data: payload.data,
        },
        pendingOther: {
          ...state.pendingOther,
          data: {
            ...state.pendingOther.data,
            Data:
              payload.requestData.Modify === 'No'
                ? state.pendingOther.data?.Data?.filter(
                    item =>
                      item.TransferNumber !==
                      payload.requestData.TransferNumber,
                  )
                : state.pendingOther.data?.Data?.map(item => {
                    const newItems = {
                      TransferNumber:
                        payload.requestData.TransferNumber,
                      FirstName: payload.requestData.DestFirstName,
                      LastName: payload.requestData.DestLastName,
                      SecurityCode: payload.requestData.SecurityCode,
                      PhoneNumber:
                        payload.requestData.TargetPhoneNumber,
                      TransactionID:
                        payload.requestData.TransactionID,
                    };
                    const merged = { ...item, ...newItems };

                    if (
                      item.TransferNumber ===
                      payload.requestData.TransferNumber
                    ) {
                      return merged;
                    }
                    return item;
                  }),
          },
        },
      };

    default:
      return null;
  }
};
