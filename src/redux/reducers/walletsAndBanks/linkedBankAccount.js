import {
  GET_LINKED_BANK_ACCOUNTS_FAILURE,
  GET_LINKED_BANK_ACCOUNTS_START,
  GET_LINKED_BANK_ACCOUNTS_SUCCESS,
  UPDATE_LINKED_BANK_LIST,
  REMOVE_UNLINKED_ACCOUNT,
} from 'constants/action-types/walletsAndBanks/bankAccounts';

export default (state, { type, payload }) => {
  switch (type) {
    case GET_LINKED_BANK_ACCOUNTS_START:
      return {
        ...state,
        linkedBankAccounts: {
          ...state.linkedBankAccounts,
          loading: true,
          error: null,
        },
      };
    case GET_LINKED_BANK_ACCOUNTS_SUCCESS:
      return {
        ...state,
        linkedBankAccounts: {
          ...state.linkedBankAccounts,
          data: payload.data,
          loading: false,
        },
      };
    case REMOVE_UNLINKED_ACCOUNT:
      return {
        ...state,
        linkedBankAccounts: {
          ...state.linkedBankAccounts,
          data: state.linkedBankAccounts?.data?.filter(account => {
            if (
              account?.BankCode === payload?.BankCode &&
              account?.AccountNumber === payload?.AccountNumber
            ) {
              return false;
            }
            return true;
          }),
        },
      };
    case UPDATE_LINKED_BANK_LIST:
      if (payload.update) {
        const accounts = [...state.linkedBankAccounts?.data];
        const accountIndex = state.linkedBankAccounts?.data.findIndex(
          ({ BankCode, AccountNumber }) =>
            BankCode === payload?.data.BankCode &&
            AccountNumber === payload?.data.AccountNumber,
        );

        if (accountIndex !== -1) {
          accounts[accountIndex] = {
            ...accounts[accountIndex],
            ...payload.data,
          };
        }

        return {
          ...state,
          linkedBankAccounts: {
            ...state.linkedBankAccounts,
            data: [...accounts],
          },
        };
      }
      return {
        ...state,
        linkedBankAccounts: {
          ...state.linkedBankAccounts,
          data: [payload.data, ...state.linkedBankAccounts?.data],
        },
      };
    case GET_LINKED_BANK_ACCOUNTS_FAILURE:
      return {
        ...state,
        linkedBankAccounts: {
          ...state.linkedBankAccounts,
          loading: false,
          error: payload.error,
        },
      };

    default:
      return null;
  }
};
