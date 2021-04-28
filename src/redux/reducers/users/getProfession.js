import {
  GET_PROFESSION_START,
  GET_PROFESSION_ERROR,
  GET_PROFESSION_SUCCESS,
} from 'constants/action-types/users/getProfession';

export default (state, { type, payload }) => {
  switch (type) {
    case GET_PROFESSION_START:
      return {
        ...state,
        professionList: {
          ...state.professionList,
          loading: true,
          error: null,
        },
      };
    case GET_PROFESSION_ERROR:
      return {
        ...state,
        professionList: {
          ...state.professionList,
          error: payload,
          loading: false,
        },
      };
    case GET_PROFESSION_SUCCESS:
      return {
        ...state,
        professionList: {
          ...state.professionList,
          error: null,
          loading: false,
          data: payload,
        },
      };

    default:
      return null;
  }
};
