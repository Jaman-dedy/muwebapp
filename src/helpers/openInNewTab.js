export default (url = '') => {
  if (url.startsWith('http://') || url.startsWith('https://')) {
    const openExternalLink = window.open(url, '_blank');
    if (openExternalLink) {
      openExternalLink.focus();
    }
    return openExternalLink;
  }
  const openExternalLink = window.open(`http://${url}`, '_blank');
  if (openExternalLink) {
    openExternalLink.focus();
  }
  return openExternalLink;
};
