import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'antd';
import WeekHeader from './WeekHeader';
import Weeks from './Weeks';

class Month extends React.Component {
  render() {
    return (
      <Row style={{ margin: '10px' }}>
        <Row>
          <Col span={24}>{this.props.name}</Col>
        </Row>
        <WeekHeader />
        <Weeks weekStart={this.props.weekStart} totalDays={this.props.totalDays} />
      </Row>
    );
  }
}

Month.propTypes = {
  name: PropTypes.string.isRequired,
  totalDays: PropTypes.number.isRequired,
  weekStart: PropTypes.number.isRequired,
};
export default Month;
