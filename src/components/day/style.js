import React from 'react';
import styled from 'styled-components';
import { Col } from 'antd';

export const DayStyle = styled(({ height, day, singleView, ...rest }) => (
  <Col {...rest} />
))`
  border-width: 0px;
  height: ${({ singleView, height }) => (singleView ? height : '25px')};
  margin: 0px;
  cursor: pointer;
  text-align: center;
  border-style: solid;
  line-height: 25px;
  border-color: #e8e8e8;
  padding: ${(props) => (props.singleView ? '10px' : '0px')};
  border-bottom: ${(props) => props.singleView && '#e0e0e0 1px solid'};
  border-right: ${(props) => props.singleView && '#e0e0e0 1px solid'};
  color: ${({ day }) => day.events && day.events.isHoliday && 'red'};
`;

export const StyledAnka = styled.span`
  font-weight: 400;
  font-size: ${(props) =>
    (props.singleView && (props.fontSize || '3vw')) || ' '};
  padding-top: ${(props) => props.singleView && '20%'};
  position: ${(props) => (props.singleView ? 'absolute' : '')};
  color: ${(props) => props.isToday && 'white'};
`;

export const TithiAndAd = styled.div`
  margin: 0;
  float: ${(props) => props.singleView && 'left'};
  color: ${(props) => props.isToday && 'white'};
`;
export const StyledEvent = styled.div`
  font-size: 0.8em;
  margin: 0;
  color: ${(props) => props.isToday && 'white'};
  position: absolute;
  bottom: 0%;
`;
export const StyledSolo = styled(
  ({ isHoliday, height, day, singleView, ...rest }) => <Col {...rest} />
)`
  color: #fff;
  border-width: 0px;
  height: ${({ height }) => height};
  margin: 0px;
  cursor: pointer;
  text-align: center;
  border-style: solid;
  line-height: 25px;
  border-color: #e8e8e8;
  padding: 10px;
  border-bottom: #e0e0e0 1px solid;
  border-right: #e0e0e0 1px solid;
  background: ${({ isHoliday }) => (isHoliday ? '#b50909' : '#2382bc')};
`;
