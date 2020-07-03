import {
  RENEW_VIRTUAL_CARD_START,
  RENEW_VIRTUAL_CARD_SUCCESS,
  RENEW_VIRTUAL_CARD_ERROR,
  CLEAR_RENEW_VIRTUAL_CARD_STORE,
} from 'constants/action-types/virtual-card/renewVirtualCard';

export default (state, { type, payload }) => {
  switch (type) {
    case RENEW_VIRTUAL_CARD_START:
      return {
        ...state,
        renewVirtualCard: {
          ...state.renewVirtualCard,
          loading: true,
          success: false,
          error: null,
        },
      };
    case RENEW_VIRTUAL_CARD_ERROR:
      return {
        ...state,
        renewVirtualCard: {
          ...state.renewVirtualCard,
          error: payload,
          loading: false,
        },
      };

    case RENEW_VIRTUAL_CARD_SUCCESS:
      return {
        ...state,
        renewVirtualCard: {
          ...state.renewVirtualCard,
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
                  YYYY: payload.YYYY,
                }
              : item,
          ),
        },
      };

    case CLEAR_RENEW_VIRTUAL_CARD_STORE:
      return {
        ...state,
        renewVirtualCard: {
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
