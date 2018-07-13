import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter, Route, Switch } from 'react-router-dom';
import 'antd/dist/antd.css';
import './App.css';
import NepaliDate from './core/NepaliDate';
import Calendar from './pages/Calendar';
import Layout from './Layout';

const year = 2075;
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      today: NepaliDate.today(),
    };
  }
  render() {
    const { today } = this.state;
    return (
      <div className="App">
        <Layout app={this.props.app} domex={this.props.domex}>
          <Switch>
            <Route
              domex={this.props.domex}
              path="/calendar/view/:view/:year/:month/:day"
              component={Calendar}
            />{' '}
            <Redirect
              from="*"
              to={`/calendar/view/year/${today.nepaliYear}/${
                today.nepaliMonth
              }/${today.nepaliDay}`}
            />
          </Switch>
        </Layout>
      </div>
    );
  }

  componentDidMount() {
    console.log(NepaliDate.today());
  }
}

const mapStateToProps = (state) => ({
  app: state.app,
});
export default withRouter(connect(mapStateToProps)(App));
