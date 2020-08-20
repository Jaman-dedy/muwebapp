import {
  GET_SERVICES_LIST_START,
  GET_SERVICES_LIST_SUCCESS,
  GET_SERVICES_LIST_ERROR,
} from 'constants/action-types/peerServices';
import removeDuplicatesBy from 'utils/removeDuplicatesBy';

export default (state, { type, payload }) => {
  switch (type) {
    case GET_SERVICES_LIST_START:
      return {
        ...state,
        servicesList: {
          ...state.servicesList,
          loading: true,
          error: null,
        },
      };
    case GET_SERVICES_LIST_ERROR:
      return {
        ...state,
        servicesList: {
          ...state.servicesList,
          error: payload,
          loading: false,
        },
      };
    case GET_SERVICES_LIST_SUCCESS:
      return {
        ...state,
        servicesList: {
          ...state.servicesList,
          error: null,
          loading: false,
          data:
            state.servicesList.data?.Data &&
            Array.isArray(payload.Data)
              ? {
                  Meta: payload.Meta,
                  Data: removeDuplicatesBy(x => x.ServiceID, [
                    ...state.servicesList.data.Data,
                    ...payload.Data,
                  ]),
                }
              : payload,
        },
      };

    default:
      return null;
  }
};
