import {
  SEARCH_PEER_SERVICES_START,
  SEARCH_PEER_SERVICES_SUCCESS,
  SEARCH_PEER_SERVICES_ERROR,
} from 'constants/action-types/peerServices';
import removeDuplicatesBy from 'utils/removeDuplicatesBy';

export default (state, { type, payload }) => {
  switch (type) {
    case SEARCH_PEER_SERVICES_START:
      return {
        ...state,
        searchResults: {
          ...state.searchResults,
          loading: true,
          error: null,
          data: payload.clearPreviousSearchResults
            ? {
                Meta: state.searchResults.data.Meta,
                Data: [],
              }
            : state.searchResults.data,
        },
      };
    case SEARCH_PEER_SERVICES_ERROR:
      return {
        ...state,
        searchResults: {
          ...state.searchResults,
          error: payload,
          loading: false,
        },
      };
    case SEARCH_PEER_SERVICES_SUCCESS:
      return {
        ...state,
        searchResults: {
          ...state.searchResults,
          error: null,
          loading: false,
          data:
            state.searchResults.data?.Data &&
            Array.isArray(payload.Data)
              ? {
                  Meta: payload.Meta,
                  Data: removeDuplicatesBy(x => x.ServiceID, [
                    ...state.searchResults.data.Data,
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
