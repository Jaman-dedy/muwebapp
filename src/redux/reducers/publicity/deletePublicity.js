import {
  DELETE_CAMPAIGN_ERROR,
  DELETE_CAMPAIGN_START,
  DELETE_CAMPAIGN_SUCCESS,
  CLEAR_DELETE_CAMPAIGN,
} from 'constants/action-types/publicity';

export default (state, { type, payload }) => {
  switch (type) {
    case DELETE_CAMPAIGN_START:
      return {
        ...state,
        deleteCampaign: {
          ...state.deleteCampaign,
          loading: true,
          error: null,
        },
      };

    case DELETE_CAMPAIGN_SUCCESS:
      return {
        ...state,
        deleteCampaign: {
          ...state.deleteCampaign,
          data: payload.data,
          loading: false,
          error: null,
        },

        publicities: {
          ...state.publicities,
          data: [
            ...state.publicities.data.filter(
              campaign => campaign.ID !== payload.campaign.CampaignID,
            ),
          ],
        },
      };

    case DELETE_CAMPAIGN_ERROR:
      return {
        ...state,
        deleteCampaign: {
          ...state.deleteCampaign,
          error: payload,
          loading: false,
        },
      };

    case CLEAR_DELETE_CAMPAIGN:
      return {
        ...state,
        deleteCampaign: {
          ...state.deleteCampaign,
          error: null,
          data: null,
          loading: false,
        },
      };
    default:
      return null;
  }
};
