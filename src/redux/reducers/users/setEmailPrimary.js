import {
  SET_PRIMARY_EMAIL_START,
  SET_PRIMARY_EMAIL_SUCCESS,
  SET_PRIMARY_EMAIL_ERROR,
  SET_PRIMARY_EMAIL_END,
} from 'constants/action-types/users/setPrimaryEmail';

export default (state, { type, payload }) => {
  switch (type) {
    case SET_PRIMARY_EMAIL_START:
      return {
        ...state,
        primaryEmail: {
          ...state.primaryEmail,
          loading: true,
          error: null,
          success: false,
        },
      };
    case SET_PRIMARY_EMAIL_SUCCESS:
      return {
        ...state,
        primaryEmail: {
          ...state.primaryEmail,
          ...payload,
          loading: false,
          error: null,
          success: true,
        },
        userData: {
          ...state.userData,
          data: {
            ...state.userData.data,
            Emails: state.userData.data.Emails.map(item => {
              if (item.Email === payload.defaultEmail) {
                return { ...item, Primary: 'YES' };
              }
              return { ...item, Primary: 'NO' };
            }),
          },
        },
      };

    case SET_PRIMARY_EMAIL_ERROR:
      return {
        ...state,
        primaryEmail: {
          ...state.primaryEmail,
          loading: false,
          error: payload,
        },
      };
    case SET_PRIMARY_EMAIL_END:
      return {
        ...state.primaryEmail,
        success: false,
        error: null,
      };
    default:
      return null;
  }
};
