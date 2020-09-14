import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import submitEmail, { clearSendEmail } from 'redux/actions/sendEmail';
import GetHelp from 'components/GetHelp';

const GetHelpContainer = () => {
  const dispatch = useDispatch();
  const [text, setText] = useState('');
  const [isSent, setIsSent] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
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
      To: 'jeandedieuam@gmail.com',
      Subject: `Email from ${name}`,
      HTML: newText.split('\n').join(''),
    };
    submitEmail(data)(dispatch);
  };
  useEffect(() => {
    if (sendEmail.data) {
      setToastMessage(sendEmail?.data?.Description);
      setIsSent(true);
    }
  }, [sendEmail]);

  useEffect(() => {
    if (toastMessage && sendEmail.data) {
      toast.success(toastMessage);
      clearSendEmail()(dispatch);
      setToastMessage(null);
      setText('');
    }
  }, [toastMessage]);

  useEffect(() => {
    if (sendEmail.error) {
      setToastMessage(sendEmail?.error?.Description);
      setIsSent(true);
    }
  }, [sendEmail]);

  useEffect(() => {
    if (toastMessage && sendEmail.error) {
      toast.error(toastMessage);
      clearSendEmail()(dispatch);
      setToastMessage(null);
      setText('');
    }
  }, [toastMessage]);

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
