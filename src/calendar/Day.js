import React, { Component, Fragment } from 'react';
import { Col } from 'antd';
import PropTypes from 'prop-types';
import { replaceNumberWithAnka } from '../utils';

class Day extends Component {
  render() {
    return (
      <Col
        style={{
          borderWidth: '1px',
          height: '70px',
          margin: '0px',
          textAlign: 'center',
          borderStyle: 'solid',
          lineHeight: '70px',
        }}
        span={3}
      >
        {replaceNumberWithAnka(this.props.day.number)}
      </Col>
    );
  }
}

Day.defaultProps = {
  day: {},
};
Day.propTypes = {
  daya: PropTypes.object.isRequired,
};
export default Day;
