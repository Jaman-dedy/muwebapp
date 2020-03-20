import React, { useEffect, useState } from 'react';

import {
  Image,
  Table,
  Icon,
  Menu,
  Pagination,
  Tab,
} from 'semantic-ui-react';
import Thumbnail from 'components/common/Thumbnail';
import WelcomeBar from 'components/Dashboard/WelcomeSection';
import backIcon from 'assets/images/back.png';
import RecentlyContacted from '../RecentlyContacted/';
import AddBig from 'assets/images/addBig.png';

import './ContactsPage.scss';

const Vouchers = ({
  userData,
  history,
  countries,

  form,
  onChange,
  contactsPage,
}) => {
  const panes = [
    {
      menuItem: '2U contacts',
      render: () => (
        <Tab.Pane attached={false}>
          {contactsPage.internalContacts.data && (
            <Table>
              <Table.Body>
                {contactsPage.internalContacts.data.map(item => (
                  <Table.Row>
                    <Table.Cell collapsing>
                      <div className="image">
                        <Thumbnail
                          avatar={item.PictureURL || 'N/A'}
                          name={item.FirstName || 'Unknown'}
                          secondName={item.LastName || 'User'}
                        />
                      </div>
                    </Table.Cell>
                    <Table.Cell collapsing>
                      <span>
                        {item.FirstName} {item.LastName}
                      </span>
                      <br />
                      <span>Individual</span>
                    </Table.Cell>
                    <Table.Cell textAlign="right">
                      <span>{item.CurrencyCode} </span>
                      <span className="edit-wallet">
                        <Icon
                          name="pencil alternate"
                          /*  onClick={() => openEdit(item)} */
                        />
                      </span>
                      <span className="right-span">
                        <Icon
                          name="ellipsis vertical"
                          /*  onClick={() => openOption(item)} */
                        />
                      </span>
                      {item.Default === 'YES' && (
                        <span className="check-sign">
                          <Icon name="check" />
                        </span>
                      )}
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          )}
        </Tab.Pane>
      ),
    },
    {
      menuItem: 'External contacts',
      render: () => (
        <Tab.Pane attached={false}>
          {' '}
          {contactsPage.externalContacts.data && (
            <Table>
              <Table.Body>
                {contactsPage.externalContacts.data.map(item => (
                  <Table.Row>
                    <Table.Cell collapsing>
                      <div className="image">
                        <Thumbnail
                          avatar={item.PictureURL || 'N/A'}
                          name={item.FirstName || 'Unknown'}
                          secondName={item.LastName || 'User'}
                        />
                      </div>
                    </Table.Cell>
                    <Table.Cell collapsing>
                      <span>
                        {' '}
                        {item.FirstName} {item.LastName}
                      </span>
                      <br />
                      <span>Individual</span>
                    </Table.Cell>
                    <Table.Cell textAlign="right">
                      <span>{item.CurrencyCode} </span>
                      <span className="edit-wallet">
                        <Icon
                          name="pencil alternate"
                          /*  onClick={() => openEdit(item)} */
                        />
                      </span>
                      <span className="right-span">
                        <Icon
                          name="ellipsis vertical"
                          /*  onClick={() => openOption(item)} */
                        />
                      </span>
                      {item.Default === 'YES' && (
                        <span className="check-sign">
                          <Icon name="check" />
                        </span>
                      )}
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          )}
        </Tab.Pane>
      ),
    },
  ];
  return (
    <>
      <div className="vouchers">
        <WelcomeBar loading={userData.loading}>
          <span className="lighter">
            <span className="bold">
              {userData.data && userData.data.FirstName}
            </span>
            , send vouchers to your contacts
          </span>
        </WelcomeBar>
      </div>

      <div className="voucher">
        <Image
          className="backButton"
          src={backIcon}
          height={30}
          onClick={() => history.goBack()}
        />

        <RecentlyContacted
          items={contactsPage.activeContacts}
          getRecentContacts={contactsPage.getRecentContacts}
        />
        <Image
          height={90}
          className="addImage"
          src={AddBig}
          onClick={() => contactsPage.handleNext()}
        />
        <p className="title">Select contact to send a voucher to</p>

        <div className="tab-block">
          <Tab
            menu={{ secondary: true }}
            panes={panes}
            className="tab"
          />
        </div>
      </div>
    </>
  );
};

export default Vouchers;
