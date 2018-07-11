import React from 'react';
import PropTypes from 'prop-types';
import { Row } from 'antd';
import Week from './Week';

class Weeks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      weeks: 4,
      totalDays: 30,
    };
  }
  componentDidMount() {
    console.log(parseInt(this.props.totalDays / 7));
    this.setState({
      weeks: parseInt(this.props.totalDays / 7),
    });
  }
  render() {
    return (
      <Row>
        {Array(this.state.weeks)
          .fill(true)
          .map((weekNumber, index) => <Week count={index} />)}
      </Row>
    );
  }
}

Weeks.propTypes = {
  totalDays: PropTypes.number.isRequired,
  weekStart: PropTypes.number.isRequired,
};
export default Weeks;
