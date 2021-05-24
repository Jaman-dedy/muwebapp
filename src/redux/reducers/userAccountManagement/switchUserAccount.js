import {
  SWITCH_TO_BUSINESS_ACCOUNT_FAILURE,
  SWITCH_TO_BUSINESS_ACCOUNT_START,
  SWITCH_TO_BUSINESS_ACCOUNT_SUCCESS,
  CLEAR_SWITCH_ACCOUNT_DATA,
} from 'constants/action-types/userAccountManagement/switchToBusinessAccount';

const initialState = {};

const switchToBusinessAccount = (
  state = initialState,
  { type, payload },
) => {
  switch (type) {
    case SWITCH_TO_BUSINESS_ACCOUNT_START:
      return {
        ...state,
        switchToBusinessAccount: {
          ...state.switchToBusinessAccount,
          loading: true,
          error: null,
          success: false,
        },
      };
    case SWITCH_TO_BUSINESS_ACCOUNT_SUCCESS:
      return {
        ...state,
        switchToBusinessAccount: {
          ...state.switchToBusinessAccount,
          ...payload,
          loading: false,
        },
      };

    case SWITCH_TO_BUSINESS_ACCOUNT_FAILURE:
      return {
        ...state,
        switchToBusinessAccount: {
          ...state.switchToBusinessAccount,
          error: payload.error,
          loading: false,
        },
      };
    case CLEAR_SWITCH_ACCOUNT_DATA:
      return {
        ...state,
        switchToBusinessAccount: {
          ...state.switchToBusinessAccount,
          error: null,
        },
      };
    default:
      return null;
  }
};

export default switchToBusinessAccount;
