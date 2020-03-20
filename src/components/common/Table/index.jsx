import React, { useState } from 'react';
import { Table, Label } from 'semantic-ui-react';
import AppPagination from '../Pagination';
import './style.scss';

const AppTable = ({ headers, data, loading }) => {
  const ITEMS_PER_PAGE = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(
    data && data[0] && data.length / ITEMS_PER_PAGE,
  );
  const indexOfLastContact = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstContact = indexOfLastContact - ITEMS_PER_PAGE;
  const showingItems =
    data &&
    data[0] &&
    data.slice(indexOfFirstContact, indexOfLastContact);
  const onPageChange = (e, pageInfo) => {
    setCurrentPage(pageInfo.activePage);
  };

  return (
    <>
      {!loading && (
        <Table unstackable>
          <Table.Header>
            <Table.Row>
              {headers.map(header => (
                <Table.HeaderCell>{header.value}</Table.HeaderCell>
              ))}
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {showingItems &&
              showingItems.map((item, i) => (
                <>
                  <Table.Row>
                    {headers.map((header, index) => (
                      <Table.Cell
                        positive={
                          item[header.key][0] > 0 &&
                          header.key === 'Amount'
                        }
                        negative={item[header.key].startsWith('-')}
                      >
                        {item[header.key]}
                      </Table.Cell>
                    ))}
                  </Table.Row>
                </>
              ))}
          </Table.Body>
          {data && data.length > ITEMS_PER_PAGE && (
            <Table.Footer>
              <Table.Row>
                <Table.HeaderCell colSpan="5">
                  <span className="current">
                    Page {currentPage} of {totalPages}
                  </span>
                  <AppPagination
                    data={data}
                    onPageChange={onPageChange}
                    totalPages={totalPages}
                    currentPage={currentPage}
                  />
                </Table.HeaderCell>
              </Table.Row>
            </Table.Footer>
          )}
        </Table>
      )}
    </>
  );
};

export default AppTable;
