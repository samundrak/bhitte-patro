import React, { Component, Fragment } from 'react';
import { Col } from 'antd';
import PropTypes from 'prop-types';
import { replaceNumberWithAnka } from '../utils';

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
  render() {
    const styles = {};
    const isToday = this.isCursorDayToday();
    const { day, singleView } = this.props;
    if (this.props.singleView) {
      Object.assign(styles, {
        height: '130px',
        padding: '10px',
        borderBottom: singleView && '#e0e0e0 1px solid',
        borderRight: '#e0e0e0 1px solid',
      });
    }
    return (
      <Col
        style={{
          borderWidth: '0px',
          height: '25px',
          margin: '0px',
          cursor: 'pointer',
          textAlign: 'center',
          borderStyle: 'solid',
          lineHeight: '25px',
          borderColor: '#e8e8e8',
          ...styles,
        }}
        span={3}
        className={`${!singleView && day.isDay ? 'daySingleView' : ''} 
        ${(isToday && 'today') || ''}
        `}
        onClick={this.props.handleDayClick(day)}
      >
        <h
          style={{
            fontWeight: '400',
            margin: '0',
            fontSize: (singleView && '50px') || '14px',
            // float: this.props.singleView && 'left',
            paddingTop: this.props.singleView && '20%',
            position: singleView ? 'absolute' : '',
            color: isToday && 'white',
          }}
        >
          {replaceNumberWithAnka(day.number)}
        </h>
        {day.ad &&
          singleView && (
            <div
              style={{
                fontWeight: '400',
                margin: '0',
                float: this.props.singleView && 'left',
                color: isToday && 'white',
              }}
            >
              {day.ad.day}
            </div>
          )}
      </Col>
    );
  }
}

Day.defaultProps = {
  day: {},
  singleView: false,
};
Day.propTypes = {
  month: PropTypes.number.isRequired,
  today: PropTypes.shape({
    year: PropTypes.number.isRequired,
    month: PropTypes.number.isRequired,
    day: PropTypes.number.isRequired,
  }).isRequired,
  handleDayClick: PropTypes.func.isRequired,
  singleView: PropTypes.bool.isRequired,
  day: PropTypes.object.isRequired,
  cursor: PropTypes.shape({
    year: PropTypes.number.isRequired,
    month: PropTypes.number.isRequired,
    day: PropTypes.number.isRequired,
  }).isRequired,
};
export default Day;
