import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import DatePicker from 'react-datepicker';
const App = () => {
  const [calendarDate, setCalendarDate] = useState(new Date());
  const [calendarDate1, setCalendarDate1] = useState(new Date());
  return (
    <>
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
      <h2>Week starts from Monday</h2>
      <div>
        by giving options<pre>options=&#123;startDay: 1&#125;</pre>
        {DatePicker.Utils.formatDate(calendarDate1, {
          format: 'Selected: YYYY/MM/DD',
        })}
      </div>
      <DatePicker.Calendar
        date={calendarDate1}
        onSelect={(d) => setCalendarDate1(d)}
        options={{ startDay: 1 }}
      />
      <h1>DatePicker</h1>
      <DatePicker />
      <h1>Author</h1>
      <a href='mailto:gwokae@gmail.com'>Leonard Lin</a>
    </>
  );
};
ReactDOM.render(<App />, document.getElementById('app'));
