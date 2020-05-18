import React from 'react';
import { Input } from 'semantic-ui-react';

const SearchInput = ({ style, handleKeyUp }) => (
  <Input
    style={style}
    action={{ icon: 'search' }}
    placeholder="Search..."
    onKeyUp={handleKeyUp}
  />
);

export default SearchInput;
