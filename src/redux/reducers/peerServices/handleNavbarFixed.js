import { TOGGLE_DESKTOP_NAVBAR_FIXED } from 'constants/action-types/peerServices';

export default (state, { type, payload }) => {
  switch (type) {
    case TOGGLE_DESKTOP_NAVBAR_FIXED:
      return {
        desktopLayout: {
          navbarFixed: payload,
        },
      };

    default:
      return null;
  }
};
