import React from 'react';
import {
  Grid,
  Label,
  Icon,
  Image,
  Button,
  Responsive,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import imagePlaceholder from 'assets/images/placeholder.jpg';
import Img from 'components/common/Img';

const StoreInfoTab = ({ currentStore, onChangeTab }) => {
  const formatAvRating = () => {
    if (currentStore && currentStore.AverageRating) {
      const count = parseFloat(currentStore.AverageRating).toFixed(2);
      if (typeof count === 'number') {
        return count;
      }
      return 0.0;
    }
    return 0.0;
  };
  return (
    <Grid stackable columns={2}>
      <Grid.Column width={4}>
        <Label
          ribbon
          color={currentStore.Status === '2' ? 'red' : 'green'}
        >
          {currentStore.StatusText}
        </Label>
        <Img
          className="store-picture"
          alt={
            <Image
              src={imagePlaceholder}
              size="small"
              className="store-picture"
            />
          }
          src={currentStore.StoreBanner}
          size="small"
        />
        <Img
          className="store-logo"
          alt={
            <Image
              src={imagePlaceholder}
              className="store-logo"
              circular
            />
          }
          circular
          src={currentStore.StoreLogo}
        />
      </Grid.Column>
      <Grid.Column width={12}>
        <div className="store-top-options">
          <div>
            <Responsive
              as={Image}
              minWidth={768}
              className="store-country-image"
              width={30}
              style={{ display: 'inline', marginTop: -8 }}
              src={currentStore.Flag}
            />{' '}
            <span className="store-inner-name">
              {currentStore.StoreName}
            </span>
          </div>

          <div className="edit-button ">
            <Button
              basic
              color="orange"
              content={`${global.translate(
                'Edit',
              )} ${global.translate('Store')}`}
              onClick={() => onChangeTab()}
            />
          </div>

          <div className="settings-btn">
            <Icon
              name="setting"
              size="large"
              onClick={() => onChangeTab()}
            />
          </div>
        </div>
        <div className="stats">
          <div className="likes">
            <span className="count">{currentStore.Likes}</span>{' '}
            <span>{global.translate('Likes')}</span>
          </div>
          <div className="likes">
            <span className="count">{currentStore.DisLikes}</span>{' '}
            <span>{global.translate('Dislikes')}</span>
          </div>
          <div className="likes">
            <span className="count">{currentStore.RatingCount}</span>{' '}
            <span>{global.translate('Ratings')}</span>
          </div>
          <div className="likes">
            <span className="count">{formatAvRating()}</span>{' '}
            <span>{global.translate('Av.Rating')}</span>
          </div>
        </div>
        <p className="category">{currentStore.CategoryText}</p>
        <Icon name="map marker" />{' '}
        <span className="address">
          {currentStore.Address} {currentStore.City}{' '}
          {currentStore.Country}
        </span>
        <h4 className="open-hrs">
          {currentStore.OpenOnWEText === 'YES'
            ? global.translate('Monday - Sunday', 785)
            : global.translate('Monday - Friday', 786)}
          <span>
            {' '}
            {currentStore.OpeningHour} - {currentStore.ClosingHour}{' '}
            {global.translate('Hours', 787)}
          </span>
        </h4>
        <p className="description">{currentStore.Description}</p>
        <p className="description">{currentStore.ShortDesc}</p>
      </Grid.Column>
    </Grid>
  );
};

StoreInfoTab.propTypes = {
  currentStore: PropTypes.objectOf(PropTypes.any),
  onChangeTab: PropTypes.func,
};

StoreInfoTab.defaultProps = {
  currentStore: {},
  onChangeTab: () => {},
};

export default StoreInfoTab;
