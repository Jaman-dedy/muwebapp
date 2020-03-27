import React from 'react';
import { Pagination } from 'semantic-ui-react';
import PropTypes from 'prop-types';

function AppPagination({ onPageChange, currentPage, totalPages }) {
  return (
    <Pagination
      boundaryRange={0}
      ellipsisItem
      floated="right"
      onPageChange={onPageChange}
      siblingRange={1}
      activePage={currentPage}
      totalPages={totalPages}
    />
  );
}

AppPagination.propTypes = {
  onPageChange: PropTypes.func.isRequired,
  currentPage: PropTypes.number,
  totalPages: PropTypes.number.isRequired,
};
AppPagination.defaultProps = {
  currentPage: 1,
};
export default AppPagination;
