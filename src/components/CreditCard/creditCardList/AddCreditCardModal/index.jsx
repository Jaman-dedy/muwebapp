import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import propTypes from 'prop-types';
import { Button, Modal } from 'semantic-ui-react';
import Message from 'components/common/Message';
import ReusableDropdown from 'components/common/Dropdown/ReusableDropdown';
import formatNumber from 'utils/formatNumber';
import getUserData from 'redux/actions/users/getUserInfo';

const AddVirtualCard = ({
  open,
  setOpen,
  errors,
  setErrors,
  onOptionsChange,
  selectedWallet,
  setSlectedWallet,
  balanceOnWallet,
  currency,
  creditCardNextStep,
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
          {global.translate(`Add a new credit card`, 1968)}
        </Modal.Header>
        <Modal.Content>
          <div style={{ width: '60%', margin: 'auto' }}>
            <span>{global.translate('Select a wallet')}</span>
            <ReusableDropdown
              customstyle
              fluid
              currentOption={selectedWallet}
              setCurrentOption={setSlectedWallet}
              selection
              wrapSelection={false}
              options={newWalletList}
              placeholder="Chose a wallet..."
              onChange={e => {
                onOptionsChange(e, {
                  name: 'AccountName',
                  value: e.target.value,
                });
              }}
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
                {formatNumber(balanceOnWallet, {
                  locales: preferred,
                  currency,
                })}
              </p>
            </h4>
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
            positive
            content="Add"
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
  onOptionsChange: propTypes.func,
  errors: propTypes.string,
  setErrors: propTypes.func,
  selectedWallet: propTypes.objectOf(propTypes.any).isRequired,
  setSlectedWallet: propTypes.func.isRequired,
  balanceOnWallet: propTypes.string.isRequired,
  currency: propTypes.string.isRequired,
  creditCardNextStep: propTypes.func.isRequired,
};

AddVirtualCard.defaultProps = {
  open: false,
  setOpen: () => {},
  onOptionsChange: () => {},
  errors: '',
  setErrors: () => {},
};

export default AddVirtualCard;
