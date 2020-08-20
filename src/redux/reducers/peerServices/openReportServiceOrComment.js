import { OPEN_REPORT_SERVICE_COMMENT_MODAL } from 'constants/action-types/peerServices';

export default (state, { type, payload = null }) => {
  switch (type) {
    case OPEN_REPORT_SERVICE_COMMENT_MODAL:
      return {
        ...state,
        reportModal: {
          ...state.reportModal,
          open: payload.open,
          type: payload.type,
          service: payload.service,
        },
      };

    default:
      return null;
  }
};
