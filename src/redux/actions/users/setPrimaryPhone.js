import { toast } from 'react-toastify';
import {
  SET_PRIMARY_PHONE_START,
  SET_PRIMARY_PHONE_SUCCESS,
  SET_PRIMARY_PHONE_ERROR,
  SET_PRIMARY_PHONE_CLEAR,
} from 'constants/action-types/users/setPrimaryPhone';

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
          type: SET_PRIMARY_PHONE_START,
        }),
      onSuccess: data => dispatch => {
        toast.success(
          `${data[0].NewDefaultPhone} ${global.translate(
            'is set as your primary phone number.',
          )}`,
        );
        return dispatch({
          type: SET_PRIMARY_PHONE_SUCCESS,
          payload: {
            success: data[0].Result === 'Success',
            message: data[0].Description,
            defaultPhone: data[0].NewDefaultPhone,
          },
        });
      },
      onFailure: error => dispatch => {
        toast.error(error && error[0] && error[0].Description);
        return dispatch({
          type: SET_PRIMARY_PHONE_ERROR,
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
    type: SET_PRIMARY_PHONE_CLEAR,
  });
