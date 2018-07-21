import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { Row, Col } from 'antd';
import calendar from '../data/calendar';
import Month from '../components/month';
import domex from '../store';

class Year extends React.Component {
  static MONTHS = calendar.month.np;

  constructor(props) {
    super(props);
    this.handleDayClick = this.handleDayClick.bind(this);
  }

  handleDayClick(month) {
    return (day) => () => {
      domex.resource
        .patch('/change_cursor', {
          data: {
            value: {
              ...this.props.cursor,
              day: day.number,
              month: month + 1,
            },
          },
        })
        .then(({ data }) => {
          const view = 'month';
          const { date } = data;
          const route = `/calendar/view/${view}/${date.year}/${date.month}/${
            date.day
          }`;
          this.props.history.push(route);
          domex.resource.post('/change_calendar_view', {
            data: { view },
          });
        });
    };
  }

  render() {
    return (
      <Row>
        {Year.MONTHS.long.map((name, index) => (
          <Col span={8} key={name}>
            <Month
              index={index}
              handleDayClick={this.handleDayClick(index)}
              cursor={this.props.cursor}
              name={name}
              weekStart={this.props.value[index][0]}
              today={this.props.today}
              totalDays={this.props.value[index][1]}
            />
          </Col>
        ))}
      </Row>
    );
  }
}

Year.propTypes = {
  flipAnimation: PropTypes.string,
  today: PropTypes.shape({
    year: PropTypes.number.isRequired,
    month: PropTypes.number.isRequired,
    day: PropTypes.number.isRequired,
  }).isRequired,
  cursor: PropTypes.shape({
    year: PropTypes.number.isRequired,
    month: PropTypes.number.isRequired,
    day: PropTypes.number.isRequired,
  }).isRequired,
  value: PropTypes.array.isRequired,
  year: PropTypes.number.isRequired,
};
export default withRouter(Year);
