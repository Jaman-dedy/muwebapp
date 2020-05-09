import { UPDATE_USER_INFO_SUCCESS } from 'constants/action-types/users/getUserInfo';
import {
  UPDATE_GENDER_START,
  UPDATE_GENDER_SUCCESS,
  UPDATE_GENDER_FAILURE,
  CLEAR_UPDATE_GENDER,
} from 'constants/action-types/userAccountManagement/updateGender';
import apiAction from 'helpers/apiAction';

const genders = [
  { key: '0', text: 'Unkown', value: '0' },
  { key: '1', text: 'Female', value: '1' },
  { key: '2', text: 'Male', value: '2' },
];

export default data => dispatch =>
  dispatch(
    apiAction({
      method: 'post',
      url: '/SetUserGender',
      data,
      onStart: () => dispatch =>
        dispatch({
          type: UPDATE_GENDER_START,
        }),
      onSuccess: data => dispatch => {
        dispatch({
          type: UPDATE_GENDER_SUCCESS,
          payload: {
            ...data[0],
            success: data[0].Result === 'Success',
          },
        });

        const Gender = genders.find(
          ({ key }) => key === data[0].Gender,
        );

        if (Gender)
          dispatch({
            type: UPDATE_USER_INFO_SUCCESS,
            payload: {
              Gender: {
                Number: Gender.key,
                Name: Gender.text,
              },
            },
          });
      },
      onFailure: error => dispatch => {
        return dispatch({
          type: UPDATE_GENDER_FAILURE,
          payload: {
            ...error[0],
          },
        });
      },
    }),
  );

export const restoreUpdateGender = () => dispatch => {
  dispatch({
    type: CLEAR_UPDATE_GENDER,
  });
};
