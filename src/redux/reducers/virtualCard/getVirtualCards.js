import {
  GET_MY_VIRTUAL_CARD_ERROR,
  GET_MY_VIRTUAL_CARD_START,
  GET_MY_VIRTUAL_CARD_SUCCESS,
} from 'constants/action-types/virtual-card/getVirtualCards';

export default (state, { type, payload }) => {
  switch (type) {
    case GET_MY_VIRTUAL_CARD_START:
      return {
        ...state,
        virtualCardList: {
          ...state.virtualCardList,
          loading: true,
          error: null,
        },
      };
    case GET_MY_VIRTUAL_CARD_ERROR:
      return {
        ...state,
        virtualCardList: {
          ...state.virtualCardList,
          error: payload,
          loading: false,
        },
      };
    case GET_MY_VIRTUAL_CARD_SUCCESS:
      return {
        ...state,
        virtualCardList: {
          ...state.virtualCardList,
          error: null,
          loading: false,
          data: payload,
        },
      };
    default:
      return null;
  }
};
