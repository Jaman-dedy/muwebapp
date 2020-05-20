import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
const ImageLoader = ({ image }) => (
  <div>
    <LazyLoadImage
      style={{
        width: image.props.width,
        borderRadius: image.props.borderRadius,
      }}
      alt={image.props.alt}
      effect="blur"
      src={image.props.src} // use normal <img> attributes as props
      width={image.props.width}
    />
  </div>
);

export default ImageLoader;
