import {
  GET_CURRENCY_NETWORTH_START,
  GET_CURRENCY_NETWORTH_SUCCESS,
  GET_CURRENCY_NETWORTH_ERROR,
} from 'constants/action-types/users/getUserNetworth';

export default (state, { type, payload }) => {
  switch (type) {
    case GET_CURRENCY_NETWORTH_START:
      return {
        ...state,
        currencyNetworth: {
          ...state.currencyNetworth,
          data: null,
          loading: true,
          error: null,
          flag: payload.Flag,
        },
      };
    case GET_CURRENCY_NETWORTH_ERROR:
      return {
        ...state,
        currencyNetworth: {
          ...state.currencyNetworth,
          error: payload,
          loading: false,
        },
      };
    case GET_CURRENCY_NETWORTH_SUCCESS:
      return {
        ...state,
        currencyNetworth: {
          ...state.currencyNetworth,
          error: null,
          loading: false,
          data: payload.data[0],
        },
      };
    default:
      return null;
  }
};
