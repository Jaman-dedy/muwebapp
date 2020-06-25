export default (status = '', showInvisible = false) => {
  if (status) {
    if (status === '0') {
      return global.translate('Online', 590);
    }
    if (status === '1') {
      return global.translate('Away', 591);
    }
    if (status === '2') {
      return global.translate('Do not disturb', 592);
    }
    if (status === '3') {
      if (showInvisible) {
        return global.translate('Invisible', 593);
      }
      return '';
    }
    if (status === '4') {
      return global.translate('Offline', 594);
    }
  }
  return '';
};
