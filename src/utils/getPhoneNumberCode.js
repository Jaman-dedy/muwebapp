import countryCodes from 'utils/countryCodes';
/**
 * @param country {string} the Country Code(eg, rw) or Country Name (eg, rwanda)
 * @returns {string} the phone number code (eg, +250) or '' if not found
 */
export default country => {
  const foundCountry = countryCodes.find(
    item => item.key === country,
  );

  if (foundCountry) return foundCountry.value;
  return 'not found';
};
