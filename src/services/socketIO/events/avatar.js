/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';

import { AVATAR_UPDATED } from 'constants/events/avatar';
import socketIOClient from 'services/socketIO';

export default setRandom => {
  useEffect(() => {
    socketIOClient.on(AVATAR_UPDATED, () => {
      setTimeout(() => {
        if (typeof setRandom === 'function')
          setRandom(Math.random() + 1);
      }, 45000);
    });

    return () => {
      socketIOClient.off(AVATAR_UPDATED);
    };
  }, []);
};
