import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'antd';
import calendar from '../data/calendar';
import Month from '../calendar/Month';

class Year extends React.Component {
  static MONTHS = calendar.month.np;
  render() {
    return (
      <Row>
        {Year.MONTHS.long.map((name, index) => (
          <Col span={12}>
            <Month
              name={name}
              weekStart={this.props.value[index][0]}
              totalDays={this.props.value[index][1]}
            />
          </Col>
        ))}
      </Row>
    );
  }
}

Year.propTypes = {
  value: PropTypes.array.isRequired,
  year: PropTypes.number.isRequired,
};
export default Year;
