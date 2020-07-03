/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';

import MyPublicity from 'components/Publicity';
import getPublicitiesAction from 'redux/actions/publicity/getPublicities';
import createCampaing from './createCampaign';

const PublicityContainer = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { userData } = useSelector(({ user }) => user);
  const { publicities } = useSelector(({ publicity }) => publicity);

  const ItemID = location.state && location.state.ItemID;
  const item = location.state && location.state.item;
  const CampaignType = location.state && location.state.CampaignType;

  useEffect(() => {
    getPublicitiesAction({ ItemID, CampaignType })(dispatch);
  }, []);
  return (
    <MyPublicity
      userData={userData}
      createCampaing={createCampaing({})}
      publicities={publicities}
      item={item}
    />
  );
};

export default PublicityContainer;
