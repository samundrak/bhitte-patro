import React from 'react';
import PropTypes from 'prop-types';
import { Monthly as MonthlyEvents, Yearly as YearlyEvents } from '../events';
import { Row, Col } from 'antd';
import calendar from '../../data/calendar';

class Sider extends React.Component {
  state = {};
  render() {
    const { calendarView, cursor, yearEvents: events } = this.props.app;
    const monthIndex = cursor.month - 1;
    return (
      <div id="importantEventContainer">
        <Row>
          <Col
            span={24}
            style={{
              height: `${window.innerHeight}px`,
              overflow: 'scroll',
              overflowX: 'hidden',
            }}
          >
            {calendarView === 'month' && (
              <MonthlyEvents
                name={calendar.month.np.long[monthIndex]}
                events={(events[monthIndex] || {}).days || []}
              />
            )}
            {calendarView === 'year' && (
              <YearlyEvents events={events} cursor={cursor} />
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

Sider.propTypes = {
  app: PropTypes.object.isRequired,
};
export default Sider;
