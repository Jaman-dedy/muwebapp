import { GET_SEARCHSTORE_CLEAR } from 'constants/action-types/vouchers/searchStore';

export default () => dispatch => {
  dispatch({ type: GET_SEARCHSTORE_CLEAR });
};
