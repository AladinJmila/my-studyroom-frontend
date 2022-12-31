import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as d3 from 'd3';
import NavDate from './NavDate';
import {
  timeFormatter,
  toStringTimeFormatter,
  weekPaginate,
  monthPaginate,
  yearPaginate,
} from './../services/StatsService';
import {
  setSelectedDayViz,
  loadVizData,
} from './../../store/apps/timerRecordsActions';

const DailyActivity = () => {
  const dispatch = useDispatch();
  const { vizData } = useSelector(state => state.apps.timerRecords);
  const [dayIndex, setDayIndex] = useState(vizData?.length - 1);
  const [subjectData, setSubjectData] = useState();
  const [data, setData] = useState();
  const [date, setDate] = useState();

  useEffect(() => {
    if (!vizData) {
      dispatch(loadVizData());
    }
    // setDayIndex();
    dispatch(setSelectedDayViz(vizData[dayIndex]));
    setSubjectData(vizData[dayIndex]?.SubjectActivity);
    setData(vizData[dayIndex]?.activity);
    setDate(vizData[dayIndex]?.date);

    genGraph();
  }, [data, dayIndex, vizData]);

  let totalDuration = 0;
  let formattedDuration;

  if (data) {
    totalDuration = Math.floor(d3.sum(data, d => d.totalPlayTime));
    formattedDuration = timeFormatter(totalDuration);
  }

  const width = 600;
  const height = 15;
  const margin = { top: 0, right: 0, bottom: 0, left: 0 };
  const x = d3.scaleLinear([0, 1], [margin.left, width - margin.right]);

  let stack = null;

  if (data) {
    stack = () => {
      const total = d3.sum(data, d => d.totalPlayTime);
      let value = 0;
      return data.map(d => ({
        name: d.intervalName,
        value: d.totalPlayTime / total,
        duration: d.totalPlayTime,
        startValue: value / total,
        endValue: (value += d.totalPlayTime) / total,
        color: d.color,
        subject: d.subjectName,
      }));
    };
  }

  const formatPercent = x.tickFormat(null, '%');

  let genGraph = () => {};

  if (data) {
    genGraph = () => {
      d3.select('#svg-day svg').remove();

      const svg = d3
        .select('#svg-day')
        .append('svg')
        .attr('viewBox', [0, 0, width, height])
        .style('display', 'block');

      svg
        .append('g')
        .selectAll('rect')
        .data(stack())
        .join('rect')
        .attr('fill', d => d.color)
        .attr('x', d => x(d.startValue))
        .attr('y', margin.top)
        .attr('width', d => x(d.endValue) - x(d.startValue))
        .attr('height', height - margin.top - margin.bottom)
        .append('title')
        .text(d => `${d.name}${formatPercent(d.value)}`);

      return svg.node();
    };
  }

  return (
    <div
      className='mt-4 mb-4'
      style={{
        padding: '1rem 2rem 1rem 2rem',
        border: '#fdfdfd solid 2px',
        overflow: 'auto',
        position: 'relative',
        borderRadius: '10px',
        boxShadow: '3px 3px 5px rgba(0, 0, 0, 0.5)',
        backgroundColor: 'rgba(255, 255, 255, 0.6)',
      }}
    >
      {date && (
        <NavDate
          date={date}
          dayIndex={dayIndex}
          setDayIndex={setDayIndex}
          maxIndex={vizData.length - 1}
        />
      )}
      <h4 className='text-center mt-3'>
        {totalDuration && toStringTimeFormatter(formattedDuration)}
      </h4>
      <div
        className='mb-3 mt-4'
        style={{ borderRadius: '1rem', overflow: 'hidden' }}
        id='svg-day'
      ></div>
      <div className='d-flex justify-content-between flex-wrap mb-2'>
        {data &&
          stack().map((d, i) => (
            <div key={i} className='mb-2' style={{ minWidth: '12rem' }}>
              <div
                style={{
                  height: '1rem',
                  width: '1rem',
                  borderRadius: '0.5rem',
                  backgroundColor: d.color,
                  display: 'inline-block',
                }}
              ></div>

              <span style={{ fontWeight: 'bold', padding: '1rem .5rem' }}>
                {toStringTimeFormatter(timeFormatter(d.duration))}
              </span>
              <span style={{ fontSize: '1rem' }}>{d.name}</span>
              <span style={{ fontWeight: 'bold', padding: '1rem .5rem' }}>
                {formatPercent(d.value)}
              </span>
            </div>
          ))}
      </div>

      <div
        className='d-flex justify-content-between flex-wrap pt-2'
        style={{ borderTop: '1px solid grey', color: 'grey' }}
      >
        {subjectData &&
          subjectData.map((s, i) => (
            <h5 key={i} className='m-0'>
              {`${s.subjectName}: `}
              <span style={{ color: 'black' }}>
                {toStringTimeFormatter(timeFormatter(s.totalPlayTime))}
              </span>
            </h5>
          ))}
      </div>
    </div>
  );
};

export default DailyActivity;
