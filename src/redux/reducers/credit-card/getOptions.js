import {
  GET_CREDIT_CARD_OPTION_ERROR,
  GET_CREDIT_CARD_OPTION_START,
  GET_CREDIT_CARD_OPTION_SUCCESS,
} from 'constants/action-types/credit-card/getOptions';

export default (state, { type, payload }) => {
  switch (type) {
    case GET_CREDIT_CARD_OPTION_START:
      return {
        ...state,
        creditCardOptions: {
          ...state.creditCardOptions,
          loading: true,
          error: null,
        },
      };
    case GET_CREDIT_CARD_OPTION_ERROR:
      return {
        ...state,
        creditCardOptions: {
          ...state.creditCardOptions,
          error: payload,
          loading: false,
        },
      };
    case GET_CREDIT_CARD_OPTION_SUCCESS:
      return {
        ...state,
        creditCardOptions: {
          ...state.creditCardOptions,
          error: null,
          loading: false,
          data: payload,
        },
      };
    default:
      return null;
  }
};
