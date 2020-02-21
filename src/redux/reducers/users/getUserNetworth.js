import {
  GET_USER_NETWORTH_START,
  GET_USER_NETWORTH_SUCCESS,
  GET_USER_NETWORTH_ERROR,
} from 'constants/action-types/users/getUserNetworth';

export default (state, { type, payload }) => {
  switch (type) {
    case GET_USER_NETWORTH_START:
      return {
        ...state,
        networth: {
          ...state.networth,
          loading: true,
          error: null,
        },
      };
    case GET_USER_NETWORTH_ERROR:
      return {
        ...state,
        networth: {
          ...state.networth,
          error: payload,
          loading: false,
        },
      };
    case GET_USER_NETWORTH_SUCCESS:
      return {
        ...state,
        networth: {
          ...state.networth,
          error: null,
          loading: false,
          data: payload.data[0],
        },
      };
    default:
      return null;
  }
};
