import {
  ADD_VIRTUAL_CARD_START,
  ADD_VIRTUAL_CARD_SUCCESS,
  ADD_VIRTUAL_CARD_ERROR,
  CLEAR_ADD_VIRTUAL_CARD_STORE,
} from 'constants/action-types/virtual-card/addVirtualCard';

export default (state, { type, payload }) => {
  switch (type) {
    case ADD_VIRTUAL_CARD_START:
      return {
        ...state,
        addVirtualCard: {
          ...state.addVirtualCard,
          loading: true,
          success: false,
          error: null,
        },
      };
    case ADD_VIRTUAL_CARD_ERROR:
      return {
        ...state,
        addVirtualCard: {
          ...state.addVirtualCard,
          error: payload,
          loading: false,
        },
      };

    case ADD_VIRTUAL_CARD_SUCCESS:
      return {
        ...state,
        addVirtualCard: {
          ...state.addVirtualCard,
          data: payload,
          loading: false,
          error: null,
        },
        virtualCardList: {
          ...state.virtualCardList,
          data: [payload, ...state.virtualCardList.data],
        },
      };

    case CLEAR_ADD_VIRTUAL_CARD_STORE:
      return {
        ...state,
        addVirtualCard: {
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
