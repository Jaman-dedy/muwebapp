import {
  GET_STORE_CATEGORIES_START,
  GET_STORE_CATEGORIES_SUCCESS,
  GET_STORE_CATEGORIES_ERROR,
} from 'constants/action-types/stores/getStoreCategories';
import apiAction from 'helpers/apiAction';

export default Language => dispatch =>
  dispatch(
    apiAction({
      method: 'post',
      url: '/GetStoreCategoryList',
      data: {
        Language,
      },
      onStart: () => dispatch =>
        dispatch({
          type: GET_STORE_CATEGORIES_START,
        }),
      onSuccess: data => dispatch => {
        return dispatch({
          type: GET_STORE_CATEGORIES_SUCCESS,
          payload: {
            categoryList: data,
          },
        });
      },
      onFailure: error => dispatch => {
        return dispatch({
          type: GET_STORE_CATEGORIES_ERROR,
          payload: {
            error: error[0],
          },
        });
      },
    }),
  );
