import { OPEN_IMAGE_GALLERY_MODAL } from 'constants/action-types/imageGallery';

export default (state, { type, payload = null }) => {
  switch (type) {
    case OPEN_IMAGE_GALLERY_MODAL:
      return {
        ...state,
        imageGallery: {
          open: payload.open,
          photos: payload.photos,
          activePhotoIndex: payload.activePhotoIndex || 0,
        },
      };
    default:
      return null;
  }
};
