import React, { useState } from 'react';
import { Image } from 'semantic-ui-react';
import '../TransactionEntity/TransactionEntity.scss';
import PropTypes from 'prop-types';
import Thumbnail from 'components/common/Thumbnail';
import CustomDropdown from 'components/common/Dropdown/WalletDropdown';

function TransactionEntity({
  data,
  isSendingCash,
  walletList,
  DefaultWallet,
}) {
  const walletOptions =
    walletList &&
    walletList.map(el => {
      return {
        id: el.AccountNumber,
        text: el.AccountNumber,
        value: el.AccountNumber,
        Flag: el.Flag,
        AccountName: el.AccountName,
        AccountNumber: el.AccountNumber,
        content: (
          <div className="flag-wrapper" key={el.AccountName}>
            <Image src={el.Flag} width={30} />
            <div className="left">
              <h5 className="account">{el.AccountNumber}</h5>
              <small>({el.AccountName})</small>
            </div>
          </div>
        ),
      };
    });

  const defaultOption =
    walletOptions &&
    walletOptions.find(item => item.id === DefaultWallet);

  const renderLabel = label => {
    return {
      content: (
        <div className="flag-wrapper">
          <Image src={label.dp} width={30} />
          <div className="left">
            <h4 className="account">{label.AccountNumber}</h4>
            <small>({label.AccountName})</small>
          </div>
        </div>
      ),
    };
  };
  return (
    <div
      className="entity-wrapper"
      style={
        isSendingCash
          ? {
              display: 'flex',
              margin: 'auto',
              flexDirection: 'column',
              alignItems: 'center',
            }
          : {}
      }
    >
      {data && data.data && (
        <Thumbnail
          name={data.data.FirstName}
          avatar={data.data.PictureURL}
          secondName={data.data.LastName}
          height={75}
          style={{
            height: 75,
            width: 75,
            marginLeft: isSendingCash ? '24px' : '0px',
            alignSelf: isSendingCash ? 'center' : 'flex-end',
          }}
        />
      )}
      <div className="rightItems">
        {/*  {
           selectedContact.type !== 'notEditable' &&
           !isExternalContacts &&()
        } */}
        <div>{`${data.data.FirstName} ${data.data.LastName}`}</div>
        <div>
          {data.data.type === 'notEditable' && (
            <div>
              {data.data.PhoneNumber && `+${data.data.PhoneNumber}`}
            </div>
          )}

          {data.data.type !== 'notEditable' && (
            <div>
              {data.data.countryDetails &&
                data.data.countryDetails.value +
                  data.data.PhoneNumber}
            </div>
          )}

          {data.data.ContactPID && <div> {data.data.ContactPID}</div>}
        </div>
      </div>
    </div>
  );
}

TransactionEntity.propTypes = {
  data: PropTypes.objectOf(PropTypes.any),
  isSendingCash: PropTypes.bool,

  walletList: PropTypes.arrayOf(PropTypes.any),
  DefaultWallet: PropTypes.objectOf(PropTypes.any),
};

TransactionEntity.defaultProps = {
  isSendingCash: false,
  data: {},
  walletList: [],
  DefaultWallet: {},
};
export default TransactionEntity;
