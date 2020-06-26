import {
  TRANSACTIONS_OVERVIEW_WITH_CONTACT_ERROR,
  TRANSACTIONS_OVERVIEW_WITH_CONTACT_START,
  TRANSACTIONS_OVERVIEW_WITH_CONTACT_SUCCESS,
} from 'constants/action-types/transactions/overview';

import apiAction from 'helpers/apiAction';

export default data => dispatch =>
  dispatch(
    apiAction({
      method: 'post',
      url: '/TransactionsHistoryLight',
      data,
      onStart: () => dispatch =>
        dispatch({
          type: TRANSACTIONS_OVERVIEW_WITH_CONTACT_START,
        }),
      onSuccess: data => dispatch => {
        return dispatch({
          type: TRANSACTIONS_OVERVIEW_WITH_CONTACT_SUCCESS,
          payload: data,
        });
      },
      onFailure: error => dispatch => {
        return dispatch({
          type: TRANSACTIONS_OVERVIEW_WITH_CONTACT_ERROR,
          payload: {
            ...error,
          },
        });
      },
    }),
  );
