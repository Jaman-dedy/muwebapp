import Geocode from 'react-geocode';

export default function useGeocode() {
  const { REACT_APP_GOOGLE_API_KEY } = process.env;
  Geocode.setApiKey(REACT_APP_GOOGLE_API_KEY);
  Geocode.enableDebug();
  return Geocode;
}
