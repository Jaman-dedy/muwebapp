/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Input } from 'semantic-ui-react';

const SearchExampleStandard = props => {
  return (
    <Input
      icon="search"
      fluid
      iconPosition="left"
      {...props}
      style={{ marginBottom: 20 }}
    />
  );
};
export default SearchExampleStandard;
