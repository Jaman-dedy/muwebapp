import {
  ADD_MONEY_TO_VIRTUAL_CARD_START,
  ADD_MONEY_TO_VIRTUAL_CARD_SUCCESS,
  ADD_MONEY_TO_VIRTUAL_CARD_ERROR,
  CLEAR_ADD_MONEY_TO_VIRTUAL_CARD_STORE,
} from 'constants/action-types/virtual-card/addMoneyToVirtualCard';

export default (state, { type, payload }) => {
  switch (type) {
    case ADD_MONEY_TO_VIRTUAL_CARD_START:
      return {
        ...state,
        addMoneyToVirtualCard: {
          ...state.addMoneyToVirtualCard,
          loading: true,
          success: false,
          error: null,
        },
      };
    case ADD_MONEY_TO_VIRTUAL_CARD_ERROR:
      return {
        ...state,
        addMoneyToVirtualCard: {
          ...state.addMoneyToVirtualCard,
          error: payload,
          loading: false,
        },
      };
    case ADD_MONEY_TO_VIRTUAL_CARD_SUCCESS:
      return {
        ...state,
        addMoneyToVirtualCard: {
          ...state.addMoneyToVirtualCard,
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
                  Balance: (
                    parseFloat(
                      state.virtualCardList.data[
                        index
                      ].Balance.replace(/,/g, ''),
                    ) + parseFloat(payload.AmountSent)
                  ).toFixed(2),
                }
              : item,
          ),
        },
      };
    case CLEAR_ADD_MONEY_TO_VIRTUAL_CARD_STORE:
      return {
        ...state,
        addMoneyToVirtualCard: {
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
