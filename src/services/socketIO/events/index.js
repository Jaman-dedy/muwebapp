import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import * as connectUserEvent from './connectUser';

export default () => {
  const { userData: { data, loading } = {} } = useSelector(
    ({ user }) => user,
  );

  useEffect(() => {
    if (!loading && data && Object.keys(data).length) {
      connectUserEvent.emit({
        PID: data.PID,
        Country: data.Country,
      });
    }
  }, [data && data.PID]);
};
