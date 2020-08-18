import {
  ENABLE_CREDIT_CARD_START,
  ENABLE_CREDIT_CARD_SUCCESS,
  ENABLE_CREDIT_CARD_ERROR,
  CLEAR_ENABLE_CREDIT_CARD_STORE,
} from 'constants/action-types/credit-card/enableCreditCard';

export default (state, { type, payload }) => {
  switch (type) {
    case ENABLE_CREDIT_CARD_START:
      return {
        ...state,
        enableCreditCard: {
          ...state.enableCreditCard,
          loading: true,
          success: false,
          OK: '',
        },
      };
    case ENABLE_CREDIT_CARD_ERROR:
      return {
        ...state,
        enableCreditCard: {
          ...state.enableCreditCard,
          error: payload,
          loading: false,
        },
      };
    case ENABLE_CREDIT_CARD_SUCCESS:
      return {
        ...state,
        enableCreditCard: {
          ...state.enableCreditCard,
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
                Enabled:
                  state.creditCardList.data[index].Enabled === 'YES'
                    ? 'NO'
                    : 'YES',
              };
            }
            return item;
          }),
        },
      };
    case CLEAR_ENABLE_CREDIT_CARD_STORE:
      return {
        ...state,
        enableCreditCard: {
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
