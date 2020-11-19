import './style.scss';

import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import {
  Button,
  Header,
  Icon,
  Image,
  Input,
  Modal,
  Pagination,
  Segment,
  Table,
} from 'semantic-ui-react';
import AllTransactionDetails from 'components/Transactions/AllTransactionDetails';
import PendingVoucherDetails from 'components/Transactions/pendingVoucherDetail';
import TransactionDetails from 'components/Transactions/TransactionDetails';
import formatNumber from 'utils/formatNumber';
import useWindowSize from 'utils/useWindowSize';

import EllipseMenu from '../EllipseOptions';
import Message from '../Message';
import AppPagination from '../Pagination';
import TableFilters from './TableFilters';

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
  showFilter,
  allDestFilterOptions,
  allSourceFilterOptions,
  type,
  options,
  fromVouchers,
  fromStoreVouchers,
  transactionsPaginationInfo,
  getMoreResults,
  showPagination,
  firstColumn,
}) => {
  const [form, setForm] = useState({});
  const [visible, setVisible] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [showingItems, setShowingItems] = useState([]);
  const [currentItem, setCurrentItem] = useState({});
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [allItems, setAllItems] = useState([]);

  useEffect(() => {
    if (transactionsPaginationInfo?.CurrentPage) {
      if (data) {
        setShowingItems(data);
      }
    }
  }, [transactionsPaginationInfo, data]);

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

  const onItemClicked = item => {
    setCurrentItem(item);
    setDetailModalOpen(true);
  };

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

  const showPopUpContent = () => {
    if (fromVouchers) {
      return (
        <PendingVoucherDetails
          item={currentItem}
          language={localStorage.language}
        />
      );
    }
    if (isAtAllTransactions) {
      return (
        <AllTransactionDetails
          item={currentItem}
          language={localStorage.language}
        />
      );
    }
    return (
      <TransactionDetails
        item={currentItem}
        language={localStorage.language}
      />
    );
  };
  const isAtFirstColumn = () => {
    if (firstColumn) {
      return true;
    }

    return showingItems && showingItems[0] && showingItems[0].Amount;
  };
  return (
    <>
      <Modal
        open={detailModalOpen}
        size="mini"
        closeIcon
        onClose={() => {
          setDetailModalOpen(false);
          setCurrentItem({});
        }}
      >
        <Modal.Content>{showPopUpContent()}</Modal.Content>
      </Modal>
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
                      ? global.translate('Clear', 1994)
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
                  <Table unstackable className="main-table" celled>
                    <Table.Header>
                      <Table.Row>
                        {isAtFirstColumn() && (
                          <Table.HeaderCell className="in-out-indicator" />
                        )}
                        {headers.map((header, i) => (
                          <Table.HeaderCell
                            className={header?.key}
                            key={i}
                          >
                            {header.value}
                          </Table.HeaderCell>
                        ))}
                        {showOptions && <Table.HeaderCell />}
                      </Table.Row>
                    </Table.Header>

                    <Table.Body>
                      {!isSearching &&
                        showingItems &&
                        showingItems.map(item => (
                          <>
                            <Table.Row
                              key={Math.random() * Date.now()}
                              className="cursor-pointer"
                              onClick={() => {
                                onItemClicked(item);
                              }}
                            >
                              {firstColumn && (
                                <Table.Cell>
                                  {' '}
                                  <Image
                                    src={item.Logo}
                                    width={30}
                                  />{' '}
                                </Table.Cell>
                              )}
                              {showingItems &&
                                !firstColumn &&
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

                                  {item[header.key] &&
                                    header.key === 'Amount' &&
                                    header.operation === 'Debit' &&
                                    item.OpsType === '-' &&
                                    formatNumber(item.Amount, {
                                      locales: localStorage.language,
                                      currency: item.Currency,
                                    })}
                                  {item[header.key] &&
                                    header.key === 'Amount' &&
                                    header.operation === 'Credit' &&
                                    item.OpsType === '+' &&
                                    formatNumber(item.Amount, {
                                      locales: localStorage.language,
                                      currency: item.Currency,
                                    })}
                                  {item[header.key] &&
                                    header.key === 'DestAmount' &&
                                    formatNumber(item[header.key], {
                                      locales: localStorage.language,
                                      currency: item.Currency,
                                    })}
                                  {item[header.key] &&
                                    header.key === 'SourceAmount' &&
                                    formatNumber(item[header.key], {
                                      locales: localStorage.language,
                                      currency: item.Currency,
                                    })}

                                  {header.key === 'FirstName' &&
                                    `${item.FirstName} ${item.LastName}`}

                                  {header.key === 'SenderFirstName' &&
                                    `${item.SenderFirstName} ${item.SenderLastName}`}
                                  {item[header.key] &&
                                    header.key !== 'Amount' &&
                                    header.key !== 'DestAmount' &&
                                    header.key !== 'StatusCode' &&
                                    header.key !==
                                      'SenderFirstName' &&
                                    header.key !== 'SourceAmount' &&
                                    header.key !== 'FirstName' &&
                                    item[header.key]}
                                  {header.key === 'DestAmount' && (
                                    <span> {item.DestCurrency}</span>
                                  )}
                                  {header.key === 'SourceAmount' && (
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
                                    onClick={() => {
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
                        allItems.map(item => (
                          <>
                            <Table.Row
                              key={Math.random() * Date.now()}
                              className="cursor-pointer"
                              onClick={() => {
                                onItemClicked(item);
                              }}
                            >
                              {firstColumn && (
                                <Table.Cell>
                                  {' '}
                                  <Image
                                    src={item.Logo}
                                    width={30}
                                  />{' '}
                                </Table.Cell>
                              )}
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

                                  {item[header.key] &&
                                    header.key === 'Amount' &&
                                    header.value === 'Debit' &&
                                    item.OpsType === '-' &&
                                    formatNumber(item[header.key], {
                                      locales: localStorage.language,
                                    })}
                                  {item[header.key] &&
                                    header.key === 'Amount' &&
                                    header.value === 'Credit' &&
                                    item.OpsType === '+' &&
                                    formatNumber(item[header.key], {
                                      locales: localStorage.language,
                                    })}
                                  {item[header.key] &&
                                    header.key === 'DestAmount' &&
                                    formatNumber(item[header.key], {
                                      locales: localStorage.language,
                                    })}
                                  {item[header.key] &&
                                    header.key === 'SourceAmount' &&
                                    formatNumber(item[header.key], {
                                      locales: localStorage.language,
                                    })}
                                  {header.key === 'FirstName' &&
                                    `${item.FirstName} ${item.LastName}`}

                                  {header.key === 'SenderFirstName' &&
                                    `${item.SenderFirstName} ${item.SenderLastName}`}
                                  {item[header.key] &&
                                    header.key !== 'Amount' &&
                                    header.key !== 'DestAmount' &&
                                    header.key !== 'SourceAmount' &&
                                    header.key !== 'StatusCode' &&
                                    header.key !== 'FirstName' &&
                                    header.key !==
                                      'SenderFirstName' &&
                                    item[header.key]}
                                  {header.key === 'DestAmount' && (
                                    <span> {item.DestCurrency}</span>
                                  )}
                                  {header.key === 'SourceAmount' && (
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
                          </>
                        ))}
                    </Table.Body>
                    {data && !isSearching && (
                      <Table.Footer>
                        <Table.Row>
                          <Table.HeaderCell
                            colSpan={
                              firstColumn
                                ? headers.length + 2
                                : headers.length + 1
                            }
                          >
                            {transactionsPaginationInfo?.CurrentPage && (
                              <>
                                {' '}
                                <span className="current">
                                  {global.translate('Page')}{' '}
                                  {
                                    transactionsPaginationInfo.CurrentPage
                                  }{' '}
                                  {global.translate('of')}{' '}
                                  {Number(
                                    transactionsPaginationInfo.TotalPages,
                                  ) !== 0
                                    ? transactionsPaginationInfo.TotalPages
                                    : 1}
                                </span>
                                <Pagination
                                  data={data}
                                  defaultActivePage={
                                    transactionsPaginationInfo.CurrentPage
                                  }
                                  totalPages={
                                    transactionsPaginationInfo.TotalPages
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
                            {!transactionsPaginationInfo?.CurrentPage && (
                              <AppPagination
                                showPagination={showPagination}
                                data={data}
                                boundaryRange={0}
                                floated="right"
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
  showFilter: PropTypes.bool,
  allDestFilterOptions: PropTypes.arrayOf(PropTypes.any).isRequired,
  allSourceFilterOptions: PropTypes.arrayOf(PropTypes.any).isRequired,
  type: PropTypes.string,
  fromStoreVouchers: PropTypes.bool,
  transactionsPaginationInfo: PropTypes.objectOf(PropTypes.any)
    .isRequired,
  showPagination: PropTypes.bool,
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
  onMoreClicked: () => null,
  fromStoreVouchers: false,
  showPagination: false,
};
export default AppTable;
