/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import PropTypes from 'prop-types';
import { Dropdown, Image, Button } from 'semantic-ui-react';
import CalendarArrow from 'assets/images/transactions/calendar-arrow.svg';
import './style.scss';

const DatePickerSelect = ({ form, setForm, getTransactions }) => {
  const [startDate, setStartDate] = useState(
    new Date(form?.fromDate),
  );
  const [endDate, setEndDate] = useState(new Date(form?.toDate));

  useEffect(() => {
    setForm({
      ...form,
      fromDate: moment(startDate).format('YYYY-MM-DD'),
    });
  }, [startDate]);
  useEffect(() => {
    setForm({
      ...form,
      toDate: moment(endDate).format('YYYY-MM-DD'),
    });
  }, [endDate]);
  return (
    <div>
      <Dropdown
        text={
          <>
            <span>{moment(form?.fromDate).format('ll')}</span>
            <Image src={CalendarArrow} className="arrow-btwn-date" />
            <span>{moment(form?.toDate).format('ll')}</span>
          </>
        }
        pointing
        closeOnEscape
        className="custom-dropdown-box"
      >
        <Dropdown.Menu>
          <div className="date-picker-box">
            <div
              className="date-select"
              onClick={e => e.stopPropagation()}
            >
              <DatePicker
                selected={startDate}
                onChange={date => setStartDate(date)}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                inline
              />
              <DatePicker
                selected={endDate}
                onChange={date => setEndDate(date)}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={startDate}
                inline
              />
            </div>
            <div className="date-picker-button-action">
              <Button onClick={e => e.preventDefault()}>
                {' '}
                {global.translate('Cancel')}{' '}
              </Button>
              <Button onClick={getTransactions}>
                {' '}
                {global.translate('Apply ')}
              </Button>
            </div>
          </div>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

DatePickerSelect.propTypes = {
  form: PropTypes.objectOf(PropTypes.any),
  setForm: PropTypes.func,
  getTransactions: PropTypes.func,
};
DatePickerSelect.defaultProps = {
  form: {},
  setForm: () => {},
  getTransactions: () => {},
};

export default DatePickerSelect;
