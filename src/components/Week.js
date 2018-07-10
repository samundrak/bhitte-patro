import React, { Component, Fragment } from 'react';
import Proptypes from 'prop-types';
import { Row, Col } from 'antd';

class Week extends Component {
  static WEEK_NAMES = {
    SHORT: ['आईत', 'सोम', 'मंगल', 'बुध', 'बिही', 'शुक्', 'शनि'],
    LONG: [
      'आईतवार',
      'सोमवार',
      'मंगलवार',
      'बुधवार',
      'बिहीवार',
      'शुक्रवार',
      'शनिवार',
    ],
  };
  static TOTAL_DAYS = 7;
  render() {
    return (
      <Row>
        {Week.WEEK_NAMES[this.props.short ? 'SHORT' : 'LONG'].map((weekDay) => (
          <Col span={3}>{weekDay}</Col>
        ))}
      </Row>
    );
  }
}

Week.defaultProps = {
  short: false,
};
Week.propTypes = {
  short: Proptypes.bool.isRequired,
};
export default Week;
