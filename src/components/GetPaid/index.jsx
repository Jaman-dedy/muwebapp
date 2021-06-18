import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { Segment, Image, Button, Icon } from 'semantic-ui-react';
import DashboardLayout from 'components/common/DashboardLayout';
import WelcomeBar from 'components/Dashboard/WelcomeSection';
import GoBack from 'components/common/GoBack';
import ReusableDropDown from 'components/common/Dropdown/ReusableDropdown';
import './getPaid.scss';

const GetPaid = ({
  walletList,
  selectWallet,
  setSelectedWallet,
  onDownLoadImageHandler,
}) => {
  const history = useHistory();
  const onClickHandler = () => history.goBack();
  return (
    <DashboardLayout>
      <WelcomeBar>
        <div className="head-content">
          <div className="go-back">
            <GoBack style onClickHandler={onClickHandler} />
          </div>
          <h2 className="head-title">
            {global.translate('Get paid')}
          </h2>
          <div className="clear" />
        </div>
      </WelcomeBar>
      <div className="get-paid-container">
        <Segment>
          <span>{global.translate('Select a wallet')}</span>
          <ReusableDropDown
            customStyleSelector
            options={walletList && walletList}
            currentOption={selectWallet && selectWallet}
            setCurrentOption={setSelectedWallet}
          />

          <Image
            className="get-paid-qr-code"
            src={selectWallet && selectWallet.WalletQRCode}
            bordered
          />
          <div className="get-paid-button">
            <Button
              fluid
              onClick={onDownLoadImageHandler}
              icon="download"
            >
              <Icon name="download" />
              {global.translate('Download the QR code')}
            </Button>
          </div>
        </Segment>
      </div>
    </DashboardLayout>
  );
};

GetPaid.propTypes = {
  walletList: PropTypes.arrayOf(PropTypes.any).isRequired,
  selectWallet: PropTypes.bool.isRequired,
  setSelectedWallet: PropTypes.func.isRequired,
  onDownLoadImageHandler: PropTypes.func.isRequired,
};

export default GetPaid;
