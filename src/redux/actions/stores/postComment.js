import { toast } from 'react-toastify';
import {
  POST_COMMENT_START,
  POST_COMMENT_SUCCESS,
  POST_COMMENT_ERROR,
} from 'constants/action-types/stores/postComment';
import storeComments from 'redux/actions/stores/getComments';

import apiAction from 'helpers/apiAction';

export default data => dispatch =>
  dispatch(
    apiAction({
      method: 'post',
      url: '/AddCommentToStore',
      data,
      onStart: () => dispatch =>
        dispatch({
          type: POST_COMMENT_START,
        }),
      onSuccess: resp => dispatch => {
        storeComments({ StoreID: data.StoreID });
        return dispatch({
          type: POST_COMMENT_SUCCESS,
          payload: {
            ...resp[0],
            success: resp[0].Result === 'Success',
          },
        });
      },
      onFailure: error => dispatch => {
        toast.error(error[0].Description);
        return dispatch({
          type: POST_COMMENT_ERROR,
          payload: {
            ...error[0],
          },
        });
      },
    }),
  );
