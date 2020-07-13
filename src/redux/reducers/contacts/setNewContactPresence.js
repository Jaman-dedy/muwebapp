import { CONTACT_PRESENCE_CHANGED } from 'constants/events/userPresence';

export default (state, { type, payload }) => {
  switch (type) {
    case CONTACT_PRESENCE_CHANGED: {
      const { action, contact } = payload;
      return {
        ...state,
        allContacts: {
          ...state.allContacts,
          data: state.allContacts.data?.map(item => {
            if (item.ContactPID === contact) {
              if (contact?.PresenceStatus !== action.PresenceStatus) {
                return {
                  ...item,
                  PresenceStatus: action.PresenceStatus,
                };
              }
            }
            return item;
          }),
        },
        favoriteContacts: {
          ...state.favoriteContacts,
          data: state.favoriteContacts.data?.map(item => {
            if (item.ContactPID === contact) {
              if (contact?.PresenceStatus !== action.PresenceStatus) {
                return {
                  ...item,
                  PresenceStatus: action.PresenceStatus,
                };
              }
            }
            return item;
          }),
        },
      };
    }

    default:
      return null;
  }
};
