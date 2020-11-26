/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { Pagination } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import './style.scss';
import { propTypes } from 'mgr-pdf-viewer-react/dist/mgr-pdf-viewer-react';

function AppPagination({
  data,
  totalItems,
  itemsPerPage,
  onPageChange: onChange,
  showLabel,
  showPagination,
  ...props
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages =
    data && data[0] ? Math.ceil(data.length / itemsPerPage) : 1;

  const onPageChange = (e, pageInfo) => {
    setCurrentPage(pageInfo.activePage);
  };

  useEffect(() => {
    console.log(totalPages);
  }, [totalPages]);
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
          {global.translate('Page')} {currentPage}
          {global.translate('of')} {totalPages}
        </span>
      )}
      {data.length > itemsPerPage && (
        <Pagination
          // {...props}
          boundaryRange={0}
          floated="right"
          className="pagination"
          onPageChange={onPageChange}
          siblingRange={1}
          defaultActivePage={1}
          activePage={currentPage}
          totalPages={totalPages}
        />
      )}
    </>
  );
}

AppPagination.propTypes = {
  onPageChange: PropTypes.func.isRequired, // when passing totalItems, it returns the current page
  totalItems: PropTypes.number,
  itemsPerPage: PropTypes.number,
  data: PropTypes.arrayOf(PropTypes.instanceOf(Object)).isRequired,
  showLabel: PropTypes.bool,
  totalPages: PropTypes.number,
  showPagination: propTypes.bool,
};
AppPagination.defaultProps = {
  totalItems: 0,
  itemsPerPage: 7,
  showLabel: false,
  totalPages: 1,
  showPagination: false,
};
export default AppPagination;
