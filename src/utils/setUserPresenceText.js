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
      return global.translate('Online');
    }
    if (status === AWAY) {
      return global.translate('Away');
    }
    if (status === DO_NOT_DISTURB) {
      return global.translate('Do not disturb');
    }
    if (status === INVISIBLE) {
      if (showInvisible) {
        return global.translate('Invisible');
      }
      return global.translate('Offline');
    }
    if (status === OFFLINE) {
      return global.translate('Offline');
    }
  }
  return '';
};
