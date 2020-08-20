import initialState from 'redux/initial-states/imageGallery';
import openImageGallery from './openImageGallery';

export default (state = initialState, action = {}) => ({
  ...state,
  ...openImageGallery(state, action),
});
