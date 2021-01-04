/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useEffect } from 'react';
import propTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

import DashboardLayout from 'components/common/DashboardLayout';
import WelcomeBar from 'components/Dashboard/WelcomeSection';
import GoBack from 'components/common/GoBack';
import './style.scss';
import './custmised-sematinc-style.scss';
import InfoMessage from 'components/common/InfoMessage';
import SingleCardView from '../creditCardList/SingleCardView';
import TableDetails from './TableDetails';
import ConfirmPinModal from './confirmPinModal';

const CreditCardDetails = ({ creditCardDetails }) => {
  const {
    wallet,
    handleChangeCreditCardPin,
    setForm,
    form,
    pinDigit,
    setUserPinDigit,
    userPinDigit,
    changeCreditCardPin,
    shouldClear,
    setShouldClear,
    handleActivateCard,
    setconfirmPinOpen,
    isActivatingCard,
    setIsActivatingCard,
    isEnablingCard,
    setIsEnablingCard,
    isChangingPwd,
    setIsChangingPwd,
    pinError,
    setPinError,
    handleEnableCard,
    loadOnEnable,
    loadOnActivate,
    openPinModal,
    setOpenPinModal,
    setPinDigit,
    setConfirmPinDigit,
    confirmPinDigit,
  } = creditCardDetails;
  const history = useHistory();
  const onClickHandler = () => history.goBack();

  useEffect(() => {
    if (wallet) {
      setForm({
        ...form,
        CardNumber: wallet.CardNumber,
      });
    }
  }, [pinDigit]);
  return (
    <DashboardLayout>
      <WelcomeBar>
        <div className="head-content">
          <div className="go-back">
            <GoBack style onClickHandler={onClickHandler} />
          </div>
          <h2 className="head-title">
            {global.translate('My M-Card')}
          </h2>
          <div className="clear" />
        </div>
      </WelcomeBar>
      <div className="CreditCard">
        <SingleCardView card={wallet} detail />
        <div className="all-details">
          {wallet?.Activated === 'NO' && (
            <InfoMessage
              description={global.translate(
                'This card is currently inactive. You will be able to activate it once your confirm that you have received it',
              )}
            />
          )}

          <div className="details-table">
            <TableDetails
              openPinModal={openPinModal}
              setOpenPinModal={setOpenPinModal}
              card={wallet}
              setIsActivatingCard={setIsActivatingCard}
              setIsEnablingCard={setIsEnablingCard}
              setIsChangingPwd={setIsChangingPwd}
              pinDigit={pinDigit}
              setPinDigit={setPinDigit}
              setError={setPinError}
              error={pinError}
              setConfirmPinDigit={setConfirmPinDigit}
              confirmPinDigit={confirmPinDigit}
              setUserPinDigit={setUserPinDigit}
              userPinDigit={userPinDigit}
              handleChangeCreditCardPin={handleChangeCreditCardPin}
              disabled={changeCreditCardPin.loading}
              loadOnChangePwd={changeCreditCardPin.loading}
            />
          </div>
        </div>
      </div>

      <ConfirmPinModal
        open={isActivatingCard || isEnablingCard || isChangingPwd}
        isActivatingCard={isActivatingCard}
        isEnablingCard={isEnablingCard}
        isChangingPwd={isChangingPwd}
        setOpen={setconfirmPinOpen}
        handleActivateCard={handleActivateCard}
        setUserPinDigit={setUserPinDigit}
        shouldClear={shouldClear}
        setShouldClear={setShouldClear}
        handleChangeCreditCardPin={handleChangeCreditCardPin}
        setIsActivatingCard={setIsActivatingCard}
        setIsEnablingCard={setIsEnablingCard}
        setIsChangingPwd={setIsChangingPwd}
        error={pinError}
        setError={setPinError}
        userPinDigit={userPinDigit}
        loadOnChangePwd={changeCreditCardPin.loading}
        loadOnEnable={loadOnEnable}
        loadOnActivate={loadOnActivate}
        disabled={changeCreditCardPin.loading}
        setForm={setForm}
        handleEnableCard={handleEnableCard}
      />
    </DashboardLayout>
  );
};
CreditCardDetails.propTypes = {
  creditCardDetails: propTypes.instanceOf(Object).isRequired,
  pinDigit: propTypes.instanceOf(Object),
  confirmPinDigit: propTypes.instanceOf(Object),
  setPinDigit: propTypes.func,
  pinError: propTypes.string.isRequired,
  setPinError: propTypes.func.isRequired,
  handleEnableCard: propTypes.func.isRequired,
};
CreditCardDetails.defaultProps = {
  pinDigit: {},
  confirmPinDigit: {},
  setPinDigit: () => {},
};

export default CreditCardDetails;
