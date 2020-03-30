import React, { useState, useEffect } from 'react';
import { Pagination } from 'semantic-ui-react';
import PropTypes from 'prop-types';

function AppPagination({
  data,
  itemsPerPage,
  onPageChange: onChange,
  showLabel,
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(
    data && data[0] && data.length / itemsPerPage,
  );

  const onPageChange = (e, pageInfo) => {
    setCurrentPage(pageInfo.activePage);
  };

  useEffect(() => {
    const lastIndex = currentPage * itemsPerPage;
    const firstIndex = lastIndex - itemsPerPage;
    const showingItems =
      data && data[0] && data.slice(firstIndex, lastIndex);

    onChange(showingItems || []);
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
        onPageChange={onPageChange}
        siblingRange={1}
        activePage={currentPage}
        totalPages={totalPages}
      />
    </>
  );
}

AppPagination.propTypes = {
  onPageChange: PropTypes.func.isRequired,
  itemsPerPage: PropTypes.number,
  data: PropTypes.arrayOf(PropTypes.instanceOf(Object)).isRequired,
  showLabel: PropTypes.bool,
};
AppPagination.defaultProps = {
  itemsPerPage: 7,
  showLabel: false,
};
export default AppPagination;
