import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import submitEmail, { clearSendEmail } from 'redux/actions/sendEmail';
import GetHelp from 'components/GetHelp';

const GetHelpContainer = () => {
  const dispatch = useDispatch();
  const [text, setText] = useState('');
  const [isSent, setIsSent] = useState(false);
  const [disable, setDisable] = useState(true);
  const [name, setName] = useState('');
  const { userData } = useSelector(({ user }) => user);
  const { sendEmail } = useSelector(({ email }) => email);

  useEffect(() => {
    if (text.length > 8) {
      setDisable(false);
    }
    if (text.length === 8) {
      setDisable(true);
    }
  }, [text]);

  const newText = text.replace(/"/g, "'");
  useEffect(() => {
    if (userData.data) {
      setName(userData?.data?.FirstName);
    }
  }, [userData]);

  const submitText = () => {
    const data = {
      To: process.env.REACT_APP_SUPPORT_EMAIL || '',
      Subject: `Email from ${name}`,
      Email: newText.split('\n').join(''),
      PID: userData?.data?.PID,
      Category: '1',
    };
    submitEmail(data)(dispatch);
  };

  useEffect(() => {
    if (sendEmail.data || sendEmail.error) {
      setIsSent(true);
      clearSendEmail()(dispatch);
    }
  }, [sendEmail]);

  return (
    <GetHelp
      setText={setText}
      submitText={submitText}
      isSent={isSent}
      disable={disable}
      loading={sendEmail?.loading}
    />
  );
};

export default GetHelpContainer;
