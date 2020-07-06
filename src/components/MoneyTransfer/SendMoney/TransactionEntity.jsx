import React from 'react';
import { useSelector } from 'react-redux';
import { Image } from 'semantic-ui-react';
import './entity-wrapper.scss';
import PropTypes from 'prop-types';
import Thumbnail from 'components/common/Thumbnail';
import CustomDropdown from 'components/common/Dropdown/WalletDropdown';
import Wrapper from 'hoc/Wrapper';

const TransactionEntity = ({
  onChange,
  name,
  form,
  data,
  isSendingCash,
  walletList,
  currentOption,
  setCurrentOption,
  walletTitle,
  destinationContact,
  isSelfBuying,
}) => {
  const { isSendingMoney } = useSelector(
    state => state.dashboard.contactActions,
  );
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
        <div className="transacters">
          {' '}
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
              borderRadius: '50%',
            }}
          />
          {!isSendingMoney && !isSelfBuying && (
            <Wrapper>
              {' '}
              <span className="destination">
                {' '}
                {global.translate('To')}{' '}
              </span>
              <Thumbnail
                style={{
                  height: 75,
                  width: 75,
                  marginLeft: isSendingCash ? '24px' : '0px',
                  alignSelf: isSendingCash ? 'center' : 'flex-end',
                  borderRadius: '50%',
                }}
                name={destinationContact.FirstName}
                avatar={destinationContact.PictureURL}
                secondName={destinationContact.LastName}
                height={75}
              />{' '}
            </Wrapper>
          )}
        </div>
      )}

      <div className="rightItems">
        <p
          className="choose-wallet"
          style={isSendingCash ? { textAlign: 'center' } : {}}
        >
          {global.translate(walletTitle)}
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
};

TransactionEntity.propTypes = {
  onChange: PropTypes.func,
  name: PropTypes.string,
  form: PropTypes.objectOf(PropTypes.any),
  data: PropTypes.objectOf(PropTypes.any),
  isSendingCash: PropTypes.bool,
  walletTitle: PropTypes.string,
  walletList: PropTypes.arrayOf(PropTypes.any),
  currentOption: PropTypes.objectOf(PropTypes.any),
  setCurrentOption: PropTypes.func.isRequired,
  destinationContact: PropTypes.objectOf(PropTypes.any),
  isSelfBuying: PropTypes.bool,
  isSendingMoney: PropTypes.bool,
};

TransactionEntity.defaultProps = {
  onChange: () => {},
  name: null,
  isSendingCash: false,
  form: {},
  currentOption: null,
  data: {},
  walletList: [],
  walletTitle: 'Choose a wallet',
  destinationContact: {},
  isSelfBuying: false,
  isSendingMoney: false,
};
export default TransactionEntity;
