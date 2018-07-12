import React, { Component } from 'react';
import { Row } from 'antd';
import PropTypes from 'prop-types';
import Day from './Day';

class Week extends Component {
  static DAYS_COUNT = Array(7).fill(true);
  render() {
    return (
      <Row>
        {this.props.data.map((day, index) => <Day day={day} index={index} />)}
      </Row>
    );
  }
}
Week.defaultProps = {
  data: [],
};
Week.propTypes = {
  data: PropTypes.array.isRequired,
};
export default Week;
