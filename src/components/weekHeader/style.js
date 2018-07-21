import React from 'react';
import styled from 'styled-components';
import { Col } from 'antd';

export const StyledWeekHeader = styled(
  ({ height, day, singleView, ...rest }) => <Col {...rest} />
)`
  border-width: 0px;
  height: ${(props) => (props.singleView ? '50px' : '25px')};
  margin: 0px;
  text-align: center;
  border-style: solid;
  border-color: #e8e8e8;
  line-height: ${(props) => (props.singleView ? '50px' : '25px')};
  color: ${(props) => props.index === 6 && 'red'};
  border-right:  ${(props) => props.singleView && '#e0e0e0 1px solid'}
  border-bottom: ${(props) => props.singleView && '#e0e0e0 1px solid'}
`;
