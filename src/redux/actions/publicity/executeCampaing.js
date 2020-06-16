import { toast } from 'react-toastify';
import {
  EXECUTE_PUBLICITY_START,
  EXECUTE_PUBLICITY_SUCCESS,
  EXECUTE_PUBLICITY_ERROR,
  CLEAR_EXECUTE_PUBLICITY_STORE,
} from 'constants/action-types/publicity';

import apiAction from 'helpers/apiAction';

export default data => dispatch => {
  return dispatch(
    apiAction({
      method: 'post',
      url: '/ExecuteCampaign',
      data: {
        PIN: data.PIN,
        CampaignID: data.CampaignID,
        ContactsOnly: data.ContactsOnly || 'Yes',
        SourceWallet: data.SourceWallet || '',
        Audience: data.Audience || '0',
        Age: data.Age || [],
        Gender: data.Gender || [],
        Sample: data.Sample || [],
      },
      onStart: () => dispatch =>
        dispatch({
          type: EXECUTE_PUBLICITY_START,
        }),
      onSuccess: data => dispatch => {
        return dispatch({
          type: EXECUTE_PUBLICITY_SUCCESS,
          payload: {
            ...data[0],
            success: data[0].Result === 'Success',
          },
        });
      },
      onFailure: error => dispatch => {
        toast.error(global.translate(error[0].Description));
        return dispatch({
          type: EXECUTE_PUBLICITY_ERROR,
          payload: {
            ...error[0],
          },
        });
      },
    }),
  );
};

export const restoreExecutePublicity = () => dispatch => {
  dispatch({
    type: CLEAR_EXECUTE_PUBLICITY_STORE,
  });
};
