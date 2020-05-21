import React from 'react';
import { Placeholder } from 'semantic-ui-react';

const ImagePlaceHolder = ({ style }) => (
  <Placeholder style={style}>
    <Placeholder.Image />
  </Placeholder>
);

export default ImagePlaceHolder;
