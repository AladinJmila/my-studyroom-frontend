import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as d3 from 'd3';
// import legend from 'd3-color-legend';
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

const YearlyActivityBar = () => {
  const { vizData } = useSelector(state => state.apps.timerRecords);
  const [dayIndex, setDayIndex] = useState(vizData?.length - 1);
  const [data, setData] = useState([]);
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
            let date = new Date(d.date);
            // (date = date.toLocaleString('default', { month: 'long' })),
            firstPass.push({
              date:
                date.toLocaleString('default', { month: 'long' }) +
                ' ' +
                date.getFullYear(),
              name: a.label,
              value: a.totalDuration,
              color: a.color,
            });
          });
      });

    const secondPass = {};
    firstPass.forEach(item => {
      if (!secondPass[item.name]) secondPass[item.name] = [];
      secondPass[item.name].push(item);
    });

    const lastPass = [];
    for (const [key, value] of Object.entries(secondPass))
      lastPass.push(...value);

    return lastPass;
  };

  const dispatch = useDispatch();

  const activity = ['Admin', 'Training', 'Billable'];

  // const data = [
  //   { date: 'March', name: 'Admin', value: 598478 },
  //   { date: 'April', name: 'Admin', value: 106741 },
  //   { date: 'Mai', name: 'Admin', value: 892083 },
  //   { date: 'Juin', name: 'Admin', value: 392177 },
  //   { date: 'July', name: 'Admin', value: 5038433 },
  //   { date: 'August', name: 'Admin', value: 690830 },
  //   { date: 'March', name: 'Training', value: 598478 },
  //   { date: 'April', name: 'Training', value: 106741 },
  //   { date: 'Mai', name: 'Training', value: 892083 },
  //   { date: 'Juin', name: 'Training', value: 392177 },
  //   { date: 'July', name: 'Training', value: 5038433 },
  //   { date: 'August', name: 'Training', value: 690830 },
  //   { date: 'March', name: 'Billable', value: 598478 },
  //   { date: 'April', name: 'Billable', value: 106741 },
  //   { date: 'Mai', name: 'Billable', value: 892083 },
  //   { date: 'Juin', name: 'Billable', value: 392177 },
  //   { date: 'July', name: 'Billable', value: 5038433 },
  //   { date: 'August', name: 'Billable', value: 690830 },
  // ];

  useEffect(() => {
    // dispatch(loadVizData());
    dispatch(setSelectedDayViz(vizData[dayIndex]));
    setFilteredData(yearPaginate(vizData, filterData));

    setData(modelData(filteredData[1]));
    // modelData(filteredData[1]);

    genGraph();

    // console.log(date);
    // console.log(data);
    // console.log(dayIndex);
    // console.log(vizData);
  }, [data.length, vizData]);

  let genGraph = () => {};

  if (data.length) {
    genGraph = () => {
      function StackedBarChart(
        data,
        {
          x = (d, i) => i, // given d in data, returns the (ordinal) x-value
          y = d => d, // given d in data, returns the (quantitative) y-value
          z = () => 1, // given d in data, returns the (categorical) z-value
          title, // given d in data, returns the title text
          marginTop = 30, // top margin, in pixels
          marginRight = 0, // right margin, in pixels
          marginBottom = 30, // bottom margin, in pixels
          marginLeft = 40, // left margin, in pixels
          width = 640, // outer width, in pixels
          height = 400, // outer height, in pixels
          xDomain, // array of x-values
          xRange = [marginLeft, width - marginRight], // [left, right]
          xPadding = 0.3, // amount of x-range to reserve to separate bars
          yType = d3.scaleLinear, // type of y-scale
          yDomain, // [ymin, ymax]
          yRange = [height - marginBottom, marginTop], // [bottom, top]
          zDomain, // array of z-values
          offset = d3.stackOffsetDiverging, // stack offset method
          order = d3.stackOrderNone, // stack order method
          yFormat, // a format specifier string for the y-axis
          yLabel, // a label for the y-axis
          colors = d3.schemeTableau10, // array of colors
        } = {}
      ) {
        // Compute values.
        const X = d3.map(data, x);
        const Y = d3.map(data, y);
        const Z = d3.map(data, z);

        // Compute default x- and z-domains, and unique them.
        if (xDomain === undefined) xDomain = X;
        if (zDomain === undefined) zDomain = Z;
        xDomain = new d3.InternSet(xDomain);
        zDomain = new d3.InternSet(zDomain);

        // Omit any data not present in the x- and z-domains.
        const I = d3
          .range(X.length)
          .filter(i => xDomain.has(X[i]) && zDomain.has(Z[i]));

        // Compute a nested array of series where each series is [[y1, y2], [y1, y2],
        // [y1, y2], …] representing the y-extent of each stacked rect. In addition,
        // each tuple has an i (index) property so that we can refer back to the
        // original data point (data[i]). This code assumes that there is only one
        // data point for a given unique x- and z-value.
        const series = d3
          .stack()
          .keys(zDomain)
          .value(([x, I], z) => Y[I.get(z)])
          .order(order)
          .offset(offset)(
            d3.rollup(
              I,
              ([i]) => i,
              i => X[i],
              i => Z[i]
            )
          )
          .map(s => s.map(d => Object.assign(d, { i: d.data[1].get(s.key) })));

        // Compute the default y-domain. Note: diverging stacks can be negative.
        if (yDomain === undefined) yDomain = d3.extent(series.flat(2));

        // Construct scales, axes, and formats.
        const xScale = d3.scaleBand(xDomain, xRange).paddingInner(xPadding);
        const yScale = yType(yDomain, yRange);
        // const color = d3.scaleOrdinal(zDomain, colors);
        const color = d3.scaleOrdinal(zDomain, [
          '#f06000',
          '#dd69b3',
          '#60a951',
        ]);
        const xAxis = d3.axisBottom(xScale).tickSizeOuter(0);
        const yAxis = d3.axisLeft(yScale).ticks(height / 60, yFormat);

        // Compute titles.
        if (title === undefined) {
          const formatValue = yScale.tickFormat(100, yFormat);
          title = i => `${X[i]}\n${Z[i]}\n${formatValue(Y[i])}`;
        } else {
          const O = d3.map(data, d => d);
          const T = title;
          title = i => T(O[i], i, data);
        }

        let svg = d3

          .create('svg')
          .attr('width', width)
          .attr('height', height)
          .attr('viewBox', [0, 0, width, height])
          .attr('style', 'max-width: 100%; height: auto; height: intrinsic;');

        svg
          .append('g')
          .attr('transform', `translate(${marginLeft},0)`)
          .call(yAxis)
          .call(g => g.select('.domain').remove())
          .call(g =>
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
              .attr('class', 'y-label')
          );

        const bar = svg
          .append('g')
          .selectAll('g')
          .data(series)
          .join('g')
          .attr('fill', ([{ i }]) => color(Z[i]))
          .selectAll('rect')
          .data(d => d)
          .join('rect')
          .attr('x', ({ i }) => xScale(X[i]))
          // .attr('x', 0)
          .attr('y', ([y1, y2]) => Math.min(yScale(y1), yScale(y2)))
          .attr('height', ([y1, y2]) => Math.abs(yScale(y1) - yScale(y2)))
          .attr('width', xScale.bandwidth());

        if (title) bar.append('title').text(({ i }) => title(i));

        svg
          .append('g')
          .attr('transform', `translate(0,${yScale(0)})`)
          .call(xAxis);

        const container = document.getElementById('svg-year-bar');
        if (container) {
          container.innerHTML = '';
          container.appendChild(svg.node());
        }

        // return Object.assign(svg.node(), { scales: { color } });
      }

      const chart = StackedBarChart(data, {
        x: d => d.date,
        y: d => d.value / 60 / 60 / 4,
        z: d => d.name,
        // xDomain: d3.groupSort(
        //   data,
        //   D => d3.sum(D, d => -d.value),
        //   d => d.date
        // ),
        yLabel: 'Hours',
        zDomain: activity,
        colors: d3.schemeSpectral[activity.length],
        width: 1800,
        height: 500,
      });

      // if (chart) {
      //   const key = legend(chart.scales.color, { title: 'Age (years)' }); // try also Swatches
      // }
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
      {/* {date && (
        <NavDate
          date={date}
          dayIndex={dayIndex}
          setDayIndex={setDayIndex}
          maxIndex={vizData.length - 1}
        />
      )} */}
      {/* <h4 className='text-center mt-3'>
        {totalDuration && toStringTimeFormatter(formattedDuration)}
      </h4> */}
      <div
        className='mb-3 mt-4'
        style={{ borderRadius: '1rem', overflow: 'hidden' }}
        id='svg-year-bar'
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
                {toStringTimeFormatter(timeFormatter(d.value))}
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
        <h5 className='m-0'>Genesys</h5>
      </div>
    </div>
  );
};

export default YearlyActivityBar;
