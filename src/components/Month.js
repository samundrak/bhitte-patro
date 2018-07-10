import React from 'react';
import { Row } from 'antd';
import Week from './Week';
import Days from './Days';

class Month extends React.Component {
  render() {
    return (
      <Row>
        <Week short />
        <Days />
      </Row>
    );
  }
}
export default Month;
