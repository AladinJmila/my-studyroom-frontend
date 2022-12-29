import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as d3 from 'd3';
import NavDate from './NavDate';
import {
  timeFormatter,
  toStringTimeFormatter,
  weekPaginate,
  monthPaginate,
  yearPaginate,
} from '../services/StatsService';
import {
  setSelectedDayViz,
  loadVizData,
} from '../../store/apps/timerRecordsActions';
import { consoleSandbox } from '@sentry/utils';

const YearlyActivity = () => {
  const { vizData } = useSelector(state => state.apps.timerRecords);
  const [dayIndex, setDayIndex] = useState(vizData?.length - 1);
  // const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  // if (vizData) {
  // weekPaginate(vizData);
  // monthPaginate(vizData);
  const filterData = {
    subject: { name: 'Genesys', _id: '620e13f300b78f00146ff85e' },
    groups: [
      [
        { name: 'Genesys', _id: '62383ee2519aae00146fc4f4', label: 'Admin' },
        { name: 'Genesys-DX', _id: null, label: 'Admin' },
        { name: 'Planning', _id: null, label: 'Admin' },
      ],
      [
        {
          name: 'Training',
          _id: '62383fa1519aae00146fc4f6',
          label: 'Training',
        },
        { name: 'GenEd-Training', _id: null, label: 'Training' },
        { name: 'GenEd-PersonalGrowth', _id: null, label: 'Training' },
        { name: 'Coding', _id: null, label: 'Training' },
        { name: 'Design', _id: null, label: 'Training' },
      ],
      [
        {
          name: 'RBS',
          _id: '630884ed86c2d30014c4baea',
          label: 'Billable',
        },
        {
          name: 'RBS Bankline',
          _id: '630884ed86c2d30014c4baea',
          label: 'Billable',
        },
        {
          name: 'Vodafone',
          _id: '62b44080a3eabc00145a2207',
          label: 'Billable',
        },
        {
          name: 'SeeGroup',
          _id: '6266850ace78b30014ff5e2a',
          label: 'Billable',
        },
        {
          name: 'NatWest',
          _id: '624abd670a679200141215c9',
          label: 'Billable',
        },
        { name: 'ATOS', _id: '6241c1bbd4fda20014682c00', label: 'Billable' },
      ],
    ],
  };
  // }

  const modelData = data => {
    const firstPass = [];
    data &&
      data.forEach(d => {
        d.activities.length &&
          d.activities.forEach(a => {
            firstPass.push({
              date: d.date,
              name: a.label,
              value: a.totalDuration,
            });
          });
      });

    const secondPass = {};
    firstPass.forEach(item => {
      if (!secondPass[item.name]) secondPass[item.name] = [];
      secondPass[item.name].push(item);
    });

    const lastPass = [];
    for (const [key, value] of Object.entries(secondPass)) lastPass.push(value);

    return lastPass;
  };

  // const modelData = data => {
  //   data.forEach(d => {
  //     d.activites?.forEach(a => {
  //       console.log({
  //         date: d.date,
  //         name: a.label,
  //         value: a.totalDuration,
  //       });
  //     });
  //   });
  // };

  const dispatch = useDispatch();

  const data = [
    [
      { date: '2014-09-14T23:00Z', name: 'AMZN', value: 331.320007 },
      { date: '2014-09-21T23:00Z', name: 'AMZN', value: 323.209991 },
      { date: '2014-09-28T23:00Z', name: 'AMZN', value: 322.73999 },
      { date: '2014-10-05T23:00Z', name: 'AMZN', value: 311.390015 },
      { date: '2014-10-12T23:00Z', name: 'AMZN', value: 303.640015 },
      { date: '2014-10-19T23:00Z', name: 'AMZN', value: 287.059998 },
    ],
    [
      { date: '2014-09-14T23:00Z', name: 'GOOG', value: 594.447937 },
      { date: '2014-09-21T23:00Z', name: 'GOOG', value: 575.519897 },
      { date: '2014-09-28T23:00Z', name: 'GOOG', value: 573.704895 },
      { date: '2014-10-05T23:00Z', name: 'GOOG', value: 542.999207 },
      { date: '2014-10-12T23:00Z', name: 'GOOG', value: 509.770416 },
      { date: '2014-10-19T23:00Z', name: 'GOOG', value: 538.302063 },
    ],
  ];

  useEffect(() => {
    // dispatch(loadVizData());
    dispatch(setSelectedDayViz(vizData[dayIndex]));
    setFilteredData(yearPaginate(vizData, filterData));
    // setData(modelData(filteredData[1]));

    LineChart(data);

    // console.log(date);
    // console.log(data);
    // console.log(dayIndex);
    // console.log(vizData);
  }, [data.length]);

  function LineChart(
    data,
    {
      x = ([x]) => x, // given d in data, returns the (temporal) x-value
      y = ([, y]) => y, // given d in data, returns the (quantitative) y-value
      z = () => 1, // given d in data, returns the (categorical) z-value
      title, // given d in data, returns the title text
      defined, // for gaps in data
      curve = d3.curveLinear, // method of interpolation between points
      marginTop = 20, // top margin, in pixels
      marginRight = 30, // right margin, in pixels
      marginBottom = 30, // bottom margin, in pixels
      marginLeft = 40, // left margin, in pixels
      width = 640, // outer width, in pixels
      height = 400, // outer height, in pixels
      xType = d3.scaleUtc, // type of x-scale
      xDomain, // [xmin, xmax]
      xRange = [marginLeft, width - marginRight], // [left, right]
      yType = d3.scaleLinear, // type of y-scale
      yDomain, // [ymin, ymax]
      yRange = [height - marginBottom, marginTop], // [bottom, top]
      yFormat, // a format specifier string for the y-axis
      yLabel, // a label for the y-axis
      zDomain, // array of z-values
      color = 'currentColor', // stroke color of line, as a constant or a function of *z*
      strokeLinecap, // stroke line cap of line
      strokeLinejoin, // stroke line join of line
      strokeWidth = 1.5, // stroke width of line
      strokeOpacity, // stroke opacity of line
      mixBlendMode = 'multiply', // blend mode of lines
      voronoi, // show a Voronoi overlay? (for debugging)
    } = {}
  ) {
    // Compute values.
    const X = d3.map(data, x);
    const Y = d3.map(data, y);
    const Z = d3.map(data, z);
    const O = d3.map(data, d => d);
    if (defined === undefined) defined = (d, i) => !isNaN(X[i]) && !isNaN(Y[i]);
    const D = d3.map(data, defined);

    // Compute default domains, and unique the z-domain.
    if (xDomain === undefined) xDomain = d3.extent(X);
    if (yDomain === undefined)
      yDomain = [0, d3.max(Y, d => (typeof d === 'string' ? +d : d))];
    if (zDomain === undefined) zDomain = Z;
    zDomain = new d3.InternSet(zDomain);

    // Omit any data not present in the z-domain.
    const I = d3.range(X.length).filter(i => zDomain.has(Z[i]));

    // Construct scales and axes.
    const xScale = xType(xDomain, xRange);
    const yScale = yType(yDomain, yRange);
    const xAxis = d3
      .axisBottom(xScale)
      .ticks(width / 80)
      .tickSizeOuter(0);
    const yAxis = d3.axisLeft(yScale).ticks(height / 60, yFormat);

    // Compute titles.
    const T =
      title === undefined ? Z : title === null ? null : d3.map(data, title);

    // Construct a line generator.
    const line = d3
      .line()
      .defined(i => D[i])
      .curve(curve)
      .x(i => xScale(X[i]))
      .y(i => yScale(Y[i]));

    const svg = d3
      .select('#svg-year')
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .attr('viewBox', [0, 0, width, height])
      .attr('style', 'max-width: 100%; height: auto; height: intrinsic;')
      .style('-webkit-tap-highlight-color', 'transparent')
      .on('pointerenter', pointerentered)
      .on('pointermove', pointermoved)
      .on('pointerleave', pointerleft)
      .on('touchstart', event => event.preventDefault());

    // An optional Voronoi display (for fun).
    if (voronoi)
      svg
        .append('path')
        .attr('fill', 'none')
        .attr('stroke', '#ccc')
        .attr(
          'd',
          d3.Delaunay.from(
            I,
            i => xScale(X[i]),
            i => yScale(Y[i])
          )
            .voronoi([0, 0, width, height])
            .render()
        );

    svg
      .append('g')
      .attr('transform', `translate(0,${height - marginBottom})`)
      .call(xAxis);

    svg
      .append('g')
      .attr('transform', `translate(${marginLeft},0)`)
      .call(yAxis)
      .call(g => g.select('.domain').remove())
      .call(
        voronoi
          ? () => {}
          : g =>
              g
                .selectAll('.tick line')
                .clone()
                .attr('x2', width - marginLeft - marginRight)
                .attr('stroke-opacity', 0.1)
      )
      .call(g =>
        g
          .append('text')
          .attr('x', -marginLeft)
          .attr('y', 10)
          .attr('fill', 'currentColor')
          .attr('text-anchor', 'start')
          .text(yLabel)
      );

    const path = svg
      .append('g')
      .attr('fill', 'none')
      .attr('stroke', typeof color === 'string' ? color : null)
      .attr('stroke-linecap', strokeLinecap)
      .attr('stroke-linejoin', strokeLinejoin)
      .attr('stroke-width', strokeWidth)
      .attr('stroke-opacity', strokeOpacity)
      .selectAll('path')
      .data(d3.group(I, i => Z[i]))
      .join('path')
      .style('mix-blend-mode', mixBlendMode)
      .attr('stroke', typeof color === 'function' ? ([z]) => color(z) : null)
      .attr('d', ([, I]) => line(I));

    const dot = svg.append('g').attr('display', 'none');

    dot.append('circle').attr('r', 2.5);

    dot
      .append('text')
      .attr('font-family', 'sans-serif')
      .attr('font-size', 10)
      .attr('text-anchor', 'middle')
      .attr('y', -8);

    function pointermoved(event) {
      const [xm, ym] = d3.pointer(event);
      const i = d3.least(I, i =>
        Math.hypot(xScale(X[i]) - xm, yScale(Y[i]) - ym)
      ); // closest point
      path
        .style('stroke', ([z]) => (Z[i] === z ? null : '#ddd'))
        .filter(([z]) => Z[i] === z)
        .raise()
        .filter(() => console.log(X[i]));
      // dot.attr('transform', `translate(${xScale(X[i])},${yScale(Y[i])})`);
      if (T) dot.select('text').text(T[i]);
      svg.property('value', O[i]).dispatch('input', { bubbles: true });
    }

    function pointerentered() {
      path.style('mix-blend-mode', null).style('stroke', '#ddd');
      dot.attr('display', null);
    }

    function pointerleft() {
      path.style('mix-blend-mode', mixBlendMode).style('stroke', null);
      dot.attr('display', 'none');
      svg.node().value = null;
      svg.dispatch('input', { bubbles: true });
    }

    return Object.assign(svg.node(), { value: null });
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
      {/* {date && (
        <NavDate
          date={date}
          dayIndex={dayIndex}
          setDayIndex={setDayIndex}
          maxIndex={vizData.length - 1}
        />
      )} */}
      <h4 className='text-center mt-3'>
        {/* {totalDuration && toStringTimeFormatter(formattedDuration)} */}
      </h4>
      <div
        className='mb-3 mt-4'
        style={{ borderRadius: '1rem', overflow: 'hidden' }}
        id='svg-year'
      ></div>
      <div className='d-flex justify-content-between flex-wrap mb-2'>
        {/* {data &&
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
          ))} */}
      </div>

      <div
        className='d-flex justify-content-between flex-wrap pt-2'
        style={{ borderTop: '1px solid grey', color: 'grey' }}
      >
        {/* {subjectData &&
          subjectData.map((s, i) => (
            <h6 key={i} className='m-0'>
              {`${s.subjectName}: `}
              <span style={{ color: 'black' }}>
                {toStringTimeFormatter(timeFormatter(s.totalPlayTime))}
              </span>
            </h6>
          ))} */}
      </div>
    </div>
  );
};

export default YearlyActivity;
