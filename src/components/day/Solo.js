import React from 'react';
import { replaceNumberWithAnka } from '../../utils';
import { StyledSolo, StyledAnka, StyledEvent, TithiAndAd } from './style';

const Solo = ({ day, span, height }) => {
  const { bs } = day;
  return (
    <StyledSolo
      isHoliday={day.events && day.events.isHoliday}
      height={height}
      day={day}
      span={span}
      className={`day`}
    >
      <StyledAnka
        singleView={true}
        isToday={false}
        fontSize={'10vw'}
        style={{
          top: '40%',
          left: day.number > 9 ? '20%' : '35%',
          paddingTop: '0',
        }}
      >
        {replaceNumberWithAnka(day.number)}
      </StyledAnka>

      <TithiAndAd singleView={true} isToday={false}>
        <i style={{ padding: '10px' }}>
          {day.ad.day}&#160;{day.ad.strMonth}&#160;{day.ad.year}&#160;{' '}
          {day.ad.strDayOfWeek}
        </i>
      </TithiAndAd>

      <div
        style={{
          position: ' absolute',
          right: '0%',
          paddingRight: '3%',
        }}
      >
        <b>{day.events && day.events.tithi}</b>
      </div>
      <div
        style={{
          position: 'absolute',
          bottom: '0%',
          paddingRight: '3%',
          right: '0%',
          paddingBottom: '2%',
        }}
      >
        {bs.ne.strMonth}&#160;{bs.ne.year}&#160;{bs.ne.strDayOfWeek}
      </div>
    </StyledSolo>
  );
};
export default Solo;
