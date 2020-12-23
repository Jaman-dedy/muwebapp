import { toast } from 'react-toastify';
import {
  DELETE_CREDIT_CARD_FAILURE,
  DELETE_CREDIT_CARD_START,
  DELETE_CREDIT_CARD_SUCCESS,
} from 'constants/action-types/credit-card/deleteCreditCard';
import apiAction from 'helpers/apiAction';

export default ({ history, CardNumber, ...data }) => dispatch =>
  dispatch(
    apiAction({
      method: 'post',
      url: '/RemoveCreditCard',
      data,
      onStart: () => dispatch => {
        return dispatch({
          type: DELETE_CREDIT_CARD_START,
        });
      },
      onSuccess: data => dispatch => {
        toast.success(
          global.translate(
            'The card has been removed from your wallet',
            2145,
          ),
        );
        history.push('/credit-cards');
        return dispatch({
          type: DELETE_CREDIT_CARD_SUCCESS,
          payload: {
            data,
            CardNumber, // will be used to remove card from list.
          },
        });
      },
      onFailure: error => dispatch => {
        toast.error(error[0]?.Description);
        return dispatch({
          type: DELETE_CREDIT_CARD_FAILURE,
          payload: { error },
        });
      },
    }),
  );
