import { OPEN_EDIT_PRICING_SERVICE_MODAL } from 'constants/action-types/peerServices';

export default (state, action) => {
  switch (action?.type) {
    case OPEN_EDIT_PRICING_SERVICE_MODAL:
      return {
        ...state,
        editPricingModal: {
          ...state.editPricingModal,
          open: action.payload?.open,
          service: action.payload?.service,
        },
      };

    default:
      return null;
  }
};
