import React, { Component, Fragment } from 'react';
import { Col } from 'antd';
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
        {replaceNumberWithAnka(1020)}
      </Col>
    );
  }
}

Day.defaultProps = {
  day: 30,
};
export default Day;
