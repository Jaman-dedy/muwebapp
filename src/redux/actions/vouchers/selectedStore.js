import {
  SET_SELECTED_STORE,
  CLEAR_SELECTED_STORE,
} from 'constants/action-types/vouchers/selectedStore';

export const setSelectedStore = (dispatch, data, skipSearchPage) => {
  return dispatch({
    type: SET_SELECTED_STORE,
    payload: {
      ...data,
      skipSearchPage,
    },
  });
};

export const clearSelectedStore = dispatch => {
  return dispatch({
    type: CLEAR_SELECTED_STORE,
  });
};
