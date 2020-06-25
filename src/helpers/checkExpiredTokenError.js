/**
 * @param {object} error
 * @returns {boolean} true if the token has expired otherwise false
 */
export default error => {
  let hasTokenExpired = false;
  try {
    if (Array.isArray(error)) {
      error.forEach(err => {
        if (
          typeof err === 'object' &&
          err.TokenVerified &&
          err.TokenVerified.toLowerCase() === 'false'
        ) {
          hasTokenExpired = true;
        }
      });
    }
  } catch (e) {
    hasTokenExpired = false;
  }
  return hasTokenExpired;
};
