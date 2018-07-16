import React from 'react';
import renderIf from 'render-if';
import { CALENDAR_VIEW_TYPE, YEAR_RANGE_NEPALI } from './store/state';
import { Layout, Menu, Icon, Select, Row, Col, Button } from 'antd';
import { replaceNumberWithAnka } from './utils';
import calendar from './data/calendar';
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
    return (value) => {
      this.changeCursorYear({
        step,
        type: 'year',
        value,
      });
    };
  }
  handleChangeMonthCursor(step) {
    return (value) => {
      this.changeCursorYear({
        step,
        type: 'month',
        value,
      });
    };
  }
  changeCursorYear(data) {
    this.props.domex.resource
      .patch('/change_cursor', {
        data,
      })
      .then(({ data }) => {
        const { date, view } = data;
        const route = `/calendar/view/${view}/${date.year}/${date.month}/${
          date.day
        }`;
        this.props.history.push(route);
      });
  }
  handleChangeCalendarView() {
    return (view) => {
      const { year, month, day } = this.props.app.cursor;
      const route = `/calendar/view/${view}/${year}/${month}/${day}`;
      this.props.history.push(route);
      this.props.domex.resource.post('/change_calendar_view', {
        data: { view },
      });
    };
  }
  renderYearChooser() {
    return (
      <Select
        value={this.props.app.cursor.year}
        showSearch
        onChange={this.handleChangeYearCursor()}
      >
        {years.map((item) => (
          <Option value={item.yr} key={item.yr}>
            {item.local}
          </Option>
        ))}
      </Select>
    );
  }
  renderMonthChooser() {
    const months = calendar.month.np.long;
    return (
      <Select
        value={this.props.app.cursor.month - 1}
        showSearch
        onChange={this.handleChangeMonthCursor()}
        style={{ width: '120px' }}
      >
        {Object.keys(months).map((key, index) => (
          <Option value={index} key={index}>
            {months[index]}
          </Option>
        ))}
      </Select>
    );
  }
  render() {
    const calendarView = this.props.app.calendarView;
    return (
      <Layout theme="light" position="fixed">
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
            <Row type="flex" justify="space-between">
              <Col span={1} />
              <Col span={2} />
              <Col span={12}>
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
                {this.renderYearChooser()}
                {renderIf(
                  calendarView === CALENDAR_VIEW_TYPE.MONTH.value &&
                    calendarView !== CALENDAR_VIEW_TYPE.YEAR.value
                )(this.renderMonthChooser())}
              </Col>
              <Col span={3}>
                <Select
                  value={calendarView}
                  style={{ width: 120 }}
                  onChange={this.handleChangeCalendarView()}
                >
                  {Object.keys(CALENDAR_VIEW_TYPE).map((item) => (
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
