import React, { useState } from 'react';
import { Modal, Button, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './WalletOptionsModal.scss';
import SetDefault from 'assets/images/setAsDefaultIcon.png';
import EyeIcon from 'assets/images/eyeOptIcon.png';
import VisaIcon from 'assets/images/visaOptIcon.png';
import TrashIcon from 'assets/images/trashOptIcon.png';
import AddWalletIcon from 'assets/images/AddWalletIcon.png';
import EditIcon from 'assets/images/edit.png';
import AddMoneyIcon from 'assets/images/add_money_dash.png';
import CurrencyExchangeIcon from 'assets/images/CurrencyExchangeIcon.png';
import ConfirmModal from 'components/common/ConfirmModal';

const WalletOptionsModal = ({
  open,
  setOpen,
  item,
  form,
  setAsDefaultFx,
  deleteWalletFX,
  setOpenAddWalletModal,
  openEdtWalletModalFx,
}) => {
  const [isModalOpened, setModalOpen] = useState(false);
  return (
    <>
      <ConfirmModal
        close={() => setModalOpen(false)}
        isOpened={isModalOpened}
        onClickYes={deleteWalletFX}
        message={`${global.translate('Delete', 415)} ${
          form.AccountNumber
        } ?`}
      />
      <Modal
        size="tiny"
        open={open}
        className="option_modal"
        onClose={() => setOpen()}
      >
        <div className="options">
          <button
            className="option"
            type="button"
            onClick={setAsDefaultFx}
          >
            <span>
              <Image src={SetDefault} />
            </span>
            <span className="desc">
              {global.translate('Set as default', 93)}
            </span>
          </button>
          <Button
            as={Link}
            to={{
              pathname: '/transactions',
              state: {
                wallet: item,
              },
            }}
            className="option"
          >
            <span>
              <Image src={EyeIcon} />
            </span>
            <span className="desc">
              {global.translate('View transactions', 143)}
            </span>
          </Button>
          <button className="option" type="button">
            <span>
              <Image src={VisaIcon} />
            </span>
            <span className="desc">
              {global.translate('Add a visa card', 90)}
            </span>
          </button>

          <button
            className="option"
            type="button"
            onClick={() => setModalOpen(true)}
          >
            <span>
              <Image src={TrashIcon} />
            </span>
            <span className="desc">
              {global.translate('Delete Wallet', 557)}
            </span>
          </button>
          <button
            className="option"
            type="button"
            onClick={() => setOpenAddWalletModal()}
          >
            <span>
              <Image src={AddWalletIcon} />
            </span>

            <span className="desc">
              {global.translate('Add wallets', 111)}
            </span>
          </button>
          <button
            className="option"
            type="button"
            onClick={() => openEdtWalletModalFx()}
          >
            <span>
              <Image src={EditIcon} />
            </span>
            <span className="desc">
              {global.translate('Rename a wallet', 2051)}
            </span>
          </button>
          <button className="option" type="button">
            <span>
              <Image src={AddMoneyIcon} />
            </span>
            <span className="desc">
              {' '}
              {global.translate('Add money to your wallet', 173)}{' '}
            </span>
          </button>
          <button className="option" type="button">
            <span>
              <Image src={CurrencyExchangeIcon} />
            </span>
            <span className="desc">
              {global.translate('Currency exchange', 87)}
            </span>
          </button>
        </div>
      </Modal>
    </>
  );
};
WalletOptionsModal.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,

  item: PropTypes.objectOf(PropTypes.any).isRequired,
  form: PropTypes.objectOf(PropTypes.any),
  setAsDefaultFx: PropTypes.func,
  deleteWalletFX: PropTypes.func,
  setOpenAddWalletModal: PropTypes.func,
  openEdtWalletModalFx: PropTypes.func,
};

WalletOptionsModal.defaultProps = {
  open: false,
  setOpen: () => {},
  form: {},
  setAsDefaultFx: () => {},
  deleteWalletFX: () => {},
  setOpenAddWalletModal: () => {},
  openEdtWalletModalFx: () => {},
};
export default WalletOptionsModal;
