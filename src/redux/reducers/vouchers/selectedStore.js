import {
  SET_SELECTED_STORE,
  CLEAR_SELECTED_STORE,
} from 'constants/action-types/vouchers/selectedStore';

export default (state, { type, payload }) => {
  switch (type) {
    case SET_SELECTED_STORE:
      return {
        ...state,
        selectedStore: {
          ...payload,
        },
      };
    case CLEAR_SELECTED_STORE:
      return {
        ...state,
        selectedStore: {
          skipSearchPage: false,
        },
      };
    default:
      return null;
  }
};
