import React, { useState } from 'react';
import { Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import Loader from 'components/common/Loader';
import './SecurityQuestion.scss';

const SecurityQuestions = ({ securityQuestions }) => {
  const {
    securityQuestions: { loading, Questions, error },
  } = securityQuestions;

  const [activeIndex, setActiveIndex] = useState(-1);

  return (
    <div className="security-question-container">
      <ul className="security-question-list">
        {loading && <Loader />}
        {error && (
          <li className="security-question-item">
            {global.translate(error.Description)}
          </li>
        )}
        {Questions &&
          Questions.map(({ Text, Answer }, index) => {
            return (
              <>
                <li
                  className="security-question-item"
                  key={Number(index)}
                >
                  <Icon
                    name={`caret ${
                      activeIndex === index ? 'down' : 'right'
                    }`}
                    className="cursor-pointer"
                    onClick={() => setActiveIndex(index)}
                  />
                  <span>
                    {index + 1}. {global.translate(Text)}
                  </span>
                </li>
                {activeIndex === index && (
                  <ul className="medium-v-padding xxlarge-h-padding black-opacity-1 response">
                    <li className="xlarge-h-padding">
                      <Icon name="circle" disabled />
                      <span className="large-h-margin">{Answer}</span>
                    </li>
                  </ul>
                )}
              </>
            );
          })}
      </ul>
    </div>
  );
};

SecurityQuestions.propTypes = {
  securityQuestions: PropTypes.instanceOf(Object).isRequired,
};

export default SecurityQuestions;
