/**
 * @param {object} history
 * @returns {void} redirection
 */
export default history => {
  localStorage.setItem('fromUserLogout', true);
  localStorage.removeItem('refresh_token');
  localStorage.removeItem('token');
  localStorage.removeItem('MAX_USER_IDLE_TIME');

  return history &&
    typeof history === 'object' &&
    typeof history.push === 'function'
    ? history.push('/login')
    : window.location.replace('/login');
};
