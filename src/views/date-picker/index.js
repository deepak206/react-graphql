/* eslint-disable */
import React, { useEffect, useState, useRef } from 'react';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import { formatDate, parseDate } from 'react-day-picker/moment';
import { Grid } from '@material-ui/core';
import { object, string, func } from 'prop-types';
import 'react-day-picker/lib/style.css';
import './date-picker.scss';
import Error from '../error';
import fieldValidation from '../../utils/validate';

const currentYear = new Date().getFullYear();
const fromMonth = new Date();
const toMonth = new Date(currentYear + 20, 11);

const DatePicker = ({
  name, disabledDates, fieldAttributes, label, validate, validateOptions, validationCallback,
}) => {

  const [errors, setError] = useState({});

  const [selectedmonth, setMonth] = useState(fromMonth);

  const { value } = fieldAttributes;

  const { [name]: error = '' } = errors;

  const YearMonthForm = ({ date, localeUtils, onChange }) => {
    const months = localeUtils.getMonths();

    const years = [];

    for (let i = fromMonth.getFullYear(); i <= toMonth.getFullYear(); i += 1) {
      years.push(i);
    }

    const handleChange = function handleChange(e) {
      const { year } = e.target.form;

      const month = date.getMonth();

      onChange(new Date(year.value, month));
    };

    return (
      <div className="DayPicker-Caption">
        <div className="DayPicker-Caption__year-selector">
          <h4 className="DayPicker-Caption__month-name">{months[date.getMonth()]}</h4>
          <select className="DayPicker-Caption__Year" name="year" onChange={handleChange} value={date.getFullYear()}>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>
    );
  };

  const handleErrors = (errorMsg, isVisible) => {
    const err = { [name]: errorMsg };

    if (isVisible) {
      setError({ ...err });
    }
    validationCallback(!!errorMsg);
  };

  const validateFields = (isVisible) => {
    const {
      check, required, reg, regMsg,
    } = validateOptions;

    if (!check) {
      return;
    }

    if (required) {
      const errorMsg = fieldValidation.required(value, label);

      if (errorMsg) {
        handleErrors(errorMsg, isVisible);

        return;
      }
    }

    if (reg) {
      const errorMsg = fieldValidation.reg(reg, value, regMsg);

      if (errorMsg) {
        handleErrors(errorMsg, isVisible);

        return;
      }
    }

    handleErrors('', isVisible);
  };

  // componentDidupdate
  useEffect(() => {
    if (validate) {
      validateFields(true);
    }
  });

  const UseFocus = () => {
    const htmlElRef = useRef(null);
    const setFocus = () => {
      // eslint-disable-next-line
      htmlElRef.current && htmlElRef.current.showDayPicker();
    };

    return [setFocus, htmlElRef];
  };

  const handleYearMonthChange = (month) => {
    setMonth(month);
  };

  const [handleClickShow, datePickerRef] = UseFocus();

  return (
    <Grid className={`input-box day-picker__calender ${!!error && 'day-picker__input-box--error'}`}>
    {!!label && <label className= "input-box__label"> {label}</label>}
      <DayPickerInput
        name={ name }
        formatDate={ formatDate }
        parseDate={ parseDate }
        placeholder="DD/MM/YYYY"
        parseDate={ parseDate }
        format="DD/MM/YYYY"
        ref={ datePickerRef }
        inputProps={ { readOnly: true, class: `day-picker__input ${!!error && 'day-picker__input--error'}`  } }
        // for validate on key up
        onDayPickerHide={ () => validateFields(false) }
        { ...fieldAttributes }
        dayPickerProps={ {
          captionElement: ({ date, localeUtils }) => <YearMonthForm date={ date } localeUtils={ localeUtils } onChange={ handleYearMonthChange } />,
          fromMonth,
          modifiers: {
            disabled: [
              {
                before: new Date(disabledDates),
              },
            ],
          },
          month: new Date(selectedmonth),
          toMonth,
        } }
      />
      <div className="day-picker__icon-calendar">
        <img className="calendar_icon"
          src={ require('../../assets/images/icon-calender.svg') }
          alt="img"
          onClick={ () => {
            handleClickShow();
          } }
        />
      </div>
      {!!error && <Error errorMessage={ error } />}
    </Grid>
  );
};

DatePicker.propTypes = {
  disabledDates: object,
  fieldAttributes: object,
  label: string.isRequired,
  name: string.isRequired,
  validationCallback: func.isRequired,
};

DatePicker.defaultProps = {
  disabledDates: new Date(),
  fieldAttributes: {},
  validateOptions: {
    check: false,
  },
};

export default DatePicker;
