import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';

const SearchView = ({ style, title, hideSearch }) => {
  return (
    <div
      data-after={
        hideSearch
          ? title || global.translate('Offer a service', 625)
          : global.translate('Find anything you want near you', 1787)
      }
      className={
        hideSearch ? 'no-search-view-wrapper' : 'search-view-wrapper'
      }
      style={{ ...style, ...{ paddingTop: hideSearch ? 35 : 0 } }}
    />
  );
};
SearchView.propTypes = {
  style: PropTypes.instanceOf(PropTypes.object),
  hideSearch: PropTypes.bool,
  title: PropTypes.string,
};

SearchView.defaultProps = {
  style: {},
  hideSearch: false,
  title: null,
};
export default SearchView;
