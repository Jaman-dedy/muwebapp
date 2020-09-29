import React from 'react';
import { Form, Icon } from 'semantic-ui-react';
import { DateInput } from 'semantic-ui-calendar-react';
import PropTypes from 'prop-types';
import './ChangeDOB.scss';

import Message from 'components/common/Message';

const ChangeDOB = ({ changeDOB }) => {
  const {
    DateOfBirth,
    maxDate,
    initialDate,
    handleInputChange,
    handleSubmit,
    error,
    disabled,
    updateDOB,
  } = changeDOB;

  const onDateInputClicked = () => {
    document.querySelector('input[name="dob"]').click();
  };

  return (
    <Form className="change-dob-container large-padding border-1 b-light-grey border-radius-4 medium-v-margin xlarge-h-margin">
      <Form.Field className="calendar_input no-margin">
        <span className="calendar_caret">
          <Icon name="caret down" />
        </span>
        <DateInput
          name="dob"
          placeholder="YYYY-MM-DD"
          value={DateOfBirth}
          iconPosition="left"
          onChange={handleInputChange}
          popupPosition="top right"
          animation="fade"
          dateFormat="YYYY-MM-DD"
          closable
          error={error || false}
          maxDate={maxDate}
          initialDate={initialDate}
          localization={localStorage.language || 'en'}
        />
      </Form.Field>
      {updateDOB.error && (
        <Message error message={updateDOB.error.Description} />
      )}

      <Form.Button
        className="no-margin"
        type="button"
        loading={updateDOB.loading}
        secondary
          color="gray"
        onClick={() => {
          if (disabled) onDateInputClicked();
          else if (!updateDOB.loading) handleSubmit();
        }}
      >
        {disabled
          ? global.translate('Edit', 820)
          : global.translate(`Save`, 614)}
      </Form.Button>
    </Form>
  );
};

ChangeDOB.propTypes = {
  changeDOB: PropTypes.instanceOf(Object),
};
ChangeDOB.defaultProps = {
  changeDOB: {},
};

export default ChangeDOB;
