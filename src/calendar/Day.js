import React, { Component, Fragment } from 'react';
import { Col } from 'antd';
import PropTypes from 'prop-types';
import { replaceNumberWithAnka } from '../utils';

class Day extends Component {
  render() {
    const styles = {};
    if (this.props.singleView) {
      Object.assign(styles, {
        height: '130px',
        padding: '10px',
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
        className={
          !this.props.singleView && this.props.day.isDay ? 'daySingleView' : ''
        }
      >
        <h2
          style={{
            fontWeight: '400',
            margin: '0',
            fontSize: (this.props.singleView && '16px') || '14px',
            float: this.props.singleView && 'left',
          }}
        >
          {replaceNumberWithAnka(this.props.day.number)}
        </h2>
      </Col>
    );
  }
}

Day.defaultProps = {
  day: {},
  singleView: false,
};
Day.propTypes = {
  singleView: PropTypes.bool.isRequired,
  day: PropTypes.object.isRequired,
};
export default Day;
