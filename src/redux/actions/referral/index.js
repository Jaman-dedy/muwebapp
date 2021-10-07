import {
  ADD_REFERRAL_START,
  ADD_REFERRAL_SUCCESS,
  ADD_REFERRAL_ERROR,
} from 'constants/action-types/referral';

import apiAction from 'helpers/apiAction';

export default referralData => dispatch => {
  return dispatch(
    apiAction({
      method: 'post',
      url: '/AddSponsoree',
      data: { UserPID: referralData },
      onStart: () => dispatch =>
        dispatch({
          type: ADD_REFERRAL_START,
        }),
      onSuccess: data => dispatch => {
        return dispatch({
          type: ADD_REFERRAL_SUCCESS,
          payload: {
            success: data[0]?.Result,
            message: data[0]?.Description,
            NewRefferal: {
              referralData,
              number: data[0]?.ReferralAdded,
            },
          },
        });
      },
      onFailure: error => dispatch => {
        return dispatch({
          type: ADD_REFERRAL_ERROR,
          payload: error,
        });
      },
    }),
  );
};
