/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import './feedback.scss';

const Feedback = ({ message, title, success, callbackFn }) => {
  const [show, setShow] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    setShow(true);
    if (!success) {
      setTimeout(() => {
        setShow(false);
        if (callbackFn) {
          callbackFn()(dispatch);
        }
      }, 7000);
    }
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
          <div
            className="feedbackWrapper-content"
            style={
              success
                ? {
                    border: '1px solid #277946',
                    background: '#edfaea',
                  }
                : {
                    border: '1px solid #df5c4e',
                    backgroundColor: '#f5f2f2',
                  }
            }
          >
            <div
              className="titleText"
              style={
                success ? { color: '#277946' } : { color: '#df5c4e' }
              }
            >
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
