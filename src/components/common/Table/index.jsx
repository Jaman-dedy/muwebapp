import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Table,
  Icon,
  Input,
  Popup,
  Image,
  Segment,
  Header,
} from 'semantic-ui-react';
import formatNumber from 'utils/formatNumber';
import TransactionDetails from 'components/Transactions/TransactionDetails';
import AllTransactionDetails from 'components/Transactions/AllTransactionDetails';
import AppPagination from '../Pagination';
import './style.scss';
import Message from '../Message';

const AppTable = ({
  headers,
  data,
  loading,
  error,
  tableVisible,
  showOptions,
  itemsPerPage,
  onMoreClicked,
  filterUi,
  isAtAllTransactions,
  userLanguage,
}) => {
  const [form, setForm] = useState({});
  const [isSearching, setIsSearching] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(
    data && data[0] && data.length / itemsPerPage,
  );
  const indexOfLastContact = currentPage * itemsPerPage;
  const indexOfFirstContact = indexOfLastContact - itemsPerPage;
  const showingItems =
    data &&
    data[0] &&
    data.slice(indexOfFirstContact, indexOfLastContact);

  const [allItems, setAllItems] = useState([]);
  const onPageChange = (e, pageInfo) => {
    setCurrentPage(pageInfo.activePage);
  };

  const onChange = (e, { name, value }) => {
    setForm({ ...form, [name]: value });
  };

  const searchFields = headers.map(header => {
    return header.key;
  });

  useEffect(() => {
    if (
      form.searchValue &&
      form.searchValue.trim().length > 0 &&
      Array.isArray(data)
    ) {
      setIsSearching(true);
      const matched = [];
      for (let index = 0; index < data.length; index += 1) {
        const element = data[index];
        for (let index = 0; index < searchFields.length; index += 1) {
          if (
            element[searchFields[index]] &&
            element[searchFields[index]]
              .toLowerCase()
              .startsWith(
                form.searchValue && form.searchValue.toLowerCase(),
              )
          ) {
            matched.push(element);
          }
        }
      }

      setAllItems(matched);
    } else {
      setIsSearching(false);
    }
  }, [form]);

  return (
    <>
      <div className="right-table-items">
        {filterUi}
        {!loading && !error && (
          <Input
            icon="search"
            name="searchValue"
            value={form.searchValue || ''}
            onkeyup={onChange}
            onChange={onChange}
            className="searchInput"
            placeholder={global.translate('Search', 278)}
          />
        )}
      </div>

      {!loading && !error && (
        <>
          {!tableVisible && (
            <Segment>
              <Icon
                name="refresh"
                size="small"
                style={{
                  display: 'block',
                  width: '20%',
                  margin: '35px auto -20px auto',
                }}
              />
              <Header disabled icon>
                {global.translate('click refresh to see new results')}
              </Header>
            </Segment>
          )}
          {tableVisible && (
            <Table unstackable>
              <Table.Header>
                <Table.Row>
                  {showingItems &&
                    showingItems[0] &&
                    showingItems[0].Amount && (
                      <Table.HeaderCell></Table.HeaderCell>
                    )}
                  {headers.map(header => (
                    <Table.HeaderCell>
                      {header.value}
                    </Table.HeaderCell>
                  ))}
                  {showOptions && (
                    <Table.HeaderCell>
                      {global.translate('Actions')}
                    </Table.HeaderCell>
                  )}
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {!isSearching &&
                  showingItems &&
                  showingItems.map(item => (
                    <>
                      <Popup
                        trigger={
                          <Table.Row>
                            {showingItems && showingItems[0].Amount && (
                              <Table.Cell style={{ width: 5 }}>
                                {item.OpsType === '-' && (
                                  <Icon
                                    className="icon-out"
                                    name="long arrow alternate left"
                                    color="red"
                                  />
                                )}

                                {item.OpsType === '+' && (
                                  <Icon
                                    className="icon-in"
                                    name="long arrow alternate right"
                                    color="green"
                                  />
                                )}
                              </Table.Cell>
                            )}

                            {headers.map(header => (
                              <Table.Cell>
                                {header.key === 'SourceAmount' && (
                                  <Image
                                    avatar
                                    style={{
                                      borderRadius: 0,
                                      maxHeight: 16,
                                      width: 18,
                                      marginBottom: 3,
                                    }}
                                    src={item.SourceCurrencyFlag}
                                  />
                                )}
                                {item[header.key] &&
                                  header.key === 'Amount' &&
                                  header.value === 'Debit' &&
                                  item.OpsType === '-' && (
                                    <Image
                                      avatar
                                      style={{
                                        borderRadius: 0,
                                        maxHeight: 16,
                                        width: 18,
                                        marginBottom: 3,
                                      }}
                                      src={item.TargetCurrencyFlag}
                                    />
                                  )}
                                {item[header.key] &&
                                  header.key === 'Amount' &&
                                  header.value === 'Credit' &&
                                  item.OpsType === '+' && (
                                    <Image
                                      avatar
                                      style={{
                                        borderRadius: 0,
                                        maxHeight: 16,
                                        width: 18,
                                        marginBottom: 3,
                                      }}
                                      src={item.TargetCurrencyFlag}
                                    />
                                  )}
                                {header.key === 'DestAmount' && (
                                  <Image
                                    avatar
                                    style={{
                                      borderRadius: 0,
                                      maxHeight: 16,
                                      width: 18,
                                      marginBottom: 3,
                                    }}
                                    src={item.DestCurrencyFlag}
                                  />
                                )}
                                {header.key === 'TargetAccount' && (
                                  <Image
                                    avatar
                                    src={item.TargetCurrencyFlag}
                                    style={{
                                      borderRadius: 0,
                                      maxHeight: 16,
                                      width: 18,
                                      marginBottom: 3,
                                    }}
                                  />
                                )}
                                {header.key ===
                                  'SourceAccountNumber' && (
                                  <Image
                                    avatar
                                    src={item.SourceCurrencyFlag}
                                    style={{
                                      borderRadius: 0,
                                      maxHeight: 16,
                                      width: 18,
                                      marginBottom: 3,
                                    }}
                                  />
                                )}
                                {item[header.key] &&
                                  header.key === 'Amount' &&
                                  header.value === 'Debit' &&
                                  item.OpsType === '-' &&
                                  formatNumber(item[header.key], {
                                    locales: userLanguage,
                                  })}
                                {item[header.key] &&
                                  header.key === 'Amount' &&
                                  header.value === 'Credit' &&
                                  item.OpsType === '+' &&
                                  formatNumber(item[header.key], {
                                    locales: userLanguage,
                                  })}
                                {item[header.key] &&
                                  header.key === 'DestAmount' &&
                                  formatNumber(item[header.key], {
                                    locales: userLanguage,
                                  })}
                                {item[header.key] &&
                                  header.key === 'SourceAmount' &&
                                  formatNumber(item[header.key], {
                                    locales: userLanguage,
                                  })}
                                {item[header.key] &&
                                  header.key !== 'Amount' &&
                                  header.key !== 'DestAmount' &&
                                  header.key !== 'SourceAmount' &&
                                  item[header.key]}
                                {header.key === 'DestAmount' && (
                                  <span> {item.DestCurrency}</span>
                                )}
                                {header.key === 'SourceAmount' && (
                                  <span> {item.SourceCurrency}</span>
                                )}
                              </Table.Cell>
                            ))}

                            {showOptions && (
                              <Table.Cell>
                                <Icon
                                  name="ellipsis vertical"
                                  onClick={() => {
                                    onMoreClicked(item);
                                  }}
                                />
                              </Table.Cell>
                            )}
                          </Table.Row>
                        }
                        position="right center"
                        content={
                          isAtAllTransactions ? (
                            <AllTransactionDetails
                              item={item}
                              language={userLanguage}
                            />
                          ) : (
                            <TransactionDetails
                              item={item}
                              language={userLanguage}
                            />
                          )
                        }
                      />
                    </>
                  ))}
                {isSearching && allItems.length === 0 && (
                  <Table.Row>
                    <Table.Cell colSpan={headers.length + 1}>
                      {' '}
                      <Message
                        error={false}
                        message={`No results found for ${form.searchValue}`}
                      />
                    </Table.Cell>
                  </Table.Row>
                )}

                {isSearching &&
                  allItems &&
                  allItems.map(item => (
                    <>
                      <Table.Row>
                        {showingItems && showingItems[0].Amount && (
                          <Table.Cell style={{ width: 5 }}>
                            {item.OpsType === '-' && (
                              <Icon
                                className="icon-out"
                                name="long arrow alternate left"
                                color="red"
                              />
                            )}

                            {item.OpsType === '+' && (
                              <Icon
                                className="icon-in"
                                name="long arrow alternate right"
                                color="green"
                              />
                            )}
                          </Table.Cell>
                        )}

                        {headers.map(header => (
                          <Table.Cell>
                            {header.key === 'SourceAmount' && (
                              <Image
                                avatar
                                style={{
                                  borderRadius: 0,
                                  maxHeight: 16,
                                  width: 18,
                                  marginBottom: 3,
                                }}
                                src={item.SourceCurrencyFlag}
                              />
                            )}
                            {header.key === 'Amount' && (
                              <Image
                                avatar
                                style={{
                                  borderRadius: 0,
                                  maxHeight: 16,
                                  width: 18,
                                  marginBottom: 3,
                                }}
                                src={item.TargetCurrencyFlag}
                              />
                            )}
                            {header.key === 'TargetAccount' && (
                              <Image
                                avatar
                                src={item.TargetCurrencyFlag}
                                style={{
                                  borderRadius: 0,
                                  maxHeight: 16,
                                  width: 18,
                                  marginBottom: 3,
                                }}
                              />
                            )}
                            {header.key === 'SourceAccountNumber' && (
                              <Image
                                avatar
                                src={item.SourceCurrencyFlag}
                                style={{
                                  borderRadius: 0,
                                  maxHeight: 16,
                                  width: 18,
                                  marginBottom: 3,
                                }}
                              />
                            )}
                            {item[header.key] && item[header.key]}
                          </Table.Cell>
                        ))}

                        {showOptions && (
                          <Table.Cell className="moreIcon">
                            <Icon
                              style={{ cursor: 'pointer' }}
                              className="moreIcon"
                              name="ellipsis vertical"
                              onClick={() => {
                                onMoreClicked(item);
                              }}
                            />
                          </Table.Cell>
                        )}
                      </Table.Row>
                    </>
                  ))}
              </Table.Body>
              {data && data.length > itemsPerPage && !isSearching && (
                <Table.Footer>
                  <Table.Row>
                    <Table.HeaderCell colSpan={headers.length + 1}>
                      <span className="current">
                        {global.translate('Page')} {currentPage}{' '}
                        {global.translate('of')} {totalPages}
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
      )}
    </>
  );
};

AppTable.propTypes = {
  headers: PropTypes.arrayOf(PropTypes.any).isRequired,
  data: PropTypes.arrayOf(PropTypes.any).isRequired,
  loading: PropTypes.bool,
  showOptions: PropTypes.bool,
  itemsPerPage: PropTypes.number,
  onMoreClicked: PropTypes.func,
  filterUi: PropTypes.node,
  error: PropTypes.objectOf(PropTypes.any),
  isAtAllTransactions: PropTypes.bool,
  tableVisible: PropTypes.bool,
  userLanguage: PropTypes.string,
};
AppTable.defaultProps = {
  loading: false,
  showOptions: false,
  filterUi: <div />,
  itemsPerPage: 7,
  isAtAllTransactions: false,
  error: null,
  tableVisible: true,
  userLanguage: localStorage.getItem('language') || 'en',
  onMoreClicked: () => null,
};
export default AppTable;
