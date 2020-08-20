import { CLOSE_CREATE_SERVICE_MODAL } from 'constants/action-types/peerServices';

export default (state, { type }) => {
  switch (type) {
    case CLOSE_CREATE_SERVICE_MODAL:
      return {
        ...state,
        modal: {
          ...state.modal,
          open: false,
          service: null,
        },
      };

    default:
      return null;
  }
};
