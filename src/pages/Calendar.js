import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import YearView from '../views/Year';
import data from '../data/years.json';
import { CALENDAR_VIEW_TYPE } from '../store/state';
import domex from '../store';
import calendar from '../data/calendar';
import Month from '../calendar/Month';

class Calendar extends React.Component {
  renderCalendarView() {
    const view = this.props.app.calendarView;
    const cursor = this.props.app.cursor;

    const value = data[cursor.year];
    switch (view) {
      case CALENDAR_VIEW_TYPE.YEAR.value:
        return <YearView key={cursor.year} value={value} year={cursor.year} />;
      case CALENDAR_VIEW_TYPE.MONTH.value:
        return (
          <Month
            key={`${cursor.year}/${cursor.month}`}
            singleView
            name={calendar.month.np.long[cursor.month - 1]}
            weekStart={value[cursor.month - 1][0]}
            totalDays={value[cursor.month - 1][1]}
          />
        );
    }
  }
  render() {
    return <div>{this.renderCalendarView()}</div>;
  }
  componentDidMount(x, y) {
    const { year, month, day, view } = this.props.match.params;
    domex.resource.post('/change_cursor', {
      data: {
        date: {
          year: parseInt(year, 10),
          month: parseInt(month, 10),
          day: parseInt(day, 10),
        },
      },
    });
    domex.resource.post('/change_calendar_view', {
      data: {
        view,
      },
    });
  }
}
const mapStateToProps = (state) => ({
  app: state.app,
});
export default connect(mapStateToProps)(Calendar);
