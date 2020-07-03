/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import getFavoritesList from 'redux/actions/contacts/getFavoritesList';

const useFavorites = () => {
  const dispatch = useDispatch();
  const { favoriteContacts } = useSelector(
    ({ contacts }) => contacts,
  );

  useEffect(() => {
    if (!favoriteContacts.data) {
      getFavoritesList()(dispatch);
    }
  }, []);

  const userFavorite = {
    ...favoriteContacts,
    data: Array.isArray(favoriteContacts.data)
      ? favoriteContacts.data.filter(
          item => item.ContactType === 'INTERNAL',
        )
      : [],
  };
  return userFavorite;
};

export default useFavorites;
