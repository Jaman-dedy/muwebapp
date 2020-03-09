import {
  GET_INTERNAL_CONTACTS_START,
  GET_INTERNAL_CONTACTS_SUCCESS,
  GET_INTERNAL_CONTACTS_ERROR,
} from 'constants/action-types/vouchers/internalContacts';

import apiAction from 'helpers/apiAction';

export default data => dispatch =>
  dispatch(
    apiAction({
      method: 'post',
      data,
      onStart: () => dispatch =>
          type: GET_INTERNAL_CONTACTS_SUCCESS,
          payload: {
            data,
            success: data[0].Result === 'Success',
            message: data[0].Description,
          },
        });
      },
      onFailure: error => dispatch => {
        return dispatch({
          type: GET_INTERNAL_CONTACTS_ERROR,
          payload: error,
        });
      },
    }),
  );
