import React from 'react';
import chunk from 'lodash.chunk';
import PropTypes from 'prop-types';
import adbs from 'ad-bs-converter';
import { Row, Col } from 'antd';
import WeekHeader from './WeekHeader';
import Week from './Week';

class Month extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      weeks: [],
      totalDays: 30,
    };
  }
  createBeautifullWeeks(weekStart, totalDays) {
    const cursor = this.props.cursor;
    const adMonths = new Set();
    let adYear = 0;
    const days = Array(weekStart)
      .fill({ isDay: false })
      .concat(
        Array(totalDays)
          .fill(true)
          .map((item, index) => {
            const ad = adbs.bs2ad(
              `${cursor.year}/${cursor.month}/${index + 1}`
            );
            if (!adYear) {
              adYear = ad.year;
            }
            adMonths.add(ad.strMonth);
            return {
              isDay: true,
              number: index + 1,
              month: this.props.index,
              ad,
            };
          })
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
    return { weeks, adMonths, adYear };
  }
  getStyle() {
    if (this.props.singleView) {
      return {
        // marginTop: '50px',
      };
    }
    return {
      margin: '10px',
    };
  }

  render() {
    return (
      <Row
        style={this.getStyle()}
        className={`animated lessAnimation ${
          this.props.singleView ? this.props.flipAnimation : ''
        }`}
      >
        {!this.props.singleView && (
          <Row>
            <Col span={8} />
            <Col span={8}>{this.props.name}</Col>
            <Col span={8} />
          </Row>
        )}
        <WeekHeader singleView={this.props.singleView} />
        <Row>
          {this.state.weeks.map((week, index) => (
            <Week
              month={this.props.index}
              today={this.props.today}
              cursor={this.props.cursor}
              handleDayClick={this.props.handleDayClick}
              singleView={this.props.singleView}
              data={week}
              count={index}
              key={index}
            />
          ))}
        </Row>
      </Row>
    );
  }
  componentDidMount() {
    const { weeks, adMonths, adYear } = this.createBeautifullWeeks(
      this.props.weekStart,
      this.props.totalDays
    );
    if (this.props.singleView) {
      this.props.updateAdMonths(adYear, adMonths);
    }
    this.setState({
      weeks,
    });
  }
}

Month.defaultProps = {
  singleView: false,
  handleDayClick: () => null,
  updateAdMonths: () => null,
};
Month.propTypes = {
  updateAdMonths: PropTypes.func,
  flipAnimation: PropTypes.string,
  index: PropTypes.number.isRequired,
  today: PropTypes.shape({
    year: PropTypes.number.isRequired,
    month: PropTypes.number.isRequired,
    day: PropTypes.number.isRequired,
  }).isRequired,
  handleDayClick: PropTypes.func,
  singleView: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  totalDays: PropTypes.number.isRequired,
  weekStart: PropTypes.number.isRequired,
  cursor: PropTypes.shape({
    year: PropTypes.number.isRequired,
    month: PropTypes.number.isRequired,
    day: PropTypes.number.isRequired,
  }).isRequired,
};
export default Month;
