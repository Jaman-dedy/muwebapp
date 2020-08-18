import {
  CREATE_CREDIT_CARD_START,
  CREATE_CREDIT_CARD_SUCCESS,
  CREATE_CREDIT_CARD_ERROR,
  CLEAR_CREATE_CREDIT_CARD_STORE,
} from 'constants/action-types/credit-card/createCreditCard';

export default (state, { type, payload }) => {
  switch (type) {
    case CREATE_CREDIT_CARD_START:
      return {
        ...state,
        createCreditCard: {
          ...state.createCreditCard,
          loading: true,
          success: false,
          error: null,
        },
      };
    case CREATE_CREDIT_CARD_ERROR:
      return {
        ...state,
        createCreditCard: {
          ...state.createCreditCard,
          error: payload,
          loading: false,
        },
      };

    case CREATE_CREDIT_CARD_SUCCESS:
      return {
        ...state,
        createCreditCard: {
          ...state.createCreditCard,
          data: payload,
          loading: false,
          error: null,
        },
        creditCardList: {
          ...state.creditCardList,
          data: [
            payload,
            ...(state.creditCardList.data.filter(
              item => item.RecordsCount !== '0',
            ) || []),
          ],
        },
      };

    case CLEAR_CREATE_CREDIT_CARD_STORE:
      return {
        ...state,
        createCreditCard: {
          loading: false,
          error: null,
          success: false,
          OK: '',
        },
      };
    default:
      return null;
  }
};
