import React, { Component } from 'react';
import { Row } from 'antd';
import Day from './Day';

class Week extends Component {
  static DAYS_COUNT = Array(7).fill(true);
  render() {
    return (
      <Row>
        {Week.DAYS_COUNT.map((item, index) => {
          return <Day day={index} />;
        })}
      </Row>
    );
  }
}
export default Week;
