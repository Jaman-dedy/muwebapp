import { useDispatch, useSelector } from 'react-redux';
import setPresenceStatus from 'redux/actions/users/setPresenceStatus';

export default () => {
  const dispatch = useDispatch();

  const { loading } = useSelector(
    state => state.user.setPresenceStatus,
  );

  const changeUserPresence = status => {
    const payload = { PresenceStatus: status };
    setPresenceStatus(payload)(dispatch);
  };
  return { loading, changeUserPresence };
};
