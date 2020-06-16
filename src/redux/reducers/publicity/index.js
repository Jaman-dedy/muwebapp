import initialState from 'redux/initial-states/publicity';
import addPublicityReducer from './addPublicity';
import getPublicitiesReducer from './getPublicities';
import executeCampaingReducer from './executeCampaing';
import calcPublicityCostReducer from './calcPublicityCost';
import deletePublicityReducer from './deletePublicity';

export default (state = initialState, action = {}) => ({
  ...state,
  ...addPublicityReducer(state, action),
  ...getPublicitiesReducer(state, action),
  ...executeCampaingReducer(state, action),
  ...calcPublicityCostReducer(state, action),
  ...deletePublicityReducer(state, action),
});
