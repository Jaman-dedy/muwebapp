/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import errorImage from 'assets/images/error.png';
import successImage from 'assets/images/confirm.png';
import './feedback.scss';

const Feedback = ({ message, title, success, callbackFn }) => {
  const [show, setShow] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    setShow(true);
    setTimeout(() => {
      setShow(false);
      if (callbackFn) {
        callbackFn()(dispatch);
      }
    }, 7000);
  }, []);
  return (
    <>
      {show ? (
        <div
          className="feedbackWrapper"
          onClick={() => {
            setShow(false);
            if (callbackFn) {
              callbackFn()(dispatch);
            }
          }}
        >
          <div className="feedbackWrapper-content">
            <div className="titleText">
              <h4>{global.translate(title).toUpperCase()}</h4>
              <p className="messageText">
                {global.translate(message)}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};
Feedback.propTypes = {
  message: PropTypes.string,
  title: PropTypes.string,
  success: PropTypes.bool,
  callbackFn: PropTypes.func,
};
Feedback.defaultProps = {
  title: 'SORRY',
  callbackFn: () => {},
  success: false,
  message: 'Invalid credential,please try again',
};
export default Feedback;
