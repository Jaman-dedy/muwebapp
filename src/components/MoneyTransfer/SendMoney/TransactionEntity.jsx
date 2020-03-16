import React, { useState } from 'react';
import { Dropdown, Image } from 'semantic-ui-react';
import './entity-wrapper.scss';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Thumbnail from 'components/common/Thumbnail';
import CustomDropdown from 'components/common/Dropdown/WalletDropdown';

function TransactionEntity({
  onChange,
  name,
  form,
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

  const [currentOption, setCurrentOption] = useState(defaultOption);

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
        <p
          className="choose-wallet"
          style={isSendingCash ? { textAlign: 'center' } : {}}
        >
          {global.translate('Choose Wallet')}
        </p>

        <CustomDropdown
          options={walletOptions}
          currentOption={currentOption}
          setCurrentOption={setCurrentOption}
          onChange={onChange}
          className="custom-dropdown"
          name={name}
          keyName={name}
          value={form[name]}
          renderLabel={renderLabel}
        />
      </div>
    </div>
  );
}

TransactionEntity.propTypes = {
  onChange: PropTypes.func,
  name: PropTypes.string,
  form: PropTypes.objectOf(PropTypes.any),
  data: PropTypes.objectOf(PropTypes.any),
  isSendingCash: PropTypes.bool,
};

TransactionEntity.defaultProps = {
  onChange: () => {},
  name: null,
  isSendingCash: false,
  form: {},
  data: {},
};
export default TransactionEntity;
