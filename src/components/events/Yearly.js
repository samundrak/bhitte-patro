import React from 'react';
import PropTypes from 'prop-types';
import { Collapse } from 'antd';
import MonthlyEvents from './Monthly';
import calendar from '../../data/calendar';

const Panel = Collapse.Panel;

class Yearly extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openedPanels: [],
      scrolled: false,
    };
    this.cursorMonth = React.createRef();
  }

  componentWillReceiveProps(nextProps) {
    if (!this.state.scrolled && nextProps.events.length) {
    }
  }
  handleOpenPanel = (monthIndex) => {
    if (this.state.openedPanels.includes(monthIndex)) return;
    this.setState((state) => ({
      openedPanels: [...state.openedPanels, monthIndex],
    }));
  };
  render() {
    const { cursor, events } = this.props;
    const currentMonth = cursor.month - 1;
    return (
      <Collapse
        bordered={false}
        defaultActiveKey={['0']}
        activeKey={[String(currentMonth)]}
      >
        {events.map((item, monthIndex) => {
          return (
            <Panel
              ref={monthIndex === currentMonth ? this.cursorMonth : null}
              header={calendar.month.np.long[monthIndex]}
              key={monthIndex}
              onClick={this.handleOpenPanel(monthIndex)}
            >
              {this.state.openedPanels.includes(monthIndex) ? (
                <MonthlyEvents
                  bordered={false}
                  isHeader={false}
                  key={monthIndex}
                  name={calendar.month.np.long[monthIndex]}
                  events={(item || {}).days || []}
                />
              ) : (
                <div />
              )}
            </Panel>
          );
        })}
      </Collapse>
    );
  }
}

Yearly.propTypes = {
  events: PropTypes.array.isRequired,
  cursor: PropTypes.object.isRequired,
};
export default Yearly;
