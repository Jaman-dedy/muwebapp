import { CLEAR_ADD_UPDATE_STORE_STORE } from 'constants/action-types/stores/addUpdateStore';

export default () => dispatch => {
  dispatch({
    type: CLEAR_ADD_UPDATE_STORE_STORE,
  });
};
