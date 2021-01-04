/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import { Checkbox, Button, Input } from 'semantic-ui-react';
import './style.scss';
import PropTypes from 'prop-types';
import MyWallets from 'components/common/WalletCarousselSelector';
import DashboardLayout from 'components/common/DashboardLayout';
import WelcomeBar from 'components/Dashboard/WelcomeSection';
import GoBack from 'components/common/GoBack';
import DisplayProviders from 'components/common/DisplayProviders';
import openInNewTab from 'helpers/openInNewTab';

import ReusableDrowdown from 'components/common/Dropdown/ReusableDropdown';
import InfoMessage from 'components/common/InfoMessage';
import LoadCardLevel from './LoadCardLevel';
import PinModal from './PinModal';

const AddCard = ({
  creditCardOptions,
  selectWallet,
  userData,
  onOptionsChange,
  form,
  setForm,
  hasNotAgreed,
  setHasNotAgreed,
  openPinModal,
  setOpenPinModal,
  pinDigit,
  setPinDigit,
  setError,
  setConfirmPinDigit,
  confirmPinDigit,
  setUserPinDigit,
  userPinDigit,
  error,
  submitCreditCard,
  errors,
  createCardLoading,
  pinData,
  preSelectedWallet,
  selectedProvider,
  setSelectedProvider,
  cardTypes,
}) => {
  const { loading } = creditCardOptions;
  const [selectedCardLevel, setSelectedCardLevel] = useState(null);
  const [isDisabled, setIsDisabled] = useState(false);

  const cardOptions = creditCardOptions.data?.[0];

  const selectCardLevel = data => {
    setSelectedCardLevel(data.CardLevel);
    setForm({
      ...form,
      cardLevel: data.CardLevel,
    });
  };

  useEffect(() => {
    if (!selectedProvider) {
      setIsDisabled(true);
    }
    if (!form?.cardLevel) {
      setIsDisabled(true);
    }

    if (hasNotAgreed) {
      setIsDisabled(true);
    }
    if (form?.cardLevel && selectedProvider && !hasNotAgreed) {
      setIsDisabled(false);
    }
  }, [form, hasNotAgreed]);
  const history = useHistory();
  const { myWallets } = useSelector(({ user }) => user);

  const newWallets = {
    ...myWallets,
    walletList: myWallets?.walletList?.filter(wallet => {
      return wallet.HasACreditCard === 'NO';
    }),
  };
  let countLevel = 0;
  if (cardOptions) {
    cardOptions.CardLevels.map(level => {
      if (level.EnoughBalance === 'NO') {
        countLevel += 1;
      }
    });
  }
  const onClickHandler = () => history.goBack();

  return (
    <DashboardLayout>
      <WelcomeBar>
        <div className="head-content">
          <div className="go-back">
            <GoBack style onClickHandler={onClickHandler} />
          </div>

          <h2 className="head-title">
            {global.translate('My M-Cards', 2173)}
          </h2>
          <div className="clear" />
        </div>
      </WelcomeBar>
      <div className="add-card-container">
        <div className="card-types-box">
          <div>
            <MyWallets
              myWallets={newWallets}
              selectWallet={selectWallet}
              selectedWalletNumber={preSelectedWallet?.AccountNumber}
            />
          </div>

          <div className="select-provider">
            <h3>{global.translate('Select the card provider')}</h3>

            <ReusableDrowdown
              customstyle
              options={cardTypes}
              currentOption={selectedProvider}
              setCurrentOption={setSelectedProvider}
            />
          </div>
          {userData?.data && (
            <div className="name-on-card">
              <h3>{global.translate('Name on the card')}</h3>
              <Input
                fluid
                placeholder="Name on the card"
                value={
                  form?.nameOnTheCard
                    ? form?.nameOnTheCard
                    : `${userData?.data?.FirstName} ${userData?.data?.LastName}`
                }
                onChange={onOptionsChange}
                name="nameOnTheCard"
              />
            </div>
          )}

          <div className="provider-options">
            {!cardOptions && !loading && (
              <InfoMessage
                description={global.translate(
                  'To proceed with your M-Card creation, you need to select a wallet among the wallet list above.',
                )}
              />
            )}
            {loading && <LoadCardLevel />}
            {!loading && cardOptions && (
              <h3 className="provider-title">
                {global.translate('Select card type')}
              </h3>
            )}
            {countLevel === cardOptions?.CardLevels.length &&
              !loading && (
                <InfoMessage description="To proceed with your M-Card creation, you need to first to add money to the current selected wallet" />
              )}
            <div className="display-levels">
              {!loading &&
                cardOptions?.CardLevels.map(level => (
                  <DisplayProviders
                    disabled={level.EnoughBalance === 'NO'}
                    key={level.CardLevel}
                    data={level}
                    providerLogo={level?.CardIcon}
                    title={level?.LevelName}
                    subTitle={`${level?.SetupFeesText} : ${level?.SetupFees}, ${level?.MonthlyLImitText} : ${level?.MonthlyLimit}`}
                    onClick={selectCardLevel}
                    ticked={level.CardLevel === selectedCardLevel}
                  />
                ))}
            </div>
          </div>
          {!loading && cardOptions && (
            <div>
              <Checkbox
                label={
                  <label>
                    {global.translate(
                      'By ordering this card, you agree to our ',
                    )}
                    <span
                      role="link"
                      className="terms-conditions"
                      onClick={() =>
                        openInNewTab('https//:www.m2u.com')
                      }
                    >
                      {global.translate('terms and conditions')}
                    </span>
                  </label>
                }
                onChange={() => setHasNotAgreed(!hasNotAgreed)}
              />
              <div>
                <Button basic>{global.translate('Cancel')}</Button>
                <Button
                  disabled={isDisabled}
                  positive
                  onClick={() => setOpenPinModal(true)}
                >
                  {global.translate('Order a card')}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
      <PinModal
        openPinModal={openPinModal}
        setOpenPinModal={setOpenPinModal}
        pinDigit={pinDigit}
        setPinDigit={setPinDigit}
        setError={setError}
        setConfirmPinDigit={setConfirmPinDigit}
        confirmPinDigit={confirmPinDigit}
        setUserPinDigit={setUserPinDigit}
        userPinDigit={userPinDigit}
        error={error}
        submitCreditCard={submitCreditCard}
        loading={createCardLoading}
        errors={errors}
        pinData={pinData}
      />
    </DashboardLayout>
  );
};

AddCard.propTypes = {
  selectWallet: PropTypes.func.isRequired,
  creditCardOptions: PropTypes.objectOf(PropTypes.any).isRequired,
  userData: PropTypes.objectOf(PropTypes.any).isRequired,
  onOptionsChange: PropTypes.func,
  form: PropTypes.objectOf(PropTypes.any),
  setForm: PropTypes.func,
  hasNotAgreed: PropTypes.bool,
  setHasNotAgreed: PropTypes.func,
  pinDigit: PropTypes.objectOf(PropTypes.any),
  setPinDigit: PropTypes.func,
  setError: PropTypes.func,
  setConfirmPinDigit: PropTypes.func,
  confirmPinDigit: PropTypes.objectOf(PropTypes.any),
  setUserPinDigit: PropTypes.func,
  userPinDigit: PropTypes.objectOf(PropTypes.any),
  openPinModal: PropTypes.bool,
  setOpenPinModal: PropTypes.func,
  error: PropTypes.string,
  submitCreditCard: PropTypes.func,
  errors: PropTypes.objectOf(PropTypes.any),
  createCardLoading: PropTypes.bool,
  pinData: PropTypes.objectOf(PropTypes.any),
  preSelectedWallet: PropTypes.objectOf(PropTypes.any),
  selectedProvider: PropTypes.func,
  setSelectedProvider: PropTypes.func,
  cardTypes: PropTypes.arrayOf(PropTypes.any),
};

AddCard.defaultProps = {
  onOptionsChange: () => {},
  form: {},
  setForm: () => {},
  hasNotAgreed: false,
  setHasNotAgreed: () => {},
  pinDigit: {},
  setPinDigit: () => {},
  setError: () => {},
  setConfirmPinDigit: () => {},
  confirmPinDigit: {},
  setUserPinDigit: () => {},
  userPinDigit: {},
  openPinModal: false,
  setOpenPinModal: () => {},
  error: '',
  submitCreditCard: () => {},
  errors: {},
  createCardLoading: false,
  pinData: {},
  preSelectedWallet: {},
  selectedProvider: () => {},
  setSelectedProvider: () => {},
  cardTypes: [],
};
export default AddCard;
