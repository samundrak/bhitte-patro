import React, { Component } from 'react';
import Proptypes from 'prop-types';
import { Row, Col } from 'antd';
import calendar from '../../data/calendar';
import { StyledWeekHeader } from './style';
const { week } = calendar;
class Week extends Component {
  static TOTAL_DAYS = 7;

  render() {
    return (
      <Row style={{}}>
        {week.np[this.props.short ? 'short' : 'long'].map((weekDay, index) => (
          <StyledWeekHeader
            key={weekDay}
            span={3}
            singleView={this.props.singleView}
            index={index}
            className="fullWidth"
          >
            {!this.props.singleView && (weekDay || '').substring(0, 2)}
            {this.props.singleView && weekDay}
          </StyledWeekHeader>
        ))}
      </Row>
    );
  }
}

Week.defaultProps = {
  short: false,
  singleView: false,
};
Week.propTypes = {
  singleView: Proptypes.bool.isRequired,
  short: Proptypes.bool.isRequired,
};
export default Week;
