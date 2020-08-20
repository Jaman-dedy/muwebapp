import { SET_PEER_SERVICE } from 'constants/action-types/peerServices';

export default (state, { type, payload }) => {
  switch (type) {
    case SET_PEER_SERVICE:
      return {
        ...state,
        service: {
          ...state.service,
          loading: false,
          error: null,
          data: payload.data,
        },
      };

    default:
      return null;
  }
};
