import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import classnames from 'classnames';

import {
  getCalendar,
  equalsDate,
  formatDate,
  getDate,
  MONTH,
  DAY,
  CALENDAR_DEFAULT_OPTIONS,
} from './utils/date';
const CELL_SIZE = '36px';
const CELL_SIZE_L = '56px';

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

  &.clickable {
    cursor: pointer;
    &:hover {
      background: #eee;
    }
  }
  &.selected {
    background: #db3d44;
    color: white;
    font-weight: bold;
    &.clickable:hover {
      background: #db3d44;
    }
  }
  &.invalid {
    color: #eee;
    &.clickable:hover {
      color: white;
    }
  }
`;
const Navigation = styled(FlexItem)`
  flex-basis: calc(10% - 0.5em);
  text-align: center;
  height: 1.6em;
  line-height: 1.6em;
  border-radius: 0.4em;
`;
const MainButton = styled(FlexItem)`
  flex-basis: 80%;
  text-align: center;
  height: 1.6em;
  line-height: 1.6em;
  border-radius: 0.4em;
`;
const SevenCellsRowItem = styled(FlexItem)`
  flex-basis: ${CELL_SIZE};
  height: ${CELL_SIZE};
  line-height: ${CELL_SIZE};
`;

const DateItem = styled(SevenCellsRowItem)`
  border-radius: 100%;
`;

const DayOfWeekItem = styled(SevenCellsRowItem)`
  font-weight: bold;
`;
const FourCellsRowItem = styled(FlexItem)`
  flex-basis: ${CELL_SIZE_L};
  height: ${CELL_SIZE_L};
  line-height: ${CELL_SIZE_L};
  border-radius: 100%;
`;

const SelectDate = (props) => {
  const {
    selectedDate,
    currYear,
    currMonth,
    options,
    setState,
    onSelect,
  } = props;
  let dayOfWeek = [];
  for (let i = 0; i < 7; i++) {
    dayOfWeek.push(DAY[(options.startDay + i) % DAY.length]);
  }
  return (
    <>
      {dayOfWeek.map((dow) => (
        <DayOfWeekItem key={dow.full}>{dow.sShort}</DayOfWeekItem>
      ))}
      {getCalendar(currYear, currMonth, options).map((d) => (
        <DateItem
          key={d.toISOString()}
          className={classnames({
            clickable: true,
            selected: equalsDate(d, selectedDate),
            invalid: d.getMonth() !== currMonth,
          })}
          onClick={() => {
            if (d.getMonth() === currMonth) {
              onSelect(d);
            } else {
              setState([d.getFullYear(), d.getMonth(), 'date']);
            }
          }}
        >
          {d.getDate()}
        </DateItem>
      ))}
    </>
  );
};
SelectDate.propTypes = {
  selectedDate: PropTypes.instanceOf(Date),
  currYear: PropTypes.number,
  currMonth: PropTypes.number,
  options: PropTypes.object,
  setState: PropTypes.func,
  onSelect: PropTypes.func,
};

const SelectMonth = (props) => {
  const { selectedDate, currYear, currMonth, setState } = props;
  return (
    <>
      {MONTH.map((month, monthId) => (
        <FourCellsRowItem
          key={monthId}
          className={classnames({
            clickable: true,
            selected:
              selectedDate.getFullYear() === currYear && currMonth === monthId,
          })}
          onClick={() => setState([currYear, monthId, 'date'])}
        >
          {month.short}
        </FourCellsRowItem>
      ))}
    </>
  );
};
SelectMonth.propTypes = {
  selectedDate: PropTypes.date,
  currYear: PropTypes.number,
  currMonth: PropTypes.number,
  setState: PropTypes.func,
};
const getYearRange = (currYear, size = 12) => {
  const result = [];
  for (let i = 0; i < size; i++) {
    result.unshift(currYear + (size / 2 - i));
  }
  return result;
};
const SelectYear = (props) => {
  const { selectedDate, currMonth, setState, yearList } = props;
  return (
    <>
      {yearList.map((year) => (
        <FourCellsRowItem
          key={year}
          className={classnames({
            clickable: true,
            selected: selectedDate.getFullYear() === year,
          })}
          onClick={() => setState([year, currMonth, 'month'])}
        >
          {year}
        </FourCellsRowItem>
      ))}
    </>
  );
};
SelectYear.propTypes = {
  selectedDate: PropTypes.instanceOf(Date),
  currMonth: PropTypes.number,
  setState: PropTypes.func,
  yearList: PropTypes.array,
};

const Calendar = (props) => {
  const { date = new Date(), onSelect, syncCalendar } = props;
  const [[currYear, currMonth, mode], setState] = useState([
    date.getFullYear(),
    date.getMonth(),
    'date',
  ]);

  if (
    syncCalendar &&
    (currYear !== date.getFullYear() || currMonth !== date.getMonth())
  ) {
    setState([date.getFullYear(), date.getMonth(), mode]);
  }
  const options = { ...CALENDAR_DEFAULT_OPTIONS, ...props.options };
  const yearList = getYearRange(currYear);

  const clickPrev = () => {
    if (mode === 'date') {
      setState([
        currMonth === 0 ? currYear - 1 : currYear,
        currMonth === 0 ? 11 : currMonth - 1,
        mode,
      ]);
    } else if (mode === 'month') {
      setState([currYear - 1, currMonth, mode]);
    } else {
      setState([currYear - 12, currMonth, mode]);
    }
  };
  const clickNext = () => {
    if (mode === 'date') {
      setState([
        currMonth === 11 ? currYear + 1 : currYear,
        currMonth === 11 ? 0 : currMonth + 1,
        mode,
      ]);
    } else if (mode === 'month') {
      setState([currYear + 1, currMonth, mode]);
    } else {
      setState([currYear + 12, currMonth, mode]);
    }
  };
  const clickMain = () => {
    const newCurr = [currYear, currMonth];
    if (mode === 'date') {
      newCurr.push('month');
    } else if (mode === 'month') {
      newCurr.push('year');
    } else {
      newCurr.push('date');
    }
    setState(newCurr);
  };
  const MainText = () => {
    if (mode === 'date') {
      return formatDate(getDate(currYear, currMonth), { format: 'MMM YYYY' });
    } else if (mode === 'month') {
      return currYear;
    } else {
      return `${yearList[0]}-${yearList[yearList.length - 1]}`;
    }
  };
  return (
    <Container>
      <Navigation className='clickable' onClick={clickPrev}>
        &lt;
      </Navigation>
      <MainButton className='clickable' onClick={clickMain}>
        {MainText()}
      </MainButton>
      <Navigation className='clickable' onClick={clickNext}>
        &gt;
      </Navigation>
      {mode === 'date' ? (
        <SelectDate
          selectedDate={date}
          currYear={currYear}
          currMonth={currMonth}
          options={options}
          setState={setState}
          onSelect={onSelect}
        />
      ) : null}
      {mode === 'month' ? (
        <SelectMonth
          selectedDate={date}
          currYear={currYear}
          currMonth={currMonth}
          setState={setState}
        />
      ) : null}
      {mode === 'year' ? (
        <SelectYear
          selectedDate={date}
          currYear={currYear}
          currMonth={currMonth}
          setState={setState}
          yearList={yearList}
        />
      ) : null}
    </Container>
  );
};

Calendar.propTypes = {
  date: PropTypes.instanceOf(Date),
  options: PropTypes.object,
  onSelect: PropTypes.func,
  syncCalendar: PropTypes.bool,
};
export default Calendar;
