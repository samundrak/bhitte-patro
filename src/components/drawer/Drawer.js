import React from 'react';
import PropTypes from 'prop-types';
import { Drawer, Divider, Row, Tabs, Col, List } from 'antd';
import { EnlargedDate } from './style';
import Day, { Solo } from '../day';

const { TabPane } = Tabs;
class SimpleDrawer extends React.Component {
  breakInEvents(eventString) {
    const events = eventString.split('/').filter((item) => item !== '--');
    return events;
  }
  googleSearchUri(item) {
    return `https://www.google.com/search?q=${item}`;
  }
  render() {
    const events = this.props.day.events
      ? this.breakInEvents(this.props.day.events.event)
      : [];
    return (
      <Drawer
        closable={true}
        width={400}
        placement="right"
        closable={false}
        onClose={this.props.onClose}
        visible={this.props.visible}
      >
        <Row>
          <Solo
            span={24}
            cursor={this.props.cursor}
            today={this.props.today}
            day={this.props.day}
            height={'200px'}
          />
        </Row>
        <Divider />
        <Row>
          <Col span={24}>
            <Tabs defaultActiveKey="1">
              <TabPane
                tab={`घटनाहरू ${(events.length && `(${events.length})`) || ''}`}
                key="1"
              >
                <List
                  size="small"
                  dataSource={events}
                  renderItem={(item) => (
                    <List.Item>
                      <a
                        href={this.googleSearchUri(item)}
                        target="_blank"
                        rel="noopener"
                      >
                        {item}
                      </a>
                    </List.Item>
                  )}
                />
              </TabPane>
            </Tabs>
          </Col>
        </Row>
      </Drawer>
    );
  }
}

SimpleDrawer.propTypes = {
  day: PropTypes.object.isRequired,
  visible: PropTypes.bool.isRequired,
  cursor: PropTypes.object.isRequired,
  today: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
};
export default SimpleDrawer;
