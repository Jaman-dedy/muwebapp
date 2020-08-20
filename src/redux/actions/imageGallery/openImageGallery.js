import { OPEN_IMAGE_GALLERY_MODAL } from 'constants/action-types/imageGallery';

export default data => dispatch => {
  dispatch({
    type: OPEN_IMAGE_GALLERY_MODAL,
    payload: data,
  });
};
