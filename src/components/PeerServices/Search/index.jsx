import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';

const SearchView = ({ style, hideSearch }) => {
  return (
    <div
      data-after={
        hideSearch
          ? global.translate('Offer a service', 625)
          : global.translate('Find anything you want near you', 1787)
      }
      className={
        hideSearch ? 'no-search-view-wrapper' : 'search-view-wrapper'
      }
      style={style}
    />
  );
};
SearchView.propTypes = {
  style: PropTypes.instanceOf(PropTypes.object),
  hideSearch: PropTypes.bool,
};

SearchView.defaultProps = {
  style: {},
  hideSearch: false,
};
export default SearchView;
