import React, { Component } from 'react';
import { Row } from 'antd';
import PropTypes from 'prop-types';
import Day from './Day';

class Week extends Component {
  static DAYS_COUNT = Array(7).fill(true);
  render() {
    return (
      <Row
        style={{
          borderBottom: this.props.singleView && '#e0e0e0 1px solid',
        }}
      >
        {this.props.data.map((day, index) => (
          <Day
            singleView={this.props.singleView}
            key={index}
            day={day}
            index={index}
          />
        ))}
      </Row>
    );
  }
}
Week.defaultProps = {
  data: [],
  singleView: false,
};
Week.propTypes = {
  data: PropTypes.array.isRequired,
  singleView: PropTypes.bool.isRequired,
};
export default Week;
