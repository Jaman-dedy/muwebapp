import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import remindUsernameAction, {
  clearRemindUsername,
} from 'redux/actions/remindUsername';
import RemindUsername from 'components/RemindUsername';

const RemindUserNameContainer = () => {
  const dispatch = useDispatch();
  const [phoneValue, setPhoneValue] = useState(null);
  const {
    remindUsername: { loading, data, error },
  } = useSelector(({ remindUsername }) => remindUsername);

  const handleSubmit = () => {
    const data = {
      PhoneNumber: phoneValue,
    };
    remindUsernameAction(data)(dispatch);
  };

  return (
    <RemindUsername
      handleSubmit={handleSubmit}
      phoneValue={phoneValue}
      setPhoneValue={setPhoneValue}
      loading={loading}
      data={data}
      error={error}
      clearRemindUsername={clearRemindUsername}
    />
  );
};

export default RemindUserNameContainer;
