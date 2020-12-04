/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState, useEffect } from 'react';
import propTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import {
  Segment,
  Grid,
  Checkbox,
  Button,
  Message,
  Label,
  Icon,
} from 'semantic-ui-react';

import DashboardLayout from 'components/common/DashboardLayout';
import WelcomeBar from 'components/Dashboard/WelcomeSection';
import GoBack from 'components/common/GoBack';
import PinCodeForm from 'components/common/PinCodeForm';
import CardFront from '../Card/CardFront';
import CardBack from '../Card/CardBack';
import CardMiniFront from '../Card/MiniCard/CardFront';
import CardMiniBack from '../Card/MiniCard/CardBack';
import Details from '../Card/Details';
import ConfirmPinModal from './confirmPinModal';
import classes from './Index.module.scss';
import './custmised-sematinc-style.scss';

const CreditCardDetails = ({ creditCardDetails }) => {
  const {
    wallet,
    handleChangeCreditCardPin,
    setError,
    setForm,
    confirmPinDigit,
    setPinDigit,
    setConfirmPinDigit,
    form,
    pinDigit,
    error,
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
    validate,
    pinError,
    setPinError,
    handleEnableCard,
    loadOnEnable,
    loadOnActivate,
  } = creditCardDetails;
  const [cardFace, setCardFace] = useState('recto');
  const history = useHistory();
  const onClickHandler = () => history.goBack();
  const handleSetCardFace = () => {
    setCardFace('recto');
  };
  const handleSetCardBack = () => {
    setCardFace('verso');
  };
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
            {global.translate('My credit cards', 1969)}
          </h2>
          <div className="clear" />
        </div>
      </WelcomeBar>
      <div className={classes.CreditCard}>
        <Grid>
          <Grid.Column mobile={16} tablet={16} computer={7}>
            <div className={classes.BGLayout}>
              {cardFace === 'recto' ? (
                <>
                  <CardFront wallet={wallet} />
                </>
              ) : (
                <>
                  <CardBack wallet={wallet} />
                </>
              )}
            </div>
            <div className={classes.SMCardLayout}>
              <CardMiniFront
                wallet={wallet}
                onClick={e => handleSetCardFace('recto')}
              />
              <CardMiniBack
                wallet={wallet}
                onClick={e => handleSetCardBack('verso')}
              />
            </div>
          </Grid.Column>
          <Grid.Column mobile={16} tablet={16} computer={9}>
            {wallet?.Activated === 'NO' && (
              <Label as="a" className={classes.labelled} color="red">
                {global.translate(`Inactive`, 1980)}
              </Label>
            )}

            {wallet?.Activated === 'YES' && (
              <Label
                as="a"
                className={classes.labelled}
                color={wallet?.Enabled === 'YES' ? 'green' : 'red'}
              >
                {wallet?.Enabled === 'YES'
                  ? global.translate(`Enabled`)
                  : global.translate('Disabled')}
              </Label>
            )}

            <Details wallet={wallet} />
            {wallet.Activated === 'NO' && (
              <Button
                onClick={() => {
                  setIsActivatingCard(true);
                  setIsEnablingCard(false);
                  setIsChangingPwd(false);
                }}
                className={classes.ReceivedCreditCard}
              >
                <Icon name="check" />
                {global.translate(`I have received my credit card`)}
              </Button>
            )}
            {wallet?.Activated === 'YES' && (
              <Button
                onClick={() => {
                  setIsActivatingCard(false);
                  setIsEnablingCard(true);
                  setIsChangingPwd(false);
                }}
              >
                {wallet.Enabled === 'YES'
                  ? global.translate('Disable this card', 1981)
                  : global.translate('Enable this card', 1982)}
              </Button>
            )}
          </Grid.Column>
        </Grid>
      </div>
      <div className={classes.PinForm}>
        <h4>
          {global.translate(`Change your card PIN number`, 1983)}
        </h4>
        <Segment className={classes.UpperPin}>
          <PinCodeForm
            label={global.translate(
              'Provide new PIN Number for this card',
              1984,
            )}
            onChange={({ target: { value, name } }) => {
              setError(null);
              setPinDigit({ ...pinDigit, [name]: value });
            }}
            name="PIN"
            value={form.pinDigit || ''}
            setShouldClear={setShouldClear}
          />
          <br />
          <PinCodeForm
            label={global.translate(
              'Confirm your new PIN Number for this card',
              1985,
            )}
            onChange={({ target: { value, name } }) => {
              setError(null);
              setConfirmPinDigit({
                ...confirmPinDigit,
                [name]: value,
              });
            }}
            value={form.confirmPinDigit || ''}
            name="PIN"
            setShouldClear={setShouldClear}
          />
        </Segment>
        {error && (
          <Message negative icon>
            <span style={{ width: '100%', fontSize: '.9rem' }}>
              {error}
            </span>
          </Message>
        )}
        <Button
          onClick={() => {
            if (!validate()) {
              setIsActivatingCard(false);
              setIsEnablingCard(false);
              setIsChangingPwd(true);
            }
          }}
          fluid
        >
          {global.translate(`Change PIN Number`, 735)}
        </Button>
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
  setError: propTypes.func,
  pinError: propTypes.string.isRequired,
  setPinError: propTypes.func.isRequired,
  handleEnableCard: propTypes.func.isRequired,
};
CreditCardDetails.defaultProps = {
  pinDigit: {},
  confirmPinDigit: {},
  setPinDigit: () => {},
  setError: () => {},
};

export default CreditCardDetails;
