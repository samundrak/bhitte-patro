import React from 'react';
import PropTypes from 'prop-types';
import { Timeline, List, Radio } from 'antd';

const RadioGroup = Radio.Group;

class Monthly extends React.Component {
  state = {
    filterType: 'all',
  };
  breakInEvents(events) {
    return events.map((event) => ({
      ...event,
      event: event.event.split('/').filter((item) => item !== '--'),
    }));
  }

  handleFilter() {
    return (event) => {
      this.setState({
        filterType: event.target.value,
      });
    };
  }
  render() {
    const events = this.breakInEvents(this.props.events);
    return (
      <List
        header={
          this.props.isHeader ? (
            <div>
              <b>{this.props.name}</b> महिनाको महत्वपूर्ण दिनहरु{' '}
            </div>
          ) : null
        }
        bordered={this.props.bordered}
      >
        <List.Item>
          <RadioGroup
            value={this.state.filterType}
            onChange={this.handleFilter()}
          >
            <Radio value={'all'}>सबै दिनहरु</Radio>
            <Radio value={'holiday'} style={{ color: 'red' }}>
              बिदाहरु
            </Radio>
          </RadioGroup>
        </List.Item>
        <List.Item>
          <Timeline>
            {events.map((item) => {
              return (
                (item.event.length &&
                  ((this.state.filterType === 'holiday' && item.isHoliday) ||
                    this.state.filterType === 'all') && (
                    <Timeline.Item
                      key={item.day}
                      color={item.isHoliday ? 'red' : 'blue'}
                    >
                      {item.event.map((event, index) => (
                        <p key={index}>
                          {event}{' '}
                          <small>
                            <i>{item.day} गते </i>
                          </small>
                        </p>
                      ))}
                    </Timeline.Item>
                  )) ||
                ''
              );
            })}
            {!events.length && <p>छैन! </p>}
          </Timeline>
        </List.Item>
      </List>
    );
  }
}
Monthly.defaultProps = {
  isHeader: true,
  bordered: true,
};
Monthly.propTypes = {
  bordered: PropTypes.bool,
  events: PropTypes.array.isRequired,
  isHeader: PropTypes.bool,
};
export default Monthly;
