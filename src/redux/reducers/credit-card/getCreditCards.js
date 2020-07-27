import {
  GET_CREDIT_CARD_LIST_ERROR,
  GET_CREDIT_CARD_LIST_START,
  GET_CREDIT_CARD_LIST_SUCCESS,
} from 'constants/action-types/credit-card/getCreditCards';

export default (state, { type, payload }) => {
  switch (type) {
    case GET_CREDIT_CARD_LIST_START:
      return {
        ...state,
        creditCardList: {
          ...state.creditCardList,
          loading: true,
          error: null,
        },
      };
    case GET_CREDIT_CARD_LIST_ERROR:
      return {
        ...state,
        creditCardList: {
          ...state.creditCardList,
          error: payload,
          loading: false,
        },
      };
    case GET_CREDIT_CARD_LIST_SUCCESS:
      return {
        ...state,
        creditCardList: {
          ...state.creditCardList,
          error: null,
          loading: false,
          data: payload,
        },
      };
    default:
      return null;
  }
};
