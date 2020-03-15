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
import DashboardLayout from 'components/common/DashboardLayout';
import WelcomeBar from 'components/Dashboard/WelcomeSection';
import backIcon from 'assets/images/back.png';
import RecentlyContacted from 'components/Vouchers/RecentlyContacted';
import AddBig from 'assets/images/addBig.png';
import SendVoucherModal from './SendVoucherModal';

import './Vouchers.scss';

const Vouchers = ({
  userData,
  history,
  setOpenSendVoucherModalFx,
  openSendVoucherModal,
  walletList,
  externalContacts,
  internalContacts,
  countries,
  stores,
  form,
  onChange,
}) => {
  const panes = [
    {
      menuItem: '2U contacts',
      render: () => (
        <Tab.Pane attached={false}>
          {internalContacts && (
            <Table>
              <Table.Body>
                {internalContacts.map(item => (
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
          {externalContacts && (
            <Table>
              <Table.Body>
                {externalContacts.map(item => (
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
    <DashboardLayout>
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

        <RecentlyContacted />

        <Image
          height={90}
          className="addImage"
          src={AddBig}
          onClick={() => setOpenSendVoucherModalFx()}
        />
        <p className="title">Select contact to send a voucher to</p>

        <div className="tab-block">
          <Tab
            menu={{ secondary: true }}
            panes={panes}
            className="tab"
          />
        </div>

        <SendVoucherModal
          open={openSendVoucherModal}
          setOpen={setOpenSendVoucherModalFx}
          form={form}
          onChange={onChange}
          walletList={walletList}
          countries={countries}
          stores={stores}
        />
      </div>
    </DashboardLayout>
  );
};

export default Vouchers;
