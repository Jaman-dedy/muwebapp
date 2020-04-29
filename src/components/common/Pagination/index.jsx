import React, { useState, useEffect } from 'react';
import { Pagination } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import './style.scss';

function AppPagination({
  data,
  totalItems,
  itemsPerPage,
  onPageChange: onChange,
  showLabel,
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(
    (totalItems === 0 ? data && data[0] && data.length : totalItems) /
      itemsPerPage,
  );

  const onPageChange = (e, pageInfo) => {
    setCurrentPage(pageInfo.activePage);
  };

  useEffect(() => {
    const lastIndex = currentPage * itemsPerPage;
    const firstIndex = lastIndex - itemsPerPage;
    const showingItems =
      data && data[0] && data.slice(firstIndex, lastIndex);

    onChange(totalItems === 0 ? showingItems || [] : currentPage);
  }, [currentPage, data]);

  return (
    <>
      {showLabel && (
        <span className="current">
          {global.translate('Page')} {currentPage}{' '}
          {global.translate('of')} {totalPages}
        </span>
      )}
      <Pagination
        boundaryRange={0}
        ellipsisItem
        floated="right"
        className="pagination"
        onPageChange={onPageChange}
        siblingRange={1}
        activePage={currentPage}
        totalPages={totalPages}
      />
    </>
  );
}

AppPagination.propTypes = {
  onPageChange: PropTypes.func.isRequired, // when passing totalItems, it returns the current page
  totalItems: PropTypes.number,
  itemsPerPage: PropTypes.number,
  data: PropTypes.arrayOf(PropTypes.instanceOf(Object)).isRequired,
  showLabel: PropTypes.bool,
};
AppPagination.defaultProps = {
  totalItems: 0,
  itemsPerPage: 7,
  showLabel: false,
};
export default AppPagination;
