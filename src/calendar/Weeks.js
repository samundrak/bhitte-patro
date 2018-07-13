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
  createBeautifullWeeks(weekStart, totalDays) {
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
    if (!this.props.singleView) {
      if (weeks.length < 6) {
        weeks.push(
          Array(7)
            .fill(true)
            .map((item, index) => ({ isDay: false }))
        );
      }
    }
    return weeks;
  }
  componentDidMount() {
    this.setState({
      weeks: this.createBeautifullWeeks(
        this.props.weekStart,
        this.props.totalDays
      ),
    });
  }
  render() {
    return (
      <Row>
        {this.state.weeks.map((week, index) => (
          <Week
            singleView={this.props.singleView}
            data={week}
            count={index}
            key={index}
          />
        ))}
      </Row>
    );
  }
}

Weeks.propTypes = {
  totalDays: PropTypes.number.isRequired,
  weekStart: PropTypes.number.isRequired,
  singleView: PropTypes.bool.isRequired,
};
export default Weeks;
