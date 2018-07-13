import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import YearView from '../views/Year';
import data from '../data/years.json';
import { CALENDAR_VIEW_TYPE } from '../store/state';
import domex from '../store';

class Calendar extends React.Component {
  renderCalendarView() {
    const view = this.props.app.calendarView;
    switch (view) {
      case CALENDAR_VIEW_TYPE.YEAR.value:
        return (
          <YearView
            key={this.props.app.cursorYear}
            value={data[this.props.app.cursorYear]}
            year={this.props.app.cursorYear}
          />
        );
      case CALENDAR_VIEW_TYPE.MONTH.value:
        return <div>Not avu</div>;
    }
  }
  render() {
    return <div>{this.renderCalendarView()}</div>;
  }
  componentDidMount(x, y) {
    const { year, month, day } = this.props.match.params;
    domex.resource.post('/change_cursor', {
      data: {
        date: {
          year,
          month,
          day,
        },
      },
    });
  }
}
const mapStateToProps = state => ({
  app: state.app,
});
export default connect(mapStateToProps)(Calendar);
