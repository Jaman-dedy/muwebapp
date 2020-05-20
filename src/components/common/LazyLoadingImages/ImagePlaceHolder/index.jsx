import React from 'react';
import { Placeholder } from 'semantic-ui-react';

const ImagePlaceHolder = ({ style }) => (
  console.log('style :>> ', style),
  (
    <Placeholder style={style}>
      <Placeholder.Image />
    </Placeholder>
  )
);

export default ImagePlaceHolder;
