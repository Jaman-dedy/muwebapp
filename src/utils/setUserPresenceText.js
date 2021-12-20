import {
  OFFLINE,
  ONLINE,
  AWAY,
  DO_NOT_DISTURB,
  INVISIBLE,
} from 'constants/general';

export default (status = '', showInvisible = false) => {
  if (status) {
    if (status === ONLINE) {
      return global.translate('Online', 590);
    }
    if (status === AWAY) {
      return global.translate('Away', 591);
    }
    if (status === DO_NOT_DISTURB) {
      return global.translate('Do not disturb', 592);
    }
    if (status === INVISIBLE) {
      if (showInvisible) {
        return global.translate('Invisible', 593);
      }
      return global.translate('Offline', 594);
    }
    if (status === OFFLINE) {
      return global.translate('Offline', 594);
    }
  }
  return '';
};
