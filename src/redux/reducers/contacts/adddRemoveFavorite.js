import {
  ADD_REMOVE_FAVOURITE_START,
  ADD_REMOVE_FAVOURITE_SUCCESS,
  ADD_REMOVE_FAVOURITE_ERROR,
  CLEAR_ADD_REMOVE_FAVORITE,
} from 'constants/action-types/contacts';

const getNewFavList = (payload, state) => {
  if (payload.contact.ContactType === 'EXTERNAL') {
    return payload.contact.Favorite === 'YES'
      ? state.favoriteContacts.data.filter(
          item =>
            item.PhoneNumber !== payload.requestData.ContactsPhone[0],
        )
      : [payload.contact, ...state.favoriteContacts.data];
  }

  return payload.contact.Favorite === 'YES'
    ? state.favoriteContacts.data.filter(
        item =>
          item.ContactPID !== payload.requestData.ContactsPID[0],
      )
    : [payload.contact, ...state.favoriteContacts.data];
};

export default (state, { type, payload }) => {
  switch (type) {
    case ADD_REMOVE_FAVOURITE_START:
      return {
        ...state,
        addRemoveFavorite: {
          ...state.addRemoveFavorite,
          loading: true,
          error: null,
        },
      };
    case ADD_REMOVE_FAVOURITE_ERROR:
      return {
        ...state,
        addRemoveFavorite: {
          ...state.addRemoveFavorite,
          error: payload,
          loading: false,
        },
      };
    case ADD_REMOVE_FAVOURITE_SUCCESS:
      return {
        ...state,
        addRemoveFavorite: {
          ...state.addRemoveFavorite,
          loading: false,
          error: null,
          data: payload.data,
          success: true,
          contact: {
            ...payload.contact,
            Favorite:
              payload.contact.Favorite === 'YES' ? 'NO' : 'YES',
          },
        },
        favoriteContacts: {
          ...state.favoriteContacts,
          error: null,
          loading: false,
          data: getNewFavList(payload, state),
        },

        allContacts: {
          ...state.allContacts,
          data:
            payload.contact.ContactType === 'INTERNAL'
              ? state.allContacts.data.map(
                  ({ ContactPID, ...allOther }) => {
                    const newMerged = { ContactPID };

                    if (
                      ContactPID ===
                      payload.requestData.ContactsPID[0]
                    ) {
                      return {
                        ...payload.contact,
                        Favorite:
                          payload.contact.Favorite === 'YES'
                            ? 'NO'
                            : 'YES',
                      };
                    }
                    return {
                      ...newMerged,
                      ...allOther,
                    };
                  },
                )
              : state.allContacts.data.map(
                  ({ PhoneNumber, ...allOther }) => {
                    const newMerged = { PhoneNumber };

                    if (
                      PhoneNumber ===
                      payload.requestData.ContactsPhone[0]
                    ) {
                      return {
                        ...payload.contact,
                        Favorite:
                          payload.contact.Favorite &&
                          payload.contact.Favorite === 'YES'
                            ? 'NO'
                            : 'YES',
                      };
                    }
                    return {
                      ...newMerged,
                      ...allOther,
                    };
                  },
                ),
        },
      };

    case CLEAR_ADD_REMOVE_FAVORITE:
      return {
        ...state,
        addRemoveFavorite: {
          ...state.addRemoveFavorite,
          loading: false,
          error: null,
          data: null,
          success: false,
          contact: null,
        },
      };

    default:
      return null;
  }
};
