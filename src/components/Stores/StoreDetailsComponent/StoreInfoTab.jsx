import React, { useState } from 'react';
import {
  Grid,
  Label,
  Icon,
  Image,
  Button,
  Responsive,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import imagePlaceholder from 'assets/images/ShopIcon.svg';
import Img from 'components/common/Img';

const StoreInfoTab = ({ currentStore, onChangeTab }) => {
  const [hasError, setHasError] = useState(false);
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
          style={{
            width: '250px',
            height: '250px',
          }}
          not_rounded
          width="250px"
          heigth="250px"
          compress
          format="png"
          className="store-picture"
          alt={
            <Image
              style={{
                height: '250px',
                width: '250px',
                objectFit: 'contain',
              }}
              src={imagePlaceholder}
              centered
              height={250}
              className="store-picture"
            />
          }
          src={currentStore?.StoreBanner}
          size="small"
          hasError={hasError}
          setHasError={setHasError}
        />
        <Img
          style={{
            width: '35px',
            height: '35px',
            borderRadius: '50%',
          }}
          width="35px"
          heigth="35px"
          compress
          format="png"
          className="store-logo"
          alt={
            <Image
              src={imagePlaceholder}
              height={15}
              className="store-logo"
              circular
            />
          }
          circular
          src={currentStore?.StoreLogo}
          hasError={hasError}
          setHasError={setHasError}
        />
      </Grid.Column>
      <Grid.Column width={12}>
        <div className="store-detail-top-options">
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

          <div className="button-plus-icon">
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
