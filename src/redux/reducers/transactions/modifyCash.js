import {
  MODIFY_CASH_START,
  MODIFY_CASH_SUCCESS,
  MODIFY_CASH_ERROR,
  CLEAR_MODIFY_CASH_ERRORS,
} from 'constants/action-types/moneyTransfer';

export default (state, { type, payload }) => {
  switch (type) {
    case MODIFY_CASH_START:
      return {
        ...state,
        modifyCash: {
          ...state.modifyCash,
          loading: true,
          error: null,
        },
      };
    case MODIFY_CASH_ERROR:
      return {
        ...state,
        modifyCash: {
          ...state.modifyCash,
          error: payload,
          loading: false,
        },
      };
    case MODIFY_CASH_SUCCESS:
      return {
        ...state,
        modifyCash: {
          ...state.modifyCash,
          error: null,
          loading: false,
          data: payload,
        },
        unPaidCashList: {
          ...state.unPaidCashList,
          data: state.unPaidCashList.data.map(
            ({ SecurityCode, ...allOther }) => {
              const updatedItem = {
                TransferNumber: payload.requestData.VoucherNumber,
                FirstName: payload.requestData.FirstName,
                LastName: payload.requestData.LastName,
                SecurityCode: payload.requestData.SecurityCode,
                SourcePhoneNumber:
                  payload.requestData.TargetPhoneNumber,
              };
              const merged = { ...allOther, ...updatedItem };

              const newMerged = { SecurityCode };
              const newMergedToKeep = {
                ...newMerged,
                ...allOther,
              };
              if (SecurityCode === payload.requestData.SecurityCode) {
                return merged;
              }
              return newMergedToKeep;
            },
          ),
        },
      };

    case CLEAR_MODIFY_CASH_ERRORS: {
      return {
        ...state,
        modifyCash: {
          ...state.modifyCash,
          error: null,
          loading: false,
          data: null,
        },
        confirmTransaction: {
          ...state.confirmTransaction,
          confirmationError: null,
          checking: false,
          confirmationData: null,
        },
        cancelTransaction: {
          ...state.cancelTransaction,
          data: null,
          loading: false,
          error: null,
        },
      };
    }
    default:
      return null;
  }
};
