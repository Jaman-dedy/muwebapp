/**
 * @param {string} code the country code
 * @returns {string} country flag url
 */
export default code => {
  return `https://flagcdn.com/h20/${code?.replace(/[ ]/g, '-')}.png`;
};
