import React, { useState, useEffect } from 'react';
import { Image } from 'semantic-ui-react';
import WelcomePic from 'assets/images/WelcomePic-removebg-preview.png';

const GirlImage = () => {
  const [style, setStyle] = useState({
    position: 'absolute',
    bottom: 0,
    maxWidth: 'none',
    width: '60%',
    transition: 'width 2s ease-in-out',
  });
  const addStyle = () => {
    setStyle({
      width: '70%',
      position: 'absolute',
      bottom: 0,
      maxWidth: 'none',
      transition: 'all 2s ease-in-out',
    });
  };
  useEffect(() => {
    setTimeout(addStyle, 100);
  }, []);

  return <Image src={WelcomePic} style={style} />;
};

export default GirlImage;
