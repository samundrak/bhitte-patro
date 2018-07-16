import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'antd';
import WeekHeader from './WeekHeader';
import Weeks from './Weeks';

class Month extends React.Component {
  getStyle() {
    if (this.props.singleView) {
      return {
        // marginLeft: '100px',
        // marginTop: '50px',
        marginLeft: '0px',
      };
    }
    return {
      margin: '10px',
    };
  }
  render() {
    return (
      <Row style={this.getStyle()}>
        {!this.props.singleView && (
          <Row>
            <Col span={8} />
            <Col span={8}>{this.props.name}</Col>
            <Col span={8} />
          </Row>
        )}
        <WeekHeader singleView={this.props.singleView} />
        <Weeks
          cursor={this.props.cursor}
          singleView={this.props.singleView}
          weekStart={this.props.weekStart}
          totalDays={this.props.totalDays}
        />
      </Row>
    );
  }
}

Month.defaultProps = {
  singleView: false,
};
Month.propTypes = {
  singleView: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  totalDays: PropTypes.number.isRequired,
  weekStart: PropTypes.number.isRequired,
  cursor: PropTypes.object.isRequired,
};
export default Month;
