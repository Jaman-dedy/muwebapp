import React from 'react';
import { Input } from 'semantic-ui-react';

const SearchInput = ({ style }) => (
  console.log('style :>> ', style),
  (
    <Input
      style={style}
      action={{ icon: 'search' }}
      placeholder="Search..."
    />
  )
);

export default SearchInput;
