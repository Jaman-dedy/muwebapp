import React from 'react';
import { Placeholder } from 'semantic-ui-react';
import './style.scss';

const ItemsPlaceholder = () => (
  <Placeholder className="itemsLoading">
    <Placeholder.Header image>
      <Placeholder.Line />
      <Placeholder.Line />
    </Placeholder.Header>
    <Placeholder.Paragraph>
      <Placeholder.Line />
      <Placeholder.Line />
      <Placeholder.Line />
      <Placeholder.Line />
    </Placeholder.Paragraph>
  </Placeholder>
);
export default ItemsPlaceholder;
