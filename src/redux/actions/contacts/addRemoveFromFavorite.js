import {
  ADD_REMOVE_FAVOURITE_ERROR,
  ADD_REMOVE_FAVOURITE_START,
  ADD_REMOVE_FAVOURITE_SUCCESS,
  CLEAR_ADD_REMOVE_FAVORITE,
} from 'constants/action-types/contacts';

import apiAction from 'helpers/apiAction';

export default (requestData, contact) => dispatch => {
  return dispatch(
    apiAction({
      method: 'post',
      url: '/AddOrRemoveFavorite',
      data: requestData,
      onStart: () => dispatch =>
        dispatch({
          type: ADD_REMOVE_FAVOURITE_START,
        }),
      onSuccess: data => dispatch => {
        return dispatch({
          type: ADD_REMOVE_FAVOURITE_SUCCESS,
          payload: { data, requestData, contact },
        });
      },
      onFailure: error => dispatch => {
        return dispatch({
          type: ADD_REMOVE_FAVOURITE_ERROR,
          payload: {
            ...error,
          },
        });
      },
    }),
  );
};
export const clearFavoritesSuccess = () => dispatch => {
  return dispatch({ type: CLEAR_ADD_REMOVE_FAVORITE });
};
