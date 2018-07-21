import React from 'react';
import chunk from 'lodash.chunk';
import PropTypes from 'prop-types';
import adbs from 'ad-bs-converter';
import { Row, Col } from 'antd';
import WeekHeader from '../weekHeader';
import Week from '../week';

class Month extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      weeks: [],
      dayStyle: {},
    };
    this.monthViewRef = React.createRef();
  }

  createBeautifullWeeks(weekStart, totalDays) {
    const { cursor, events } = this.props;
    const adMonths = new Set();
    const adYears = new Set();
    const days = Array(weekStart)
      .fill({ isDay: false })
      .concat(
        Array(totalDays)
          .fill(true)
          .map((item, index) => {
            const ad = adbs.bs2ad(
              `${cursor.year}/${cursor.month}/${index + 1}`
            );

            adYears.add(ad.year);
            adMonths.add(ad.strMonth);

            return {
              isDay: true,
              number: index + 1,
              month: this.props.index,
              ad,
              events: events.days[index],
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
    return { weeks, adMonths, adYears };
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
    const {
      singleView,
      flipAnimation,
      name,
      today,
      cursor,
      handleDayClick,
      index: monthIndex,
    } = this.props;
    const { dayStyle, weeks } = this.state;
    return (
      <div ref={this.monthViewRef}>
        <Row
          style={this.getStyle()}
          className={`animated lessAnimation calendar ${
            singleView ? flipAnimation : ''
          }`}
        >
          {!singleView && (
            <Row>
              <Col span={8} />
              <Col span={8}>{name}</Col>
              <Col span={8} />
            </Row>
          )}
          <WeekHeader singleView={singleView} />
          <Row>
            {weeks.map((week, index) => (
              <Week
                dayStyle={dayStyle}
                month={monthIndex}
                today={today}
                cursor={cursor}
                handleDayClick={handleDayClick}
                singleView={singleView}
                data={week}
                count={index}
                key={index}
              />
            ))}
          </Row>
        </Row>
      </div>
    );
  }

  componentDidMount() {
    const { weeks, adMonths, adYears } = this.createBeautifullWeeks(
      this.props.weekStart,
      this.props.totalDays
    );
    if (this.props.singleView) {
      this.props.updateAdMonths(adYears, adMonths);
    }
    let dayStyle = this.state.dayStyle;
    if (this.monthViewRef.current) {
      const el = this.monthViewRef.current;
      const { y } = el.getBoundingClientRect();
      const heightPerDay = window.innerHeight - (y + 50);
      dayStyle = {
        height: `${heightPerDay / weeks.length}px`,
      };
    }
    this.setState({
      weeks,
      dayStyle,
    });
  }
}

Month.defaultProps = {
  handleDayClick: () => null,
  updateAdMonths: () => null,
  events: {
    days: [],
  },
  flipAnimation: '',
};
Month.propTypes = {
  events: PropTypes.object,
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
