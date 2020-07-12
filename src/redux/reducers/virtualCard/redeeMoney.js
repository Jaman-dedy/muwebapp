import {
  REDEEM_MONEY_START,
  REDEEM_MONEY_SUCCESS,
  REDEEM_MONEY_ERROR,
  CLEAR_REDEEM_MONEY_STORE,
} from 'constants/action-types/virtual-card/redeeMoney';

export default (state, { type, payload }) => {
  switch (type) {
    case REDEEM_MONEY_START:
      return {
        ...state,
        redeeMoney: {
          ...state.redeeMoney,
          loading: true,
          success: false,
          error: null,
        },
      };
    case REDEEM_MONEY_ERROR:
      return {
        ...state,
        redeeMoney: {
          ...state.redeeMoney,
          error: payload,
          loading: false,
        },
      };

    case REDEEM_MONEY_SUCCESS:
      return {
        ...state,
        redeeMoney: {
          ...state.redeeMoney,
          data: payload,
          loading: false,
          error: null,
        },
        virtualCardList: {
          ...state.virtualCardList,
          data: state.virtualCardList.data.map((item, index) =>
            item.CardNumber === payload.CardNumber
              ? {
                  ...state.virtualCardList.data[index],
                  Balance: payload.Balance,
                }
              : item,
          ),
        },
      };

    case CLEAR_REDEEM_MONEY_STORE:
      return {
        ...state,
        redeeMoney: {
          data: null,
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
