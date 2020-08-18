import {
  ACTIVATE_CREDIT_CARD_START,
  ACTIVATE_CREDIT_CARD_SUCCESS,
  ACTIVATE_CREDIT_CARD_ERROR,
  CLEAR_ACTIVATE_CREDIT_CARD_STORE,
} from 'constants/action-types/credit-card/activateCreditCard';

export default (state, { type, payload }) => {
  switch (type) {
    case ACTIVATE_CREDIT_CARD_START:
      return {
        ...state,
        activateCreditCard: {
          ...state.activateCreditCard,
          loading: true,
          success: false,
          OK: '',
        },
      };
    case ACTIVATE_CREDIT_CARD_ERROR:
      return {
        ...state,
        activateCreditCard: {
          ...state.activateCreditCard,
          error: payload,
          loading: false,
        },
      };
    case ACTIVATE_CREDIT_CARD_SUCCESS:
      return {
        ...state,
        activateCreditCard: {
          ...state.activateCreditCard,
          data: payload,
          loading: false,
          error: null,
        },
        creditCardList: {
          ...state.creditCardList,
          data: state.creditCardList.data.map((item, index) => {
            if (item.CardNumber === payload.CardNumber) {
              return {
                ...state.creditCardList.data[index],
                Activated: 'YES',
              };
            }
            return item;
          }),
        },
      };
    case CLEAR_ACTIVATE_CREDIT_CARD_STORE:
      return {
        ...state,
        activateCreditCard: {
          ...payload,
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
