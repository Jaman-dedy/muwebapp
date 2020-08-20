import { OPEN_CREATE_SERVICE_MODAL } from 'constants/action-types/peerServices';

export default (state, { type, payload = {} }) => {
  switch (type) {
    case OPEN_CREATE_SERVICE_MODAL:
      return {
        ...state,
        modal: {
          ...state.modal,
          open: payload.open || false,
          service: payload.service || null,
          editMedia: payload.editMedia || false,
        },
      };

    default:
      return null;
  }
};
