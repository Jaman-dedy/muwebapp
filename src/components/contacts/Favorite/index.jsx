import React from 'react';
import { Segment } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import RecentlyContactedItems from './Recent/List';

const FavoriteContacts = ({
  favoriteContacts,
  getFavoriteContacts,
  onItemClick,
  moreOptions,
}) => {
  const hasLoadedandIsEmpty = () => {
    const { data, loading, error } = favoriteContacts;

    if (!loading && !error) {
      if (Array.isArray(data)) {
        if (data.filter(item => item.PictureURL).length < 1) {
          return true;
        }
      }
    }
    return false;
  };
  return (
    <>
      {!hasLoadedandIsEmpty() && (
        <Segment id="favorite-contacts">
          <div className="favorite-contacts">
            {global.translate('Favorites', 1959)}
          </div>
          <RecentlyContactedItems
            onItemClick={onItemClick}
            items={favoriteContacts}
            moreOptions={moreOptions}
            retryFn={getFavoriteContacts}
          />
        </Segment>
      )}
    </>
  );
};

FavoriteContacts.propTypes = {
  favoriteContacts: PropTypes.objectOf(PropTypes.any).isRequired,
  getFavoriteContacts: PropTypes.func.isRequired,
  onItemClick: PropTypes.func.isRequired,
  moreOptions: PropTypes.arrayOf(PropTypes.string),
};
FavoriteContacts.defaultProps = {
  moreOptions: [],
};
export default FavoriteContacts;
