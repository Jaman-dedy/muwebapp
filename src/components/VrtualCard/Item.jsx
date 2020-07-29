/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Item, Button, Image, Popup } from 'semantic-ui-react';
import EllipseMenu from 'components/common/EllipseOptions';

import './item.scss';
import Wrapper from 'hoc/Wrapper';
import visaCardImg from 'assets/images/visa-card.png';
import masterCardImg from 'assets/images/mastercard.png';
import VirtualCardImage from 'assets/images/creditCard.svg';
import formatNumber from 'utils/formatNumber';
import Card from './Card';
import AddMoneyModal from './AddMoneyModal';

const VirtualCard = ({
  virtualCard,
  userData,
  handleOnClick,
  canViewDetail,
  form,
  setForm,
  selectedWallet,
  setSelectedWallet,
  onOptionsChange,
  onAddMoneyToVirtualCard,
  isViewingDetail,
  userLocationData,
  step,
  setStep,
  errors,
  setErrors,
  balanceOnWallet,
  checkTransactionConfirmation,
  confirmationData,
  checking,
  confirmationError,
  loading,
  addMoneyOpen,
  setAddMoneyOpen,
  onRedeeMoney,
  isRedeeming,
  setisRedeeming,
  loadRedeeMoney,
  error,
  openConfirmModal,
  setOpenConfirmModal,
  shouldClear,
}) => {
  const history = useHistory();
  const [copySuccess, setCopySuccess] = useState('');

  const options = [
    {
      image: VirtualCardImage,
      name: global.translate('Virtual card details'),
      onClick: item => {
        history.push({
          pathname: '/virtual-card-details',
          state: { item },
        });
      },
    },
  ];

  const textAreaRef = useRef(null);
  const copyToClipBoard = async (e, CardNumber) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(CardNumber);
      setCopySuccess('Card number copied!');
    } catch (err) {
      setCopySuccess('Failed to copy!');
    }
  };

  const handleAddMoneyModal = () => {
    setAddMoneyOpen(true);
  };
  const handleReddeemMoneyModal = () => {
    setAddMoneyOpen(true);
    setisRedeeming(true);
  };
  const formatBalance = balance => {
    if (!balance) return '';
    if (localStorage.language === 'fr') {
      return formatNumber(balance, {
        locales: localStorage.language
          ? userData?.Language
          : undefined,
      });
    }
    return formatNumber(balance, {
      locales: localStorage.language
        ? localStorage.language
        : undefined,
    });
  };
  return (
    <Item className="virtual-card-item ">
      <textarea
        style={{ display: 'none' }}
        ref={textAreaRef}
        value={virtualCard && virtualCard.CardNumber}
      />
      <Card virtualCard={virtualCard} userData={userData} />

      <Item.Content verticalAlign="middle">
        <Item.Header className="vc-currency">
          {virtualCard && `${virtualCard.Currency} `}{' '}
        </Item.Header>
        <div
          role="button"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '-.5rem',
          }}
          onClick={() => handleOnClick(virtualCard, userData)}
        >
          <Item.Meta style={{ width: '100%' }}>
            <span className="vc-balance">
              {virtualCard &&
                `${formatBalance(virtualCard.Balance)} ${
                  virtualCard.Currency
                }`}{' '}
            </span>

            <br />
            {virtualCard && virtualCard.CardType === '1' ? (
              <Wrapper>
                <Image
                  src={visaCardImg}
                  size="mini"
                  verticalAlign="middle"
                />
              </Wrapper>
            ) : (
              <Wrapper>
                <Image
                  src={masterCardImg}
                  size="mini"
                  verticalAlign="middle"
                />
              </Wrapper>
            )}
            <br />
            <span
              className="vc-info"
              style={{ marginBottom: '.5rem' }}
            >
              {global.translate(`Created at :`)}{' '}
              <strong>{virtualCard?.CreationDate}</strong>{' '}
            </span>
            <br />
            <hr style={{ border: 'none' }} />
            <span className="vc-info">
              CVV: <strong>{virtualCard?.CVV}</strong>{' '}
            </span>
            <br />
            <hr style={{ border: 'none' }} />
            <span className="vc-info">
              {global.translate(`Expiration date`, 492)} :{' '}
              <strong>{`${virtualCard.MM}/${virtualCard.YYYY}`}</strong>
            </span>
            <br />
            {!canViewDetail && (
              <Popup
                content={copySuccess}
                on="click"
                pinned
                trigger={
                  <Button
                    className="vc-btn-copy"
                    onClick={e =>
                      copyToClipBoard(e, virtualCard?.CardNumber)
                    }
                    style={{ float: 'right' }}
                    basic
                    color="orange"
                    content="Copy card number"
                  />
                }
              />
            )}
            {canViewDetail ? (
              <Button.Group style={{ float: 'right' }}>
                <Button
                  onClick={handleAddMoneyModal}
                  basic
                  color="orange"
                >
                  {global.translate(`Add money`, 89)}
                </Button>
                <Button.Or />
                <Button
                  disabled={virtualCard.Balance === '0.00'}
                  onClick={handleReddeemMoneyModal}
                  basic
                  color="orange"
                >
                  {global.translate(`Redeem money`, 1689)}
                </Button>
              </Button.Group>
            ) : (
              ''
            )}
          </Item.Meta>
          {canViewDetail ? '' : ''}
        </div>
      </Item.Content>
      <AddMoneyModal
        addMoneyOpen={addMoneyOpen}
        setAddMoneyOpen={setAddMoneyOpen}
        virtualCard={virtualCard}
        userData={userData}
        form={form}
        setForm={setForm}
        selectedWallet={selectedWallet}
        setSelectedWallet={setSelectedWallet}
        onOptionsChange={onOptionsChange}
        onAddMoneyToVirtualCard={onAddMoneyToVirtualCard}
        isViewingDetail={isViewingDetail}
        userLocationData={userLocationData}
        step={step}
        setStep={setStep}
        setErrors={setErrors}
        errors={errors}
        balanceOnWallet={balanceOnWallet}
        checkTransactionConfirmation={checkTransactionConfirmation}
        confirmationData={confirmationData}
        confirmationError={confirmationError}
        checking={checking}
        loading={loading}
        onRedeeMoney={onRedeeMoney}
        isRedeeming={isRedeeming}
        setIsRedeeming={setisRedeeming}
        loadRedeeMoney={loadRedeeMoney}
        error={error}
        openConfirmModal={openConfirmModal}
        setOpenConfirmModal={setOpenConfirmModal}
        shouldClear={shouldClear}
      />
    </Item>
  );
};

VirtualCard.propTypes = {
  virtualCard: PropTypes.objectOf(PropTypes.any).isRequired,
  Balance: PropTypes.string.isRequired,
  userData: PropTypes.objectOf(PropTypes.any).isRequired,
  handleOnClick: PropTypes.func,
  setAddMoneyOpen: PropTypes.func,
  addMoneyOpen: PropTypes.bool.isRequired,
  setSelectedWallet: PropTypes.func,
  canViewDetail: PropTypes.bool,
  form: PropTypes.objectOf(PropTypes.any).isRequired,
  setForm: PropTypes.func,
  selectedWallet: PropTypes.func,
  onOptionsChange: PropTypes.func,
  onAddMoneyToVirtualCard: PropTypes.func,
  isViewingDetail: PropTypes.bool,
  userLocationData: PropTypes.objectOf(PropTypes.any),
  step: PropTypes.number,
  setStep: PropTypes.func,
  errors: PropTypes.objectOf(PropTypes.any),
  setErrors: PropTypes.func,
  balanceOnWallet: PropTypes.objectOf(PropTypes.any),
  checkTransactionConfirmation: PropTypes.func,
  confirmationData: PropTypes.objectOf(PropTypes.any),
  checking: PropTypes.bool,
  confirmationError: PropTypes.objectOf(PropTypes.any),
  loading: PropTypes.bool,
  onRedeeMoney: PropTypes.func,
  isRedeeming: PropTypes.bool,
  setisRedeeming: PropTypes.func,
  loadRedeeMoney: PropTypes.bool,
  error: PropTypes.string,
  openConfirmModal: PropTypes.bool,
  setOpenConfirmModal: PropTypes.func,
  shouldClear: PropTypes.bool,
};
VirtualCard.defaultProps = {
  handleOnClick: () => {},
  setAddMoneyOpen: () => {},
  setSelectedWallet: () => {},
  canViewDetail: false,
  setForm: () => {},
  selectedWallet: () => {},
  onOptionsChange: () => {},
  onAddMoneyToVirtualCard: () => {},
  isViewingDetail: false,
  userLocationData: {},
  step: PropTypes.number,
  setStep: () => {},
  errors: {},
  setErrors: () => {},
  balanceOnWallet: {},
  checkTransactionConfirmation: () => {},
  confirmationData: {},
  checking: false,
  confirmationError: {},
  loading: false,
  onRedeeMoney: () => {},
  isRedeeming: false,
  setisRedeeming: () => {},
  loadRedeeMoney: false,
  error: null,
  openConfirmModal: false,
  setOpenConfirmModal: () => {},
  shouldClear: false,
};

export default VirtualCard;
