import React from 'react';
import ReactBnbGallery from 'react-bnb-gallery';
import { useSelector, useDispatch } from 'react-redux';
import openImageGallery from 'redux/actions/imageGallery/openImageGallery';

const ImageGallery = () => {
  const dispatch = useDispatch();
  const { open, photos, activePhotoIndex } = useSelector(
    state => state.imageGallery.imageGallery,
  );

  const phrases = {
    noPhotosProvided: global.translate('No photos to show'),
    showPhotoList: global.translate('Show photos List'),
    hidePhotoList: global.translate('Hide photos to show'),
  };
  return (
    <ReactBnbGallery
      show={open}
      photos={photos}
      activePhotoIndex={activePhotoIndex}
      phrases={phrases}
      backgroundColor="rgba(0, 0, 0, 0.82)"
      onClose={() =>
        openImageGallery({ open: false, photos: null })(dispatch)
      }
    />
  );
};

export default ImageGallery;
