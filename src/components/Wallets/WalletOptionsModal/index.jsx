import React, { useState } from 'react';
import {
  Modal,
  Form,
  Button,
  Dropdown,
  Image,
  Select,
  Loader,
  Message,
  Header,
  Transition,
  TransitionablePortal,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import LoaderComponent from 'components/common/Loader';
import './WalletOptionsModal.scss';

import SetDefault from 'assets/images/settingIcon1.png';
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
  walletList,
  onChange,
  form,
  onSubmit,
  addNewUserData,
  onkeyUp,
  setAsDefaultFx,
  deleteWalletFX,
}) => {
  const [isModalOpened, setModalOpen] = useState(false);

  return (
    <>
      <ConfirmModal
        close={() => setModalOpen(false)}
        isOpened={isModalOpened}
        onClickYes={deleteWalletFX}
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
            <span className="desc">Set wallet as default</span>
          </button>

          <button className="option" type="button">
            <span>
              <Image src={EyeIcon} />
            </span>
            <span className="desc">View transactions</span>
          </button>

          <button className="option" type="button">
            <span>
              <Image src={VisaIcon} />
            </span>
            <span className="desc">Add Visa card</span>
          </button>

          <button
            className="option"
            type="button"
            onClick={() => setModalOpen(true)}
          >
            <span>
              <Image src={TrashIcon} />
            </span>
            <span className="desc">Delete wallet</span>
          </button>
          <button className="option" type="button">
            <span>
              <Image src={AddWalletIcon} />
            </span>
            <span className="desc">Add wallet</span>
          </button>

          <button className="option" type="button">
            <span>
              <Image src={EditIcon} />
            </span>
            <span className="desc">Rename wallet</span>
          </button>

          <button className="option" type="button">
            <span>
              <Image src={AddMoneyIcon} />
            </span>
            <span className="desc">Add money </span>
          </button>

          <button className="option" type="button">
            <span>
              <Image src={CurrencyExchangeIcon} />
            </span>
            <span className="desc">Currency Exchange </span>
          </button>
        </div>
      </Modal>
    </>
  );
};
WalletOptionsModal.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  walletList: PropTypes.arrayOf(PropTypes.any),
};

WalletOptionsModal.defaultProps = {
  open: false,
  setOpen: () => {},
  walletList: [],
};
export default WalletOptionsModal;
