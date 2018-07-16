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
          <Col span={8} key={name}>
            <Month
              cursor={this.props.cursor}
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
  cursor: PropTypes.object.isRequired,
  value: PropTypes.array.isRequired,
  year: PropTypes.number.isRequired,
};
export default Year;
