import React, { useState } from 'react';
import { Form, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import './ChangeDOB.scss';

import Message from 'components/common/Message';

const ChangeGender = ({ changeGender }) => {
  const {
    Gender,
    handleInputChange,
    handleSubmit,
    options = [],
    error,
    disabled,
    updateGender,
  } = changeGender;

  const [open, setOpen] = useState(false);

  return (
    <Form className="change-dob-container large-padding border-1 b-light-grey border-radius-4 large-v-margin xlarge-h-margin">
      <Form.Field className="gender_input no-margin">
        <span className="calendar_caret">
          <Icon name="caret down" />
        </span>
        <Form.Select
          className="gender_input_select"
          name="Currency"
          value={Gender && Gender.Number}
          error={error || false}
          onClick={() => setOpen(!open)}
          onChange={(_, { value }) => {
            setOpen(false);
            handleInputChange(_, { value });
          }}
          open={open}
          options={options}
        />
      </Form.Field>
      {updateGender.error && (
        <Message error message={updateGender.error.Description} />
      )}

      <Form.Button
        className="no-margin"
        type="button"
        loading={updateGender.loading}
        secondary
          color="gray"
        onClick={() => {
          if (disabled) setOpen(true);
          else if (!updateGender.loading) handleSubmit();
        }}
      >
        {disabled
          ? global.translate(`Edit`, 820)
          : global.translate(`Save`, 614)}
      </Form.Button>
    </Form>
  );
};

ChangeGender.propTypes = {
  changeGender: PropTypes.instanceOf(Object),
};
ChangeGender.defaultProps = {
  changeGender: {},
};

export default ChangeGender;
