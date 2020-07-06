import React from 'react';
import { useSelector } from 'react-redux';
import Services from 'components/Services';

const ServicesContainer = () => {
  const { userData } = useSelector(({ user }) => user);
  return <Services userData={userData} />;
};
export default ServicesContainer;
