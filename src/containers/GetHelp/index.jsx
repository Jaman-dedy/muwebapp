import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import * as emailjs from 'emailjs-com';
import GetHelp from 'components/GetHelp';

const GetHelpContainer = () => {
  const [text, setText] = useState('');
  const [loader, setLoader] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [name, setName] = useState('');
  const { userData } = useSelector(({ user }) => user);

  useEffect(() => {
    if (userData.data) {
      setName(userData?.data?.FirstName);
    }
  }, [userData]);

  const submitText = () => {
    setLoader(true);
    const templateParams = {
      from_name: name,
      to_name: 'Back office',
      subject: 'Need Help',
      message_html: text,
    };
    emailjs
      .send(
        'gmail',
        'template_iX4rhNSz',
        templateParams,
        'user_LASo3cTDRDaXHtS4g0yMP',
      )
      .then(
        response => {
          setLoader(false);
          setIsSent(true);
          toast.success('Message sent successefully');
        },
        err => {
          setLoader(false);
          setIsSent(true);
          toast.error(
            'An Error has occur, Kindly send you message again',
          );
        },
      );
  };

  return (
    <GetHelp
      setText={setText}
      submitText={submitText}
      loading={loader}
      isSent={isSent}
    />
  );
};

export default GetHelpContainer;
