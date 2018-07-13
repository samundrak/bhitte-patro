import React, { Component, Fragment } from 'react';
import { Col } from 'antd';
import PropTypes from 'prop-types';
import { replaceNumberWithAnka } from '../utils';

class Day extends Component {
  render() {
    const styles = {};
    if (this.props.singleView) {
      Object.assign(styles, {
        height: '100px',
        lineHeight: '100px',
        borderWidth: '1px',
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
        {replaceNumberWithAnka(this.props.day.number)}
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
