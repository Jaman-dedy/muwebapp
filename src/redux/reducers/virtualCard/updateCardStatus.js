import {
  UPDATE_CARD_STATUS_START,
  UPDATE_CARD_STATUS_SUCCESS,
  UPDATE_CARD_STATUS_ERROR,
  CLEAR_UPDATE_CARD_STATUS_STORE,
} from 'constants/action-types/virtual-card/updateCardStatus';

export default (state, { type, payload }) => {
  switch (type) {
    case UPDATE_CARD_STATUS_START:
      return {
        ...state,
        cardStatus: {
          ...state.cardStatus,
          loading: true,
          success: false,
          error: null,
        },
      };
    case UPDATE_CARD_STATUS_ERROR:
      return {
        ...state,
        cardStatus: {
          ...state.cardStatus,
          error: payload,
          loading: false,
        },
      };

    case UPDATE_CARD_STATUS_SUCCESS:
      return {
        ...state,
        cardStatus: {
          ...state.cardStatus,
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
                  Enabled: payload.Enabled,
                }
              : item,
          ),
        },
      };

    case CLEAR_UPDATE_CARD_STATUS_STORE:
      return {
        ...state,
        cardStatus: {
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
