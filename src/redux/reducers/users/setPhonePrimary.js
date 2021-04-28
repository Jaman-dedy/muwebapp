import {
  SET_PRIMARY_PHONE_START,
  SET_PRIMARY_PHONE_SUCCESS,
  SET_PRIMARY_PHONE_ERROR,
  SET_PRIMARY_PHONE_END,
} from 'constants/action-types/users/setPrimaryPhone';

export default (state, { type, payload }) => {
  switch (type) {
    case SET_PRIMARY_PHONE_START:
      return {
        ...state,
        primaryPhone: {
          ...state.primaryPhone,
          loading: true,
          error: null,
          success: false,
        },
      };
    case SET_PRIMARY_PHONE_SUCCESS:
      return {
        ...state,
        primaryPhone: {
          ...state.primaryPhone,
          ...payload,
          loading: false,
          error: null,
          success: true,
        },
        userData: {
          ...state.userData,
          data: {
            ...state.userData.data,
            Phones: state.userData.data.Phones.map(item => {
              if (item.Phone === payload.defaultPhone) {
                return { ...item, Primary: 'YES' };
              }
              return { ...item, Primary: 'NO' };
            }),
          },
        },
      };

    case SET_PRIMARY_PHONE_ERROR:
      return {
        ...state,
        primaryPhone: {
          ...state.primaryPhone,
          loading: false,
          error: payload,
        },
      };
    case SET_PRIMARY_PHONE_END:
      return {
        ...state.primaryPhone,
        success: false,
        error: null,
      };
    default:
      return null;
  }
};
