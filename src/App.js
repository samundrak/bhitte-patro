import React, { Component } from 'react';
import { connect } from 'react-redux';

import YearView from './views/Year';
import 'antd/dist/antd.css';
import './App.css';
import Layout from './Layout';
import data from './data/years.json';

const year = 2075;
class App extends Component {
  render() {
    return (
      <div className="App">
        <Layout app={this.props.app} domex={this.props.domex}>
          <YearView
            key={this.props.app.cursorYear}
            value={data[this.props.app.cursorYear]}
            year={this.props.app.cursorYear}
          />
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  app: state.app,
});
export default connect(mapStateToProps)(App);
