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
    onSelect,
  };
  const [isActive, setActive] = useState(false);
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
      <input type='text' onFocus={() => setActive(true)} />
      {isActive ? (
        <div className='calendar'>
          <Calendar {...options} />
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
