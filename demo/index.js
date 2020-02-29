import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import DatePicker from 'react-datepicker';
const App = () => {
  const [calendarDate, setCalendarDate] = useState(new Date());
  return (
    <>
      <h1>DatePicker</h1>
      <DatePicker />
      <h1>Calendar</h1>
      <div>
        {DatePicker.Utils.formatDate(calendarDate, {
          format: 'Selected: YYYY/MM/DD',
        })}
      </div>
      <DatePicker.Calendar
        date={calendarDate}
        onSelect={(d) => setCalendarDate(d)}
      />
    </>
  );
};
ReactDOM.render(<App />, document.getElementById('app'));
