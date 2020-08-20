import { SET_CURRENT_CONTACT } from 'constants/action-types/contacts';

export default (state, { type, payload }) => {
  switch (type) {
    case SET_CURRENT_CONTACT:
      return {
        ...state,
        currentContact: payload,
      };
    default:
      return null;
  }
};
