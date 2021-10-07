import {
  ADD_REFERRAL_START,
  ADD_REFERRAL_SUCCESS,
  ADD_REFERRAL_ERROR,
} from 'constants/action-types/referral';

export default (state, { type, payload }) => {
  switch (type) {
    case ADD_REFERRAL_START:
      return {
        ...state,
        addSponsoree: {
          ...state.addSponsoree,
          loading: true,
          success: false,
          OK: '',
          UserPID: '',
          justAdded: false,
        },
      };
    case ADD_REFERRAL_ERROR:
      return {
        ...state,
        addSponsoree: {
          ...state.addSponsoree,
          error: payload,
          loading: false,
          success: false,
        },
      };
    case ADD_REFERRAL_SUCCESS:
      return {
        ...state,
        addSponsoree: {
          ...state.addSponsoree,
          ...payload,
          loading: false,
          error: null,
          success: true,
        },
      };

    default:
      return null;
  }
};
