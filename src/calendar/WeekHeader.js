import React, { Component } from 'react';
import Proptypes from 'prop-types';
import { Row, Col } from 'antd';
import calendar from '../data/calendar';

const { week } = calendar;
class Week extends Component {
  static TOTAL_DAYS = 7;

  render() {
    const styles = {};
    if (this.props.singleView) {
      Object.assign(styles, {
        height: '50px',
        lineHeight: '50px',
        borderRight: '#e0e0e0 1px solid',
        borderBottom: this.props.singleView && '#e0e0e0 1px solid',
      });
    }
    return (
      <Row style={{}}>
        {week.np[this.props.short ? 'short' : 'long'].map(weekDay => (
          <Col
            key={weekDay}
            span={3}
            style={{
              borderWidth: '0px',
              height: '25px',
              margin: '0px',
              textAlign: 'center',
              borderStyle: 'solid',
              borderColor: '#e8e8e8',
              lineHeight: '25px',
              ...styles,
            }}
            className="fullWidth"
          >
            {!this.props.singleView && (weekDay || '').substring(0, 2)}
            {this.props.singleView && weekDay}
          </Col>
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
