import React, { Component } from 'react';
import YearView from './views/Year';
import 'antd/dist/antd.css';
import data from './data/years.json';

const year = 2075;
class App extends Component {
  render() {
    return (
      <div className="App">
        <YearView value={data[year]} year={year} />
      </div>
    );
  }
}

export default App;
