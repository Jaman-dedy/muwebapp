import React from 'react';
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
  //   venus mars
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
          onChange={handleInputChange}
          defaultValue={Gender && Gender.Number}
          options={options}
        />
      </Form.Field>
      {updateGender.error && (
        <Message error message={updateGender.error.Description} />
      )}

      <Form.Button
        className="no-margin"
        type="button"
        disabled={disabled}
        loading={updateGender.loading}
        primary
        onClick={() => !updateGender.loading && handleSubmit()}
      >
        {global.translate('Save')}
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
