/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import { Button, Modal, Checkbox } from 'semantic-ui-react';
import Message from 'components/common/Message';
import ReusableDropdown from 'components/common/Dropdown/ReusableDropdown';
import formatNumber from 'utils/formatNumber';
import getUserData from 'redux/actions/users/getUserInfo';

const AddVirtualCard = ({
  open,
  setOpen,
  errors,
  setErrors,
  selectedWallet,
  setSlectedWallet,
  creditCardNextStep,
  setCanCreate,
  canCreate,
}) => {
  const [newWalletList, setWallets] = useState([]);
  const { language: { preferred } = {}, myWallets } = useSelector(
    ({ user }) => user,
  );

  const dispatch = useDispatch();
  const { data } = useSelector(state => state.user.userData);

  useEffect(() => {
    if (!data) {
      getUserData()(dispatch);
    }
  }, []);

  useEffect(() => {
    if (myWallets.walletList.length) {
      setWallets(
        myWallets.walletList.filter(
          item => item.HasACreditCard === 'NO',
        ),
      );
    }
  }, [myWallets.walletList]);

  return (
    <div className="">
      <Modal
        size="small"
        open={open}
        closeOnDocumentClick={false}
        closeOnDimmerClick={false}
        onClose={() => setOpen(false)}
      >
        <Modal.Header style={{ textAlign: 'center' }}>
          {global.translate(`Add a new M-Card`, 1968)}
        </Modal.Header>
        <Modal.Content>
          <div style={{ width: '60%', margin: 'auto' }}>
            <span>{global.translate('Select a wallet', 1286)}</span>
            <ReusableDropdown
              customstyle
              fluid
              currentOption={selectedWallet}
              setCurrentOption={setSlectedWallet}
              selection
              wrapSelection={false}
              options={newWalletList}
              placeholder={global.translate(
                'Choose a wallet...',
                1222,
              )}
            />
            {errors && <Message message={errors} />}
          </div>
          <div className="remaining-money-shade">
            <h4 className="available">
              {global.translate(
                'Available Balance in the Selected Wallet',
                1223,
              )}
              <p className="available-value">
                {formatNumber(selectedWallet?.Balance, {
                  locales: preferred,
                  currency: selectedWallet?.CurrencyCode,
                })}
              </p>
            </h4>
          </div>
          <div style={{ width: '60%', margin: 'auto' }}>
            <Checkbox
              label={
                <label>
                  {global.translate('I agree on M2U', 2176)}
                  <Link to="www.m2u.com" style={{ color: '#ea5726' }}>
                    {global.translate('terms and conditions', 2177)}
                  </Link>{' '}
                </label>
              }
              onClick={() => setCanCreate(!canCreate)}
            />
          </div>
        </Modal.Content>
        <Modal.Actions>
          <Button
            onClick={() => {
              setOpen(false);
              setErrors(null);
            }}
            neg
            basic
            color="red"
            ative
          >
            {global.translate('Cancel')}
          </Button>
          <Button
            disabled={!canCreate}
            positive
            content={global.translate('Add', 112)}
            onClick={() => creditCardNextStep()}
          />
        </Modal.Actions>
      </Modal>
    </div>
  );
};

AddVirtualCard.propTypes = {
  open: propTypes.bool,
  setOpen: propTypes.func,
  errors: propTypes.string,
  setErrors: propTypes.func,
  selectedWallet: propTypes.objectOf(propTypes.any).isRequired,
  setSlectedWallet: propTypes.func.isRequired,
  creditCardNextStep: propTypes.func.isRequired,
  setCanCreate: propTypes.func.isRequired,
  canCreate: propTypes.bool.isRequired,
};

AddVirtualCard.defaultProps = {
  open: false,
  setOpen: () => {},
  errors: '',
  setErrors: () => {},
};

export default AddVirtualCard;
