import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Redirect, withRouter, Route, Switch,
} from 'react-router-dom';
import 'antd/dist/antd.css';
import './App.css';
import NepaliDate from './core/NepaliDate';
import Calendar from './pages/Calendar';
import Layout from './Layout';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      today: NepaliDate.today(),
    };
  }

  render() {
    const { today } = this.state;
    const { domex, app } = this.props;
    return (
      <div className="App" >
        <Layout app={app} domex={domex}>
          <Switch>
            <Route
              domex={domex}
              path="/calendar/view/:view/:year/:month/:day"
              component={Calendar}
            />
            {' '}
            <Redirect
              from="*"
              to={`/calendar/view/month/${today.nepaliYear}/${
                today.nepaliMonth
              }/${today.nepaliDay}`}
            />
          </Switch>
        </Layout>
      </div>
    );
  }


}

const mapStateToProps = state => ({
  app: state.app,
});
App.propTypes = {
  app: PropTypes.object.isRequired,
  domex: PropTypes.object.isRequired,
};
export default withRouter(connect(mapStateToProps)(App));
