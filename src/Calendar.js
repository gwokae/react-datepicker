import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { getCalendar } from './utils/date';
const Container = styled.div`
  display: flex;
`;
const Calendar = () => {
  // const { date = new Date() } = props;
  return <Container>Hello{getCalendar(2020, 1)}</Container>;
};

Calendar.propTypes = {
  date: PropTypes.instanceOf(Date),
};
export default Calendar;
