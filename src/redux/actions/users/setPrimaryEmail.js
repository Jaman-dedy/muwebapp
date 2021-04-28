import { toast } from 'react-toastify';
import {
  SET_PRIMARY_EMAIL_START,
  SET_PRIMARY_EMAIL_SUCCESS,
  SET_PRIMARY_EMAIL_ERROR,
  SET_PRIMARY_EMAIL_CLEAR,
} from 'constants/action-types/users/setPrimaryEmail';

import apiAction from 'helpers/apiAction';

export default data => dispatch => {
  dispatch(
    apiAction({
      method: 'post',
      url: '/SetAsDefault',
      data,
      requireAppId: false,
      onStart: () => dispatch =>
        dispatch({
          type: SET_PRIMARY_EMAIL_START,
        }),
      onSuccess: data => dispatch => {
        toast.success(
          `${data[0].NewDefaultEmail} ${global.translate(
            'is set as your default email.',
            165,
          )}`,
        );
        return dispatch({
          type: SET_PRIMARY_EMAIL_SUCCESS,
          payload: {
            success: data[0].Result === 'Success',
            message: data[0].Description,
            defaultEmail: data[0].NewDefaultEmail,
          },
        });
      },
      onFailure: error => dispatch => {
        toast.error(error && error[0] && error[0].Description);
        return dispatch({
          type: SET_PRIMARY_EMAIL_ERROR,
          payload: {
            error,
          },
        });
      },
    }),
  );
};
export const clearSetDefaultWallet = () => dispatch =>
  dispatch({
    type: SET_PRIMARY_EMAIL_CLEAR,
  });
