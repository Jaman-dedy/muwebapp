import React from 'react';
import { Placeholder } from 'semantic-ui-react';

const LoadWallets = () => (
  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
    <Placeholder style={{ height: 140, width: 190 }}>
      <Placeholder.Image />
    </Placeholder>
    <Placeholder
      style={{ height: 140, width: 190, marginTop: '-0.3px' }}
    >
      <Placeholder.Image />
    </Placeholder>
    <Placeholder
      style={{ height: 140, width: 190, marginTop: '-0.3px' }}
    >
      <Placeholder.Image />
    </Placeholder>
  </div>
);

export default LoadWallets;
