import React, { Component } from 'react';
import { Row } from 'antd';
import PropTypes from 'prop-types';
import Day from './Day';

class Week extends Component {
  static DAYS_COUNT = Array(7).fill(true);

  render() {
    return (
      <Row style={{}}>
        {this.props.data.map((day, index) => (
          <Day
            style={this.props.dayStyle}
            month={this.props.month}
            cursor={this.props.cursor}
            today={this.props.today}
            handleDayClick={this.props.handleDayClick}
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
  dayStyle: {},
};
Week.propTypes = {
  dayStyle: PropTypes.object,
  today: PropTypes.shape({
    year: PropTypes.number.isRequired,
    month: PropTypes.number.isRequired,
    day: PropTypes.number.isRequired,
  }),
  month: PropTypes.number.isRequired,
  handleDayClick: PropTypes.func.isRequired,
  data: PropTypes.array.isRequired,
  singleView: PropTypes.bool.isRequired,
  cursor: PropTypes.shape({
    year: PropTypes.number.isRequired,
    month: PropTypes.number.isRequired,
    day: PropTypes.number.isRequired,
  }).isRequired,
};
export default Week;
