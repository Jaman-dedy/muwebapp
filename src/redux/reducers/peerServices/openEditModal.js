import { OPEN_DELETE_SERVICE_MODAL } from 'constants/action-types/peerServices';

export default (state, { type, payload = null }) => {
  switch (type) {
    case OPEN_DELETE_SERVICE_MODAL:
      return {
        ...state,
        deleteServiceModal: {
          ...state.deleteServiceModal,
          open: payload.open,
          service: payload.service,
        },
      };

    default:
      return null;
  }
};
