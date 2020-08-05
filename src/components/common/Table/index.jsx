/* eslint-disable react-hooks/exhaustive-deps */
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
  Button,
  Pagination,
} from 'semantic-ui-react';
import formatNumber from 'utils/formatNumber';
import TransactionDetails from 'components/Transactions/TransactionDetails';
import AllTransactionDetails from 'components/Transactions/AllTransactionDetails';
import PendingVoucherDetails from 'components/Transactions/pendingVoucherDetail';
import useWindowSize from 'utils/useWindowSize';
import AppPagination from '../Pagination';
import './style.scss';
import Message from '../Message';
import TableFilters from './TableFilters';
import EllipseMenu from '../EllipseOptions';

const AppTable = ({
  headers,
  data,
  loading,
  error,
  tableVisible,
  onRefreshClicked,
  showOptions,
  onMoreClicked,
  filterUi,
  isAtAllTransactions,
  userLanguage,
  showFilter,
  allDestFilterOptions,
  allSourceFilterOptions,
  type,
  options,
  fromVouchers,
  fromStoreVouchers,
  walletPaginationInfo,
  getMoreResults,
}) => {
  const [form, setForm] = useState({});
  const [visible, setVisible] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [showingItems, setShowingItems] = useState([]);
  const [allItems, setAllItems] = useState([]);

  useEffect(() => {
    if (walletPaginationInfo?.CurrentPage) {
      if (data) {
        setShowingItems(data);
      }
    }
  }, [walletPaginationInfo, data]);

  const onPageChange = showingItems => {
    setShowingItems(showingItems);
  };

  const onWalletTransactionPageChange = (e, showingItems) => {
    getMoreResults(showingItems.activePage);
  };

  const onChange = (e, { name, value }) => {
    setForm({ ...form, [name]: value });
  };
  const { width } = useWindowSize();

  const searchFields = data && data[0] && Object.keys(data[0]);
  const [isFiltering, setIsFiltering] = useState(false);

  useEffect(() => {
    if (visible) {
      setIsFiltering(true);
    } else if (!isSearching) {
      setIsFiltering(false);
      setForm({});
    }
  }, [visible, isSearching]);
  const handleFilterItems = ({
    sourceWallet = '',
    targetAccount = '',
  }) => {
    setIsFiltering(true);
    setIsSearching(true);
    let items;

    if (type === 'all') {
      if (sourceWallet !== '' && targetAccount !== '') {
        items = data.filter(
          d =>
            d.WalletNumber === sourceWallet &&
            d.TargetAccount === targetAccount,
        );
      }
      if (sourceWallet === '' && targetAccount !== '') {
        items = data.filter(d => d.TargetAccount === targetAccount);
      }
      if (sourceWallet !== '' && targetAccount === '') {
        items = data.filter(d => d.WalletNumber === sourceWallet);
      }
      setAllItems(items);
    } else {
      if (sourceWallet !== '' && targetAccount !== '') {
        items = data.filter(
          d =>
            d.SourceAccountNumber === sourceWallet &&
            d.PhoneNumber === targetAccount,
        );
      }
      if (sourceWallet === '' && targetAccount !== '') {
        items = data.filter(d => d.PhoneNumber === targetAccount);
      }
      if (sourceWallet !== '' && targetAccount === '') {
        items = data.filter(
          d => d.SourceAccountNumber === sourceWallet,
        );
      }
      setAllItems(items);
    }

    if (sourceWallet === '' && targetAccount === '') {
      items = data.filter(d => d);
      setIsSearching(false);
    }
    setAllItems(items);

    setVisible(!visible);
  };
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

  const showPopUpContent = item => {
    if (fromVouchers) {
      return (
        <PendingVoucherDetails item={item} language={userLanguage} />
      );
    }
    if (isAtAllTransactions) {
      return (
        <AllTransactionDetails item={item} language={userLanguage} />
      );
    }
    return <TransactionDetails item={item} language={userLanguage} />;
  };

  return (
    <>
      <div className="right-table-items">
        {filterUi}
        {!loading && !error && (
          <div className="right-wrapper">
            <Input
              icon="search"
              name="searchValue"
              value={form.searchValue || ''}
              onChange={onChange}
              className="searchInput"
              placeholder={global.translate('Search', 278)}
            />
            {showFilter && (
              <>
                <Button
                  style={{ marginLeft: 7 }}
                  className="filterButton"
                  toggle
                  size={width < 700 && 'mini'}
                  active={isFiltering}
                  onClick={() => {
                    setIsFiltering(!isFiltering);
                    setVisible(!visible);
                  }}
                >
                  {' '}
                  <Icon name="filter" />
                </Button>

                {isSearching && (
                  <Button
                    size={width < 700 && 'mini'}
                    style={{ marginLeft: 7 }}
                    active={isFiltering}
                    onClick={() => {
                      setIsSearching(false);
                      setIsFiltering(false);
                    }}
                  >
                    {width < 700
                      ? global.translate('Clear')
                      : global.translate('Clear filters')}
                  </Button>
                )}
              </>
            )}
          </div>
        )}
      </div>

      {!loading && !error && (
        <>
          {!tableVisible && (
            <Segment>
              <Icon
                onClick={onRefreshClicked}
                className="refresh-icon"
                name="refresh"
                size="small"
                style={{
                  display: 'block',
                  width: '20%',
                  margin: '35px auto -20px auto',
                }}
              />
              <Header disabled icon style={{ display: 'block' }}>
                {global.translate('click refresh to see new results')}
              </Header>
            </Segment>
          )}
          {tableVisible && (
            <>
              <TableFilters
                setVisible={setVisible}
                visible={visible}
                fromStoreVouchers={fromStoreVouchers}
                setIsSearching={setIsSearching}
                handleFilterItems={handleFilterItems}
                allDestFilterOptions={allDestFilterOptions}
                allSourceFilterOptions={allSourceFilterOptions}
                contentChildren={
                  <Table unstackable className="main-table">
                    <Table.Header>
                      <Table.Row>
                        {showingItems &&
                          showingItems[0] &&
                          showingItems[0].Amount && (
                            <Table.HeaderCell className="in-out-indicator"></Table.HeaderCell>
                          )}
                        {headers.map((header, i) => (
                          <Table.HeaderCell
                            className={header.key}
                            key={i}
                          >
                            {header.value}
                          </Table.HeaderCell>
                        ))}
                        {showOptions && (
                          <Table.HeaderCell></Table.HeaderCell>
                        )}
                      </Table.Row>
                    </Table.Header>

                    <Table.Body>
                      {!isSearching &&
                        showingItems &&
                        showingItems.map((item, i) => (
                          <>
                            <Popup
                              key={i.toString()}
                              mouseEnterDelay={700}
                              mouseLeaveDelay={700}
                              trigger={
                                <Table.Row>
                                  {showingItems &&
                                    showingItems[0].Amount && (
                                      <Table.Cell
                                        className="in-out-indicator"
                                        style={{ width: 5 }}
                                      >
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

                                  {headers.map((header, i) => (
                                    <Table.Cell
                                      key={i.toString()}
                                      className={header.key}
                                    >
                                      {header.key === 'StatusCode' &&
                                        item.StatusCode === '3' && (
                                          <>
                                            {' '}
                                            <Icon
                                              name="cancel"
                                              color="red"
                                            />
                                            {global.translate(
                                              'Cancelled',
                                            )}
                                          </>
                                        )}
                                      {header.key === 'StatusCode' &&
                                        item.StatusCode === '1' && (
                                          <>
                                            {' '}
                                            <Icon
                                              name="checkmark"
                                              color="green"
                                            />
                                            {global.translate('Paid')}
                                          </>
                                        )}
                                      {header.key === 'StatusCode' &&
                                        item.StatusCode === '0' && (
                                          <>
                                            {' '}
                                            <Icon name="check" />
                                            {global.translate(
                                              'Available',
                                              1130,
                                            )}
                                          </>
                                        )}

                                      {header.key ===
                                        'SourceAmount' && (
                                        <Image
                                          avatar
                                          style={{
                                            borderRadius: 0,
                                            maxHeight: 16,
                                            width: 18,
                                            marginBottom: 3,
                                          }}
                                          src={
                                            item.SourceCurrencyFlag
                                          }
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
                                            src={
                                              item.SourceCurrencyFlag
                                            }
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
                                            src={
                                              item.TargetCurrencyFlag
                                            }
                                          />
                                        )}
                                      {header.key ===
                                        'DestAmount' && (
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
                                      {header.key ===
                                        'TargetAccount' && (
                                        <Image
                                          avatar
                                          src={
                                            item.TargetCurrencyFlag
                                          }
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
                                          src={
                                            item.SourceCurrencyFlag
                                          }
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
                                        formatNumber(
                                          item[header.key],
                                          {
                                            locales: userLanguage,
                                          },
                                        )}
                                      {item[header.key] &&
                                        header.key === 'Amount' &&
                                        header.value === 'Credit' &&
                                        item.OpsType === '+' &&
                                        formatNumber(
                                          item[header.key],
                                          {
                                            locales: userLanguage,
                                          },
                                        )}
                                      {item[header.key] &&
                                        header.key === 'DestAmount' &&
                                        formatNumber(
                                          item[header.key],
                                          {
                                            locales: userLanguage,
                                          },
                                        )}
                                      {item[header.key] &&
                                        header.key ===
                                          'SourceAmount' &&
                                        formatNumber(
                                          item[header.key],
                                          {
                                            locales: userLanguage,
                                          },
                                        )}

                                      {header.key === 'FirstName' &&
                                        `${item.FirstName} ${item.LastName}`}

                                      {header.key ===
                                        'SenderFirstName' &&
                                        `${item.SenderFirstName} ${item.SenderLastName}`}
                                      {item[header.key] &&
                                        header.key !== 'Amount' &&
                                        header.key !== 'DestAmount' &&
                                        header.key !== 'StatusCode' &&
                                        header.key !==
                                          'SenderFirstName' &&
                                        header.key !==
                                          'SourceAmount' &&
                                        header.key !== 'FirstName' &&
                                        item[header.key]}
                                      {header.key ===
                                        'DestAmount' && (
                                        <span>
                                          {' '}
                                          {item.DestCurrency}
                                        </span>
                                      )}
                                      {header.key ===
                                        'SourceAmount' && (
                                        <span>
                                          {' '}
                                          {item.SourceCurrency}
                                        </span>
                                      )}
                                    </Table.Cell>
                                  ))}

                                  {showOptions && (
                                    <Table.Cell>
                                      <EllipseMenu
                                        className="moreOptions"
                                        userItemStyle={{
                                          paddingLeft: 15,
                                        }}
                                        onMouseEnter={() => {
                                          onMoreClicked(item);
                                        }}
                                        disabled={
                                          item.StatusCode === '1' ||
                                          item.StatusCode === '3'
                                        }
                                        options={options}
                                      />
                                    </Table.Cell>
                                  )}
                                </Table.Row>
                              }
                              position="right center"
                              content={showPopUpContent(item)}
                            />
                          </>
                        ))}
                      {isSearching &&
                        allItems &&
                        allItems.length === 0 && (
                          <Table.Row>
                            <Table.Cell colSpan={headers.length + 1}>
                              {' '}
                              <Message
                                error={false}
                                message={global.translate(
                                  'No results found for the search',
                                )}
                              />
                            </Table.Cell>
                          </Table.Row>
                        )}

                      {isSearching &&
                        allItems &&
                        allItems.map((item, i) => (
                          <>
                            <Popup
                              key={i.toString() + item[0]}
                              mouseEnterDelay={700}
                              mouseLeaveDelay={700}
                              trigger={
                                <Table.Row>
                                  {showingItems &&
                                    showingItems[0].Amount && (
                                      <Table.Cell
                                        className="in-out-indicator"
                                        style={{ width: 5 }}
                                      >
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

                                  {headers.map((header, i) => (
                                    <Table.Cell
                                      key={i.toString()}
                                      className={header.key}
                                    >
                                      {header.key === 'StatusCode' &&
                                        item.StatusCode === '3' && (
                                          <>
                                            {' '}
                                            <Icon
                                              name="cancel"
                                              color="red"
                                            />
                                            {global.translate(
                                              'Cancelled',
                                            )}
                                          </>
                                        )}
                                      {header.key === 'StatusCode' &&
                                        item.StatusCode === '1' && (
                                          <>
                                            {' '}
                                            <Icon
                                              name="checkmark"
                                              color="green"
                                            />
                                            {global.translate('Paid')}
                                          </>
                                        )}
                                      {header.key === 'StatusCode' &&
                                        item.StatusCode === '0' && (
                                          <>
                                            {' '}
                                            <Icon name="check" />
                                            {global.translate(
                                              'Available',
                                              1130,
                                            )}
                                          </>
                                        )}
                                      {header.key ===
                                        'SourceAmount' && (
                                        <Image
                                          avatar
                                          style={{
                                            borderRadius: 0,
                                            maxHeight: 16,
                                            width: 18,
                                            marginBottom: 3,
                                          }}
                                          src={
                                            item.SourceCurrencyFlag
                                          }
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
                                            src={
                                              item.SourceCurrencyFlag
                                            }
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
                                            src={
                                              item.TargetCurrencyFlag
                                            }
                                          />
                                        )}
                                      {header.key ===
                                        'DestAmount' && (
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
                                      {header.key ===
                                        'TargetAccount' && (
                                        <Image
                                          avatar
                                          src={
                                            item.TargetCurrencyFlag
                                          }
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
                                          src={
                                            item.SourceCurrencyFlag
                                          }
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
                                        formatNumber(
                                          item[header.key],
                                          {
                                            locales: userLanguage,
                                          },
                                        )}
                                      {item[header.key] &&
                                        header.key === 'Amount' &&
                                        header.value === 'Credit' &&
                                        item.OpsType === '+' &&
                                        formatNumber(
                                          item[header.key],
                                          {
                                            locales: userLanguage,
                                          },
                                        )}
                                      {item[header.key] &&
                                        header.key === 'DestAmount' &&
                                        formatNumber(
                                          item[header.key],
                                          {
                                            locales: userLanguage,
                                          },
                                        )}
                                      {item[header.key] &&
                                        header.key ===
                                          'SourceAmount' &&
                                        formatNumber(
                                          item[header.key],
                                          {
                                            locales: userLanguage,
                                          },
                                        )}
                                      {header.key === 'FirstName' &&
                                        `${item.FirstName} ${item.LastName}`}

                                      {header.key ===
                                        'SenderFirstName' &&
                                        `${item.SenderFirstName} ${item.SenderLastName}`}
                                      {item[header.key] &&
                                        header.key !== 'Amount' &&
                                        header.key !== 'DestAmount' &&
                                        header.key !==
                                          'SourceAmount' &&
                                        header.key !== 'StatusCode' &&
                                        header.key !== 'FirstName' &&
                                        header.key !==
                                          'SenderFirstName' &&
                                        item[header.key]}
                                      {header.key ===
                                        'DestAmount' && (
                                        <span>
                                          {' '}
                                          {item.DestCurrency}
                                        </span>
                                      )}
                                      {header.key ===
                                        'SourceAmount' && (
                                        <span>
                                          {' '}
                                          {item.SourceCurrency}
                                        </span>
                                      )}
                                    </Table.Cell>
                                  ))}

                                  {showOptions && (
                                    <Table.Cell className="moreIcon">
                                      <Icon
                                        style={{
                                          cursor: 'pointer',
                                        }}
                                        disabled={
                                          item.StatusCode === '1' ||
                                          item.StatusCode === '3'
                                        }
                                        className="moreIcon"
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
                              content={showPopUpContent(item)}
                            />
                          </>
                        ))}
                    </Table.Body>
                    {data && !isSearching && (
                      <Table.Footer>
                        <Table.Row>
                          <Table.HeaderCell
                            colSpan={headers.length + 1}
                          >
                            {walletPaginationInfo?.CurrentPage && (
                              <>
                                {' '}
                                <span className="current">
                                  {global.translate('Page')}{' '}
                                  {walletPaginationInfo.CurrentPage}{' '}
                                  {global.translate('of')}{' '}
                                  {Number(
                                    walletPaginationInfo.TotalPages,
                                  ) !== 0
                                    ? walletPaginationInfo.TotalPages
                                    : 1}
                                </span>
                                <Pagination
                                  data={data}
                                  defaultActivePage={
                                    walletPaginationInfo.CurrentPage
                                  }
                                  totalPages={
                                    walletPaginationInfo.TotalPages
                                  }
                                  boundaryRange={0}
                                  floated="right"
                                  className="pagination"
                                  onPageChange={
                                    onWalletTransactionPageChange
                                  }
                                  siblingRange={1}
                                />
                              </>
                            )}
                            {!walletPaginationInfo?.CurrentPage && (
                              <AppPagination
                                data={data}
                                className="app-pagination"
                                onPageChange={onPageChange}
                                showLabel
                              />
                            )}
                          </Table.HeaderCell>
                        </Table.Row>
                      </Table.Footer>
                    )}
                  </Table>
                }
              />
            </>
          )}
        </>
      )}
    </>
  );
};

AppTable.propTypes = {
  headers: PropTypes.arrayOf(PropTypes.any).isRequired,
  data: PropTypes.arrayOf(PropTypes.any),
  loading: PropTypes.bool,
  showOptions: PropTypes.bool,
  onRefreshClicked: PropTypes.func,
  onMoreClicked: PropTypes.func,
  filterUi: PropTypes.node,
  error: PropTypes.objectOf(PropTypes.any),
  isAtAllTransactions: PropTypes.bool,
  tableVisible: PropTypes.bool,
  userLanguage: PropTypes.string,
  showFilter: PropTypes.bool,
  allDestFilterOptions: PropTypes.arrayOf(PropTypes.any).isRequired,
  allSourceFilterOptions: PropTypes.arrayOf(PropTypes.any).isRequired,
  type: PropTypes.string,
  fromStoreVouchers: PropTypes.bool,
  walletPaginationInfo: PropTypes.objectOf(PropTypes.any).isRequired,
};
AppTable.defaultProps = {
  loading: false,
  data: null,
  showOptions: false,
  filterUi: <div />,
  onRefreshClicked: () => null,
  isAtAllTransactions: false,
  error: null,
  type: 'all',
  showFilter: true,
  tableVisible: true,
  userLanguage: localStorage.getItem('language') || 'en',
  onMoreClicked: () => null,
  fromStoreVouchers: false,
};
export default AppTable;
