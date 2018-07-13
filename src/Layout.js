import React from 'react';
import { CALENDAR_VIEW_TYPE, YEAR_RANGE_NEPALI } from './store/state';
import { Layout, Menu, Icon, Select, Row, Col, Button } from 'antd';
import { replaceNumberWithAnka } from './utils';

import { withRouter } from 'react-router';
const Option = Select.Option;

const { Header, Sider, Content } = Layout;
const years = [];
for (let yr = YEAR_RANGE_NEPALI[0]; yr < YEAR_RANGE_NEPALI[1]; yr++) {
  years.push({ yr, local: replaceNumberWithAnka(yr) });
}
class SimpleLayout extends React.Component {
  state = {
    collapsed: false,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };
  handleChangeYearCursor(step) {
    return value => {
      let year = null;
      const cursor = this.props.app.cursor.year;
      if (!step) {
        year = parseInt(value);
      }
      if (step === '+' && cursor < YEAR_RANGE_NEPALI[1]) {
        year = parseInt(cursor) + 1;
      }
      if (step === '-' && cursor > YEAR_RANGE_NEPALI[0]) {
        year = parseInt(cursor) - 1;
      }
      this.changeCursorYear(year);
    };
  }

  changeCursorYear(year) {
    const {
      calendarView: view,
      cursor: { month, day },
    } = this.props.app;
    this.props.domex.resource.post('/change_cursor', {
      data: {
        date: {
          year,
          month,
          day,
        },
      },
    });
    const route = `/calendar/view/${view}/${year}/${month}/${day}`;
    this.props.history.push(route);
  }
  handleChangeCalendarView() {
    return view => {
      const { year, month, day } = this.props.app.cursor;
      const route = `/calendar/view/${view}/${year}/${month}/${day}`;
      this.props.history.push(route);
      this.props.domex.resource.post('/change_calendar_view', {
        data: { view },
      });
    };
  }
  render() {
    return (
      <Layout theme="light" position="fixed">
        <Sider
          theme="light"
          trigger={null}
          collapsible
          collapsed={this.state.collapsed}
        >
          <Menu theme="light" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1">
              <Icon type="user" />
              <span>nav 1</span>
            </Menu.Item>
            <Menu.Item key="2">
              <Icon type="video-camera" />
              <span>nav 2</span>
            </Menu.Item>
            <Menu.Item key="3">
              <Icon type="upload" />
              <span>nav 3</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
            <Row type="flex" justify="space-between">
              <Col span={1}>
                <Icon
                  className="trigger"
                  type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                  onClick={this.toggle}
                />
              </Col>
              <Col span={12} />
              <Col span={5}>
                <Button
                  shape="circle"
                  onClick={this.handleChangeYearCursor('-')}
                >
                  &lt;
                </Button>
                &nbsp;
                <Button
                  shape="circle"
                  onClick={this.handleChangeYearCursor('+')}
                >
                  &gt;
                </Button>
                &nbsp;
                <Select
                  value={this.props.app.cursor.year}
                  showSearch
                  style={{ width: 120 }}
                  onChange={this.handleChangeYearCursor()}
                >
                  {years.map(item => (
                    <Option value={item.yr} key={item.yr}>
                      {item.local}
                    </Option>
                  ))}
                </Select>
              </Col>
              <Col span={3}>
                <Select
                  value={this.props.app.calendarView}
                  style={{ width: 120 }}
                  onChange={this.handleChangeCalendarView()}
                >
                  {Object.keys(CALENDAR_VIEW_TYPE).map(item => (
                    <Option
                      value={CALENDAR_VIEW_TYPE[item].value}
                      key={CALENDAR_VIEW_TYPE[item].value}
                    >
                      {CALENDAR_VIEW_TYPE[item].np}
                    </Option>
                  ))}
                </Select>
              </Col>
            </Row>
          </Header>
          <Content
            style={{
              borderTopStyle: 'solid',
              borderTopWidth: '1px',
              borderTopColor: '#e8e8e8',
              marginLeft: '1px',
              background: '#fff',
              minHeight: 280,
            }}
          >
            {this.props.children}
          </Content>
        </Layout>
      </Layout>
    );
  }
}
export default withRouter(SimpleLayout);
