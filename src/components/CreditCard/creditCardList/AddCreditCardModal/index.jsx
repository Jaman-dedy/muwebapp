import React from 'react';
import { useSelector } from 'react-redux';
import propTypes from 'prop-types';
import { Button, Modal } from 'semantic-ui-react';
import Message from 'components/common/Message';
import ReusableDropdown from 'components/common/Dropdown/ReusableDropdown';
import formatNumber from 'utils/formatNumber';

// import classes from './AddVirtualCardModal.module.scss';

const AddVirtualCard = ({
  open,
  setOpen,
  errors,
  setErrors,
  onOptionsChange,
  walletList,
  selectedWallet,
  setSlectedWallet,
  balanceOnWallet,
  currency,
  creditCardNextStep,
}) => {
  const newWalletList = [];
  const { language: { preferred } = {} } = useSelector(
    ({ user }) => user,
  );
  if (walletList.length) {
    walletList.map(item => {
      if (item.HasACreditCard === 'NO') {
        newWalletList.push(item);
      }
    });
  }
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
            <span>Select a wallet</span>
            <ReusableDropdown
              customstyle
              fluid
              currentOption={selectedWallet}
              setCurrentOption={setSlectedWallet}
              selection
              wrapSelection={false}
              options={newWalletList && newWalletList}
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
            Cancel
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
  walletList: propTypes.instanceOf(Array).isRequired,
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
