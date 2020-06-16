import {
  CALC_CAMPAING_COST_START,
  CALC_CAMPAING_COST_SUCCESS,
  CALC_CAMPAING_COST_ERROR,
  CLEAR_CALC_CAMPAING_COST,
} from 'constants/action-types/publicity';

export default (state, { type, payload }) => {
  switch (type) {
    case CALC_CAMPAING_COST_START:
      return {
        ...state,
        calcPublicityCost: {
          ...state.calcPublicityCost,
          loading: true,
          error: null,
        },
      };
    case CALC_CAMPAING_COST_ERROR:
      return {
        ...state,
        calcPublicityCost: {
          ...state.calcPublicityCost,
          error: payload,
          loading: false,
        },
      };
    case CALC_CAMPAING_COST_SUCCESS:
      return {
        ...state,
        calcPublicityCost: {
          ...state.calcPublicityCost,
          ...payload,
          loading: false,
          error: null,
        },
      };
    case CLEAR_CALC_CAMPAING_COST:
      return {
        ...state,
        calcPublicityCost: {
          ...state.calcPublicityCost,
          ...payload,
          message: '',
          loading: false,
          error: null,
          success: false,
        },
      };

    default:
      return null;
  }
};
