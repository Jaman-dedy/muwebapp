/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import getFavoritesList from 'redux/actions/contacts/getFavoritesList';
import FavoriteContacts from 'components/contacts/Favorite';

const Favorite = ({ onItemClick, moreOptions }) => {
  const dispatch = useDispatch();

  const { favoriteContacts } = useSelector(
    ({ contacts }) => contacts,
  );
  const getFavorites = () => {
    getFavoritesList()(dispatch);
  };

  useEffect(() => {
    if (!favoriteContacts.data) {
      getFavorites();
    }
  }, []);
  return (
    <FavoriteContacts
      favoriteContacts={favoriteContacts}
      getFavoriteContacts={getFavorites}
      onItemClick={onItemClick}
      moreOptions={moreOptions}
    />
  );
};

Favorite.propTypes = {
  onItemClick: PropTypes.func.isRequired,
  moreOptions: PropTypes.arrayOf(PropTypes.string),
};
Favorite.defaultProps = {
  moreOptions: [],
};
export default Favorite;
