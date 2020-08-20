import { TOGGLE_PEER_SERVICES_MOBILE_VIEW } from 'constants/action-types/peerServices';

export default (state, { type, payload }) => {
  switch (type) {
    case TOGGLE_PEER_SERVICES_MOBILE_VIEW:
      return {
        mobileLayout: {
          ...state.mobileLayout,
          sidebarOpened: payload.toggle
            ? !state.mobileLayout.sidebarOpened
            : payload.sidebarOpened,
        },
      };

    default:
      return null;
  }
};
