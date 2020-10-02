export default () => {
  if (
    window.location?.search?.toLowerCase()?.includes('source=mobile')
  ) {
    return true;
  }
  if (navigator.userAgent === 'RNWEBVIEW') {
    return true;
  }

  return false;
};
