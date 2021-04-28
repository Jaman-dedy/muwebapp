import {
  DELETE_CREDIT_CARD_FAILURE,
  DELETE_CREDIT_CARD_START,
  DELETE_CREDIT_CARD_SUCCESS,
} from 'constants/action-types/credit-card/deleteCreditCard';

export default (state, { payload, type }) => {
  switch (type) {
    case DELETE_CREDIT_CARD_START:
      return {
        ...state,
        deleteCreditCard: {
          ...state.deleteCreditCard,
          loading: true,
          success: false,
          error: null,
        },
      };
    case DELETE_CREDIT_CARD_SUCCESS:
      return {
        ...state,
        deleteCreditCard: {
          ...state.deleteCreditCard,
          success: true,
          loading: false,
          data: payload.data,
        },
        creditCardList: {
          ...state.creditCardList,
          data: state.creditCardList.data.filter(
            card => card.CardNumber !== payload.CardNumber,
          ),
        },
      };
    case DELETE_CREDIT_CARD_FAILURE:
      return {
        ...state,
        deleteCreditCard: {
          ...state.deleteCreditCard,
          loading: false,
          error: payload.error,
        },
      };
    default:
      return null;
  }
};
