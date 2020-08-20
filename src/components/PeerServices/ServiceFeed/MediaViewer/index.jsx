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
    noPhotosProvided: global.translate('No photos to show', 1885),
    showPhotoList: global.translate('Show photos List', 1886),
    hidePhotoList: global.translate('Hide photos to show', 1887),
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
