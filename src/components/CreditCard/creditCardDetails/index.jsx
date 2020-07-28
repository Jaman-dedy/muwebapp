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
    checked,
    setChecked,
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
            {global.translate('My credit cards')}
          </h2>
          <div className="clear" />
        </div>
      </WelcomeBar>
      <div className={classes.CreditCard}>
        {' '}
        <Segment>
          <Grid>
            <Grid.Column mobile={16} tablet={10} computer={6}>
              {cardFace === 'recto' ? (
                <CardFront wallet={wallet} />
              ) : (
                <CardBack wallet={wallet} />
              )}
            </Grid.Column>
            <Grid.Column mobile={6} tablet={4} computer={2}>
              <CardMiniFront
                wallet={wallet}
                onClick={e => handleSetCardFace('recto')}
              />
              <CardMiniBack
                wallet={wallet}
                onClick={e => handleSetCardBack('verso')}
              />
            </Grid.Column>

            <Details wallet={wallet} />
          </Grid>
        </Segment>
        <Segment>
          <h4 style={{ marginLeft: '1rem' }}>
            {global.translate(`Change your pin number`)}
          </h4>
          <div className={classes.PinForm}>
            <div className={classes.CheckBox}>
              <Checkbox
                toggle
                label="Disabled"
                checked={wallet.Unabled === 'YES'}
                disabled
              />
              <Checkbox
                name="activate"
                toggle
                label="deactivated"
                value={checked}
                onChange={() => {
                  setChecked(!checked);
                }}
              />
            </div>
            <Segment>
              <PinCodeForm
                label={global.translate(
                  'Provide your current PIN Number',
                  543,
                )}
                onChange={({ target: { value, name } }) => {
                  setError(null);
                  setPinDigit({ ...pinDigit, [name]: value });
                }}
                name="PIN"
                value={form.pinDigit || ''}
                shouldClear={shouldClear}
                setShouldClear={setShouldClear}
              />
              <br />
              <PinCodeForm
                label={global.translate(
                  'Provide your new PIN Number',
                  543,
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
                shouldClear={shouldClear}
                setShouldClear={setShouldClear}
              />
            </Segment>
            <PinCodeForm
              label={global.translate('Provide your PIN Number', 543)}
              onChange={({ target: { value, name } }) => {
                setError(null);
                setUserPinDigit({
                  ...userPinDigit,
                  [name]: value,
                });
              }}
              name="PIN"
              shouldClear={shouldClear}
              setShouldClear={setShouldClear}
            />
            {error && (
              <Message negative icon>
                <span style={{ width: '100%', fontSize: '.9rem' }}>
                  {error}
                </span>
              </Message>
            )}
            <Button
              loading={changeCreditCardPin.loading}
              disabled={changeCreditCardPin.loading}
              onClick={() => {
                handleChangeCreditCardPin();
              }}
              fluid
            >
              {global.translate(`Change Pin Number`, 735)}
            </Button>
          </div>
        </Segment>
      </div>
    </DashboardLayout>
  );
};
CreditCardDetails.propTypes = {
  creditCardDetails: propTypes.instanceOf(Object).isRequired,
  pinDigit: propTypes.instanceOf(Object),
  confirmPinDigit: propTypes.instanceOf(Object),
  setPinDigit: propTypes.func,
  setError: propTypes.func,
};
CreditCardDetails.defaultProps = {
  pinDigit: {},
  confirmPinDigit: {},
  setPinDigit: () => {},
  setError: () => {},
};

export default CreditCardDetails;
