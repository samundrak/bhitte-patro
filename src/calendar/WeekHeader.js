import React, { Component, Fragment } from 'react';
import Proptypes from 'prop-types';
import { Row, Col } from 'antd';
import calendar from '../data/calendar';

const { week } = calendar;
class Week extends Component {
  static TOTAL_DAYS = 7;
  render() {
    return (
      <Row>
        {week.np[this.props.short ? 'short' : 'long'].map((weekDay) => (
          <Col
            span={3}
            style={{
              borderWidth: '3px',
              height: '50px',
              margin: '0px',
              textAlign: 'center',
              borderStyle: 'solid',
              borderColor: '#e8e8e8',
              lineHeight: '50px',
            }}
          >
            {weekDay}
          </Col>
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
