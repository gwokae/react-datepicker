import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import classnames from 'classnames';

import {
  getCalendar,
  equalsDate,
  formatDate,
  getDate,
  DAY,
  CALENDAR_DEFAULT_OPTIONS,
} from './utils/date';
const CELL_SIZE = '36px';

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 260px;
  border: 1px solid #eee;
  padding: 0.5em;
  justify-content: flex-start;
  align-items: center;
`;

const FlexItem = styled.div`
  font-family: sans-serif;
  text-align: center;
  height: 1.5em;
  margin: 0.3em 0;
  flex: 0 1 auto;

  &.selected {
    background: #db3d44;
    color: white;
    font-weight: bold;
  }
  &.invalid {
    color: #eee;
  }
`;
const Navigation = styled(FlexItem)`
  flex-basis: calc(10% - 0.5em);
  text-align: center;
`;
const MainButton = styled(FlexItem)`
  flex-basis: 80%;
  text-align: center;
`;
const SevenCellsRowItem = styled(FlexItem)`
  flex-basis: ${CELL_SIZE};
  height: ${CELL_SIZE};
  line-height: ${CELL_SIZE};
`;

const DateItem = styled(SevenCellsRowItem)`
  border-radius: 100%;
  cursor: pointer;
`;

const DayOfWeekItem = styled(SevenCellsRowItem)`
  font-weight: bold;
`;

const FourCellsRowItem = styled(FlexItem)`
  flex-basis: ${100 / 4}%;
`;

const Calendar = (props) => {
  const {
    date = new Date(),
    onSelect,
    options = CALENDAR_DEFAULT_OPTIONS,
  } = props;
  const [mode, setMode] = useState(date.getFullYear());
  const [[currYear, currMonth], setCurr] = useState([
    date.getFullYear(),
    date.getMonth(),
  ]);

  let dayOfWeek = [];
  for (let i = 0; i < 7; i++) {
    dayOfWeek.push(DAY[(options.startDay + i) % DAY.length]);
  }
  return (
    <Container>
      <Navigation>&lt;</Navigation>
      <MainButton>
        {formatDate(getDate(currYear, currMonth), { format: 'MMM YYYY' })}
      </MainButton>
      <Navigation>&gt;</Navigation>
      {dayOfWeek.map((dow) => (
        <DayOfWeekItem key={dow.full}>{dow.sShort}</DayOfWeekItem>
      ))}
      {getCalendar(currYear, currMonth, options).map((d) => (
        <DateItem
          key={d.toISOString()}
          className={classnames({
            selected: equalsDate(d, date),
            invalid: d.getMonth() !== currMonth,
          })}
          onClick={() => {
            if (d.getMonth() === currMonth) {
              onSelect(d);
            } else {
              setCurr([d.getFullYear(), d.getMonth()]);
            }
          }}
        >
          {d.getDate()}
        </DateItem>
      ))}
    </Container>
  );
};

Calendar.propTypes = {
  date: PropTypes.instanceOf(Date),
  options: PropTypes.object,
  onSelect: PropTypes.func,
};
export default Calendar;
