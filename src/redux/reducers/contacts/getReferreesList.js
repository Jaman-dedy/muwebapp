import {
  GET_REFERREES_LIST_START,
  GET_REFERREES_LIST_SUCCESS,
  GET_REFERREES_LIST_ERROR,
} from 'constants/action-types/contacts/getReferreesList';

export default (state, { type, payload }) => {
  switch (type) {
    case GET_REFERREES_LIST_START:
      return {
        ...state,
        referreesList: {
          ...state.referreesList,
          loading: true,
          error: null,
        },
      };
    case GET_REFERREES_LIST_ERROR:
      return {
        ...state,
        referreesList: {
          ...state.referreesList,
          error: payload,
          loading: false,
        },
      };
    case GET_REFERREES_LIST_SUCCESS:
      return {
        ...state,
        referreesList: {
          ...state.referreesList,
          error: null,
          loading: false,
          data: payload,
        },
      };
    default:
      return null;
  }
};
