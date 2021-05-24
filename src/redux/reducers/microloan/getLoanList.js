import {
  GET_LOAN_LIST_ERROR,
  GET_LOAN_LIST_START,
  GET_LOAN_LIST_SUCCESS,
} from 'constants/action-types/microloan/getLoanList';

export default (state, { type, payload }) => {
  switch (type) {
    case GET_LOAN_LIST_START:
      return {
        ...state,
        loanList: {
          ...state.loanList,
          loading: true,
          error: null,
        },
      };
    case GET_LOAN_LIST_ERROR:
      return {
        ...state,
        loanList: {
          ...state.loanList,
          error: payload,
          loading: false,
        },
      };
    case GET_LOAN_LIST_SUCCESS:
      return {
        ...state,
        loanList: {
          ...state.loanList,
          error: null,
          loading: false,
          data: payload,
        },
      };
    default:
      return null;
  }
};
