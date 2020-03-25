import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Table,
  Icon,
  Input,
  Flag,
  Popup,
  Image,
  List,
  Card,
} from 'semantic-ui-react';
import AppPagination from '../Pagination';
import './style.scss';
import Message from '../Message';
import Thumbnail from '../Thumbnail';
import countries from 'utils/countries';
import ListItem from 'components/contacts/ListItem';

const AppTable = ({
  headers,
  data,
  loading,
  error,
  showOptions,
  itemsPerPage,
  onMoreClicked,
  filterUi,
  isAtAllTransactions,
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
    if (form.searchValue && form.searchValue.trim().length > 0) {
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
      <div className="right">
        {filterUi}
        {!loading && !error && (
          <Input
            icon="search"
            name="searchValue"
            value={form.searchValue || ''}
            onkeyup={onChange}
            onChange={onChange}
            className="searchInput"
            placeholder="Search..."
          />
        )}
      </div>

      {!loading && !error && (
        <Table unstackable>
          <Table.Header>
            <Table.Row>
              {showingItems &&
                showingItems[0] &&
                showingItems[0].Amount && (
                  <Table.HeaderCell></Table.HeaderCell>
                )}
              {headers.map(header => (
                <Table.HeaderCell>{header.value}</Table.HeaderCell>
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
                            {item.Amount.startsWith('-') && (
                              <Icon
                                className="icon-out"
                                name="long arrow alternate left"
                                color="red"
                              />
                            )}

                            {!item.Amount.startsWith('-') && (
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
                            {item[header.key] &&
                              item[header.key].replace('-', '')}
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
                      isAtAllTransactions && (
                        <div
                          className="transaction-detail"
                          style={{
                            width: '300px',
                            fontFamily: 'Montserrat',
                          }}
                        >
                          <div
                            className="section-head"
                            style={{
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center',
                              flexDirection: 'column',
                            }}
                          >
                            <Thumbnail
                              style={{
                                height: 75,
                                width: 75,
                              }}
                              name={item.ContactFirstName}
                              secondName={item.ContactLastName}
                              size="mini"
                              avatar={item.ContactPictureURL}
                            />
                            <p className="sub-title">
                              {item.ContactFirstName}{' '}
                              {item.ContactLastName}
                            </p>
                          </div>

                          <List divided>
                            <List.Item className="list-item-wrapper">
                              <List.Content className="list-item-content">
                                Transfer Amount :
                              </List.Content>
                              <List.Content
                                className="list-item-right"
                                floated="right"
                              >
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
                                {item.Amount}
                              </List.Content>
                            </List.Item>

                            <List.Item className="list-item-wrapper">
                              <List.Content className="list-item-content">
                                Transfer Date :
                              </List.Content>
                              <List.Content
                                className="list-item-right"
                                floated="right"
                              >
                                {' '}
                                {item.Date}
                              </List.Content>
                            </List.Item>
                            <List.Item className="list-item-wrapper">
                              <List.Content className="list-item-content">
                                Phone Number :
                              </List.Content>
                              <List.Content
                                className="list-item-right"
                                floated="right"
                              >
                                {item.ContactPhone}
                              </List.Content>
                            </List.Item>

                            <List.Item className="list-item-wrapper">
                              <List.Content className="list-item-content">
                                Email :
                              </List.Content>
                              <List.Content
                                className="list-item-right"
                                floated="right"
                              >
                                {item.ContactEmail}
                              </List.Content>
                            </List.Item>

                            <List.Item className="list-item-wrapper">
                              <List.Content className="list-item-content">
                                {global.translate('Country', 275)}
                              </List.Content>
                              <List.Content
                                className="list-item-right"
                                floated="right"
                              >
                                <Image
                                  avatar
                                  style={{
                                    borderRadius: 0,
                                    maxHeight: 16,
                                    width: 18,
                                    marginBottom: 3,
                                  }}
                                  src={item.CountryFlag}
                                />{' '}
                                {/* TODO  FIXME {
                                  countries.find(
                                    country =>
                                      country.key.toUpperCase() ===
                                      item.ContactCountryCode,
                                  ).text
                                } */}
                                RW
                              </List.Content>
                            </List.Item>

                            <List.Item className="list-item-wrapper">
                              <List.Content className="list-item-content">
                                {global.translate('Description', 119)}{' '}
                              </List.Content>
                              <List.Content
                                className="list-item-right"
                                floated="right"
                              >
                                {item.Description}
                              </List.Content>
                            </List.Item>

                            <List.Item className="list-item-wrapper">
                              <List.Content className="list-item-content">
                                {global.translate('Reference', 124)} :
                              </List.Content>
                              <List.Content
                                className="list-item-right"
                                floated="right"
                              >
                                {item.Reference}
                              </List.Content>
                            </List.Item>
                            <List.Item className="list-item-wrapper">
                              <List.Content className="list-item-content">
                                {global.translate('Fees', 117)} :
                              </List.Content>
                              <List.Content
                                className="list-item-right"
                                floated="right"
                              >
                                <Image
                                  avatar
                                  style={{
                                    borderRadius: 0,
                                    maxHeight: 16,
                                    width: 18,
                                    marginBottom: 3,
                                  }}
                                  src={item.TargetCurrencyFlag}
                                />{' '}
                                {item.Fees}
                              </List.Content>
                            </List.Item>

                            <List.Item className="list-item-wrapper">
                              <List.Content className="list-item-content">
                                External Fees :
                              </List.Content>
                              <List.Content
                                className="list-item-right"
                                floated="right"
                              >
                                <Image
                                  avatar
                                  style={{
                                    borderRadius: 0,
                                    maxHeight: 16,
                                    width: 18,
                                    marginBottom: 3,
                                  }}
                                  src={item.TargetCurrencyFlag}
                                />{' '}
                                {item.ExternalFees}
                              </List.Content>
                            </List.Item>

                            <List.Item className="list-item-wrapper">
                              <List.Content className="list-item-content">
                                Exchange Fees :
                              </List.Content>
                              <List.Content
                                className="list-item-right"
                                floated="right"
                              >
                                <Image
                                  avatar
                                  style={{
                                    borderRadius: 0,
                                    maxHeight: 16,
                                    width: 18,
                                    marginBottom: 3,
                                  }}
                                  src={item.TargetCurrencyFlag}
                                />{' '}
                                {item.ExchangeFees}
                              </List.Content>
                            </List.Item>
                          </List>
                        </div>
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
                        {item.Amount.startsWith('-') && (
                          <Icon
                            className="icon-out"
                            name="long arrow alternate left"
                            color="red"
                          />
                        )}

                        {!item.Amount.startsWith('-') && (
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
                        {item[header.key] &&
                          item[header.key].replace('-', '')}
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
};
AppTable.defaultProps = {
  loading: false,
  showOptions: false,
  filterUi: <div />,
  itemsPerPage: 7,
  isAtAllTransactions: false,
  error: null,
  onMoreClicked: () => null,
};
export default AppTable;
