import {
  GET_SUPPLIERS_START,
  GET_SUPPLIERS_SUCCESS,
  GET_SUPPLIERS_ERROR,
} from 'constants/action-types/payBills/getSuppliers';

export default (state, { type, payload }) => {
  switch (type) {
    case GET_SUPPLIERS_START:
      return {
        ...state,
        suppliers: {
          ...state.suppliers,
          loading: true,
        },
      };
    case GET_SUPPLIERS_ERROR:
      return {
        ...state,
        suppliers: {
          ...state.suppliers,
          error: payload.error,
          loading: false,
        },
      };
    case GET_SUPPLIERS_SUCCESS:
      return {
        ...state,
        suppliers: {
          ...state.suppliers,
          ...payload,
          success: true,
          loading: false,
        },
      };
    default:
      return null;
  }
};
