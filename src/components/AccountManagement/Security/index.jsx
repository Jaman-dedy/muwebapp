/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'semantic-ui-react';

import SecurityQuestion from './SecurityQuestion';
import ChangePassword from './ChangePassword';
import EditSecurityQuestion from './SecurityQuestion/EditSecurityQuestions';
import ChangePIN from './ChangePIN';
import ChangeDOB from './ChangeDOBAndGender';
import ChangeGender from './ChangeDOBAndGender/ChangeGender';

import './Security.scss';

const Security = ({
  securityQuestions,
  changePIN,
  changeDOB,
  changeGender,
  target,
}) => {
  const { open, setOpen } = securityQuestions;

  const [activeIndex, setActiveIndex] = useState(0);

  const handleClick = index => {
    const newIndex = activeIndex === index ? 0 : index;

    setActiveIndex(newIndex);
  };

  useEffect(() => {
    const {
      updatePIN: { success, error },
    } = changePIN;
    if (success || error) {
      setActiveIndex(0);
      setTimeout(() => {
        setActiveIndex(3);
      }, 0.00000001);
    }
  }, [changePIN.updatePIN]);

  useEffect(() => {
    if (target === 'DOB') setActiveIndex(4);
    else if (target === 'SecurityQuestion') setOpen(true);
  }, []);

  return (
    <div className="security-container">
      <ul className="security-menu">
        <EditSecurityQuestion
          open={open}
          setOpen={setOpen}
          securityQuestions={securityQuestions}
        />
        <li className="security-dropdown flex flex-row justify-content-space-between align-items-center">
          <div
            className="flex flex-row align-items-center cursor-pointer no-outline"
            onClick={() => handleClick(1)}
            role="button"
            onKeyDown={() => null}
            tabIndex={0}
          >
            <Icon
              name={`caret ${activeIndex !== 1 ? 'right' : 'down'}`}
            />
            <span>
              {global.translate('Security questions', 1699)}
            </span>
          </div>
          <Icon
            name="pencil alternate"
            className="cursor-pointer"
            onClick={() => setOpen(true)}
          />
        </li>
        {activeIndex === 1 && (
          <SecurityQuestion securityQuestions={securityQuestions} />
        )}
        <li
          className="security-dropdown align-items-center cursor-pointer"
          onClick={() => handleClick(2)}
          role="button"
          onKeyDown={() => null}
        >
          <Icon
            name={`caret ${activeIndex !== 2 ? 'right' : 'down'}`}
          />
          <span>{global.translate('Change my password', 1698)}</span>
        </li>
        {activeIndex === 2 && <ChangePassword />}
        <li
          className="security-dropdown align-items-center cursor-pointer"
          onClick={() => handleClick(3)}
          role="button"
          onKeyDown={() => null}
        >
          <Icon
            name={`caret ${activeIndex !== 3 ? 'right' : 'down'}`}
          />
          <span>
            {global.translate('Change my PIN number', 1697)}
          </span>
        </li>
        {activeIndex === 3 && <ChangePIN changePIN={changePIN} />}
        <li
          className="security-dropdown align-items-center cursor-pointer"
          onClick={() => handleClick(4)}
          role="button"
          onKeyDown={() => null}
        >
          <Icon
            name={`caret ${activeIndex !== 4 ? 'right' : 'down'}`}
          />
          <span>{`${global.translate(
            'Your date of birth',
            442,
          )} ${global.translate('and', 41)} ${global.translate(
            'gender',
            1346,
          )}`}</span>
        </li>
        {activeIndex === 4 && (
          <div className="flex dob-gender">
            <ChangeDOB changeDOB={changeDOB} />
            <ChangeGender changeGender={changeGender} />
          </div>
        )}
      </ul>
    </div>
  );
};

Security.propTypes = {
  securityQuestions: PropTypes.instanceOf(Object),
  changeGender: PropTypes.instanceOf(Object),
  changePIN: PropTypes.instanceOf(Object),
  changeDOB: PropTypes.instanceOf(Object),
  target: PropTypes.string,
};

Security.defaultProps = {
  securityQuestions: {},
  changeGender: {},
  changePIN: {},
  changeDOB: {},
  target: null,
};

export default Security;
