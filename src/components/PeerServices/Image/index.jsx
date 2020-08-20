/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Image } from 'semantic-ui-react';

const PeerImage = ({ src, width, height, ...props }) => {
  const { REACT_APP_FILE_SERVICES_URL } = process.env;
  return (
    <Image
      src={`${REACT_APP_FILE_SERVICES_URL}/files/compress-remote-image?source=${src}&width=${width}&height=${height}&format=jpeg`}
      {...props}
    />
  );
};

export default PeerImage;
