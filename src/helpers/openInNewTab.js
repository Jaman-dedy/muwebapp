export default (url = '') => {
  if (window.open(url, '_blank')) {
    window.open(url, '_blank').focus();
  }
};
