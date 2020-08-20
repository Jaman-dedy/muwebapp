import { useState, useEffect } from 'react';

export default () => {
  const [geoData, setGeoData] = useState({});
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        res => {
          const { latitude, longitude } = res.coords;
          setGeoData({ latitude, longitude });
        },
        () => {
          setGeoData({ latitude: 0, longitude: 0 });
        },
      );
    }
  }, []);

  return geoData;
};
