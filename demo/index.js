import React from 'react';
import ReactDOM from 'react-dom';
import DatePicker from 'react-datepicker';

ReactDOM.render(
  <>
    <h1>DatePicker</h1>
    <DatePicker />
    <h1>Calendar</h1>
    <DatePicker.Calendar />
  </>,
  document.getElementById('app'),
);
