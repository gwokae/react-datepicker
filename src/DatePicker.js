import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Calendar from './Calendar';
import * as Utils from './utils/date';

const Container = styled.div`
  position: relative;
  .calendar {
    position: absolute;
    background: white;
  }
  input.invalid {
    background-color: #db3d44;
    color: white;
  }
`;

const isEventTriggerInElement = (container, target, root) => {
  if (container === target) return true;
  if (target !== root && target.parentElement !== null)
    return isEventTriggerInElement(container, target.parentElement, root);
  return false;
};
const DatePicker = (props) => {
  const { date = new Date(), onSelect } = props;
  const options = {
    ...Utils.CALENDAR_DEFAULT_OPTIONS,
    ...props.options,
    date,
  };
  const [isActive, setActive] = useState(false);
  const [isInvalidInput, setInvalidInput] = useState(false);
  const [dateText, setDateText] = useState(
    Utils.formatDate(options.date, options),
  );
  // const handleRootClose = () => setActive(false);
  const containerRef = useRef();

  // root close
  const updateActiveState = (e) => {
    if (
      !isEventTriggerInElement(containerRef.current, e.target, e.currentTarget)
    ) {
      setActive(false);
    }
  };
  useEffect(() => {
    document.body.addEventListener('mousedown', updateActiveState);
    return () => {
      document.body.removeEventListener('mousedown', updateActiveState);
    };
  }, []);

  return (
    <Container ref={containerRef}>
      <input
        type='text'
        onFocus={() => setActive(true)}
        value={dateText}
        className={isInvalidInput ? 'invalid' : null}
        onChange={({ target: { value } }) => {
          const date = Utils.parseDateString(value, options);
          setDateText(value);
          if (date) {
            onSelect(date);
            setInvalidInput(false);
          } else {
            setInvalidInput(true);
          }
        }}
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            setDateText(Utils.formatDate(options.date, options));
            setActive(false);
            setInvalidInput(false);
            e.target.blur();
          }
        }}
      />
      {isActive ? (
        <div className='calendar'>
          <Calendar
            {...options}
            onSelect={(date) => {
              setDateText(Utils.formatDate(date, options));
              onSelect(date);
              setActive(false);
              setInvalidInput(false);
            }}
          />
        </div>
      ) : null}
    </Container>
  );
};
DatePicker.propTypes = {
  date: PropTypes.instanceOf(Date),
  options: PropTypes.object,
  onSelect: PropTypes.func,
};
DatePicker.Calendar = Calendar;
DatePicker.Utils = Utils;
export default DatePicker;
