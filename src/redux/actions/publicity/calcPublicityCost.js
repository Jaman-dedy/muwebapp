import { toast } from 'react-toastify';
import {
  CALC_CAMPAING_COST_START,
  CALC_CAMPAING_COST_SUCCESS,
  CALC_CAMPAING_COST_ERROR,
  CLEAR_CALC_CAMPAING_COST,
} from 'constants/action-types/publicity';

import apiAction from 'helpers/apiAction';

const setChanged = (Budget, Audience) => {
  if (Budget === '') return 'Budget';
  if (Audience === '') return 'Audience';
  return '';
};

export default ({
  SourceWallet,
  Budget = '',
  Audience = '',
}) => dispatch => {
  return dispatch(
    apiAction({
      method: 'post',
      url: '/CalcCampaignCost',
      data: {
        SourceWallet,
        Budget: (Budget && Budget.toString()) || '',
        Audience: (Audience && Audience.toString()) || '',
      },
      onStart: () => dispatch =>
        dispatch({
          type: CALC_CAMPAING_COST_START,
        }),
      onSuccess: data => dispatch => {
        return dispatch({
          type: CALC_CAMPAING_COST_SUCCESS,
          payload: {
            ...data[0],
            success: data[0].Result === 'Success',
            changed: setChanged(Budget, Audience),
          },
        });
      },
      onFailure: error => dispatch => {
        toast.error(global.translate(error[0].Description));
        return dispatch({
          type: CALC_CAMPAING_COST_ERROR,
          payload: {
            ...error[0],
          },
        });
      },
    }),
  );
};

export const restoreCalPublicityCost = () => dispatch => {
  dispatch({
    type: CLEAR_CALC_CAMPAING_COST,
  });
};
