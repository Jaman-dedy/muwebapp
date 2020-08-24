import {
  CREATE_SERVICE_START,
  CREATE_SERVICE_SUCCESS,
  CREATE_SERVICE_ERROR,
} from 'constants/action-types/peerServices';

export default (state, { type, payload }) => {
  switch (type) {
    case CREATE_SERVICE_START:
      return {
        ...state,
        createService: {
          ...state.createService,
          loading: true,
          error: null,
        },
        updateService: {
          ...state.updateService,
          loading: true,
          error: null,
        },
      };
    case CREATE_SERVICE_ERROR:
      return {
        ...state,
        createService: {
          ...state.createService,
          error: payload,
          loading: false,
        },
      };
    case CREATE_SERVICE_SUCCESS:
      return {
        ...state,
        createService: {
          ...state.createService,
          error: null,
          loading: false,
          data: payload.data[0],
        },
        servicesList: {
          ...state.servicesList,
          data: {
            Data: Array.isArray(state.servicesList.data?.Data)
              ? [
                  {
                    ...payload.data[0],
                    Owner: payload.requestData.Owner,
                    Media: payload.requestData.Media,
                    Comments: [],
                  },
                  ...state.servicesList.data.Data,
                ]
              : [
                  {
                    ...payload.data[0],
                    Comments: [],
                    Owner: payload.requestData.Owner,
                    Media: payload.requestData.Media,
                  },
                ],
          },
        },

        myServices: {
          ...state.myServices,
          data: {
            Data: Array.isArray(state.myServices.data?.Data)
              ? [
                  {
                    ...payload.data[0],
                    Owner: payload.requestData.Owner,
                    Media: payload.requestData.Media,
                    Comments: [],
                  },
                  ...state.myServices.data.Data,
                ]
              : [
                  {
                    ...payload.data[0],
                    Comments: [],
                    Owner: payload.requestData.Owner,
                    Media: payload.requestData.Media,
                  },
                ],
          },
        },
      };

    default:
      return null;
  }
};
