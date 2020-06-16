/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import PropTypes from 'prop-types';
import { Image } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';
import Img from 'components/common/Img';
import './PublicityCard.scss';
import imagePlaceholder from 'assets/images/placeholder.jpg';
import EllipseMenu from 'components/common/EllipseOptions';
import EditTransactionImage from 'assets/images/edit.png';
import ViewEyeImage from 'assets/images/vieweye.png';
import Advertisementsmage from 'assets/images/shout.png';

const StoreCard = ({ publicity, item, onClick }) => {
  const {
    ID,
    PictureURL,
    Title,
    SubTitle,
    Detail,
    ItemID,
    CampaignType,
  } = publicity;

  const history = useHistory();

  const options = [
    {
      name: global.translate('View Details'),
      image: ViewEyeImage,
      onClick: () => {
        history.push({
          pathname: '/publicity-details',
          state: { publicityID: ID, CampaignType, ItemID, item },
        });
      },
    },
    {
      name: global.translate('Execute Campaign'),
      image: Advertisementsmage,
      onClick: () => {
        history.push({
          pathname: '/publicity-details',
          state: {
            publicityID: ID,
            CampaignType,
            ItemID,
            detailTab: 1,
            item,
          },
        });
      },
    },
    {
      name: `${global.translate('Edit')} ${global.translate(
        'Campaign',
      )}`,
      image: EditTransactionImage,
      onClick: () => {
        history.push({
          pathname: '/publicity-details',
          state: {
            publicityID: ID,
            CampaignType,
            ItemID,
            detailTab: 2,
            item,
          },
        });
      },
    },
  ];

  return (
    <div className="campaing" onClick={onClick}>
      <div className="campaing-image">
        <Img
          src={PictureURL}
          alt={<Image src={imagePlaceholder} />}
        />
      </div>
      <div className="campaing-info">
        <span className="campaing-title">{Title}</span>
        <span className="campaing-subtitle">{SubTitle}</span>
        <p className="campaing-detail">
          {Detail.replace(/TypeCampaign/g, ' TypeCampaign')}
        </p>
      </div>

      <div className="icons">
        <EllipseMenu
          options={options}
          userItemStyle={{
            paddingLeft: 5,
          }}
        />
      </div>
    </div>
  );
};

StoreCard.propTypes = {
  publicity: PropTypes.instanceOf(Object),
  item: PropTypes.instanceOf(Object),
  onClick: PropTypes.func,
};

StoreCard.defaultProps = {
  onClick: () => null,
  item: {},
  publicity: {
    Title: '',
    SubTitle: '',
    Detail: '',
    PictureURL: '',
    Link: '',
  },
};

export default StoreCard;
