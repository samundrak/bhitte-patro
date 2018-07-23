import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { replaceNumberWithAnka } from '../../utils';
import { TithiAndAd, StyledAnka, DayStyle, StyledEvent } from './style';

class Day extends Component {
  isCursorDayToday() {
    const { cursor, today } = this.props;
    if (!cursor || !today) return;
    return (
      cursor.year === today.year &&
      this.props.month + 1 === today.month &&
      this.props.day.number === today.day
    );
  }

  isSelectedDay() {
    const { cursor } = this.props;
    return (
      this.props.month + 1 === cursor.month &&
      this.props.day.number === cursor.day
    );
  }

  render() {
    const isToday = this.isCursorDayToday();
    const { day, singleView } = this.props;

    return (
      <DayStyle
        singleView={this.props.singleView}
        height={this.props.style.height}
        day={day}
        span={this.props.span}
        className={`day fullWidth ${
          !singleView && day.isDay ? 'daySingleView' : ''
        } 
        ${(isToday && 'today') || ''}
        ${this.isSelectedDay() && !isToday ? 'selection' : ''}
        `}
        onClick={this.props.handleDayClick(day)}
      >
        <StyledAnka singleView={this.props.singleView} isToday={isToday}>
          {replaceNumberWithAnka(day.number)}
        </StyledAnka>

        {day.ad &&
          singleView && (
            <TithiAndAd singleView={this.props.singleView} isToday={isToday}>
              <b style={{ padding: '10px' }}>{day.ad.day}</b>
              <span>{day.events && day.events.tithi}</span>
            </TithiAndAd>
          )}

        {day.ad &&
          singleView && (
            <StyledEvent isToday={isToday}>
              {day.events && day.events.event}
            </StyledEvent>
          )}
      </DayStyle>
    );
  }
}

Day.defaultProps = {
  day: {},
  singleView: false,
  style: {},
  handleDayClick: () => null,
  span: 3,
  solo: false,
};
Day.propTypes = {
  style: PropTypes.object,
  month: PropTypes.number.isRequired,
  today: PropTypes.shape({
    year: PropTypes.number.isRequired,
    month: PropTypes.number.isRequired,
    day: PropTypes.number.isRequired,
  }).isRequired,
  handleDayClick: PropTypes.func,
  singleView: PropTypes.bool.isRequired,
  day: PropTypes.object.isRequired,
  cursor: PropTypes.shape({
    year: PropTypes.number.isRequired,
    month: PropTypes.number.isRequired,
    day: PropTypes.number.isRequired,
  }).isRequired,
  span: PropTypes.number,
  solo: PropTypes.bool,
};
export default Day;
