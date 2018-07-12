import React, { Component } from 'react';
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
        <Layout>
          <YearView value={data[year]} year={year} />
        </Layout>
      </div>
    );
  }
}

export default App;
