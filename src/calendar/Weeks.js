import React from 'react';
import PropTypes from 'prop-types';
import { Row } from 'antd';
import chunk from 'lodash.chunk';
import Week from './Week';

class Weeks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      weeks: [],
      totalDays: 30,
    };
  }
  createBeautifullMonth(weekStart, totalDays) {
    const days = Array(weekStart)
      .fill({ isDay: false })
      .concat(
        Array(totalDays)
          .fill(true)
          .map((item, index) => ({ isDay: true, number: index + 1 }))
      );
    const weeks = chunk(days, 7);
    const lastWeek = weeks[weeks.length - 1];
    const daysLeft = weeks.length * 7 - days.length;
    if (daysLeft > 0) {
      lastWeek.push(
        ...Array(daysLeft)
          .fill(true)
          .map((item, index) => ({ isDay: false }))
      );
    }
    return weeks;
  }
  componentDidMount() {
    this.setState({
      weeks: this.createBeautifullMonth(
        this.props.weekStart,
        this.props.totalDays
      ),
    });
  }
  render() {
    return (
      <Row>
        {this.state.weeks.map((week, index) => (
          <Week data={week} count={index} />
        ))}
      </Row>
    );
  }
}

Weeks.propTypes = {
  totalDays: PropTypes.number.isRequired,
  weekStart: PropTypes.number.isRequired,
};
export default Weeks;
