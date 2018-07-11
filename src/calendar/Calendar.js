import React from 'react';
import Month from './Month';
import 'antd/dist/antd.css';

class Calendar extends React.Component {
  render() {
    return (
      <div>
        <Month short />
      </div>
    );
  }
}
export default Calendar;
