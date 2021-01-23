import React, { useState } from 'react';
import { Dropdown, Button, Input } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import './style.scss';

const SearchFilter = ({
  icon,
  setAllTransactionData,
  allTransactionData,
}) => {
  const [dataToSearch, setDataToSearch] = useState(null);
  const onOptionsChange = (e, { name, value }) => {
    setDataToSearch({ ...dataToSearch, [name]: value });
  };
  const searchKeys =
    allTransactionData &&
    allTransactionData[0] &&
    Object.keys(allTransactionData[0]);
  const searchFields = () => {
    const matched = [];
    if (allTransactionData) {
      for (
        let index = 0;
        index < allTransactionData.length;
        index += 1
      ) {
        const element = allTransactionData[index];
        for (let index = 0; index < searchKeys.length; index += 1) {
          if (
            element[searchKeys[index]] &&
            element[searchKeys[index]]
              .toLowerCase()
              .startsWith(
                dataToSearch.searchValue &&
                  dataToSearch.searchValue.toLowerCase(),
              )
          ) {
            matched.push(element);
          }
        }
      }
    }
    setAllTransactionData(matched);
  };

  return (
    <Dropdown
      floating
      button
      icon={icon}
      className="icon search-dropdown"
      closeOnBlur={false}
    >
      <Dropdown.Menu className="search-dropdown-menu">
        <div className="menu-title">Search transaction</div>
        <Input
          onClick={e => e.stopPropagation()}
          placeholder="Type and search..."
          name="searchValue"
          onChange={onOptionsChange}
        />
        <div className="search-action">
          <Button onClick={searchFields} disabled={!dataToSearch}>
            {global.translate('Search')}
          </Button>
        </div>
      </Dropdown.Menu>
    </Dropdown>
  );
};

SearchFilter.propTypes = {
  icon: PropTypes.string,
  setAllTransactionData: PropTypes.func,
  allTransactionData: PropTypes.arrayOf(PropTypes.any),
};
SearchFilter.defaultProps = {
  icon: '',
  setAllTransactionData: () => {},
  allTransactionData: [],
};

export default SearchFilter;
