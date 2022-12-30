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

const YearlyActivityPie = () => {
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
            });
          });
      });

    const secondPass = {};
    firstPass.forEach(item => {
      if (!secondPass[item.name]) secondPass[item.name] = [];
      secondPass[item.name].push(item);
    });

    // console.log(secondPass);

    const lastPass = [];

    for (const [key, value] of Object.entries(secondPass)) {
      let prevKey;
      if (!prevKey) prevKey = key;
      if (prevKey === key) {
        const temp = { value: 0 };
        temp.name = value[0].name;
        value.forEach(v => {
          temp.value += v.value;
        });
        lastPass.push(temp);
      } else {
        prevKey = key;
      }
    }

    console.log(lastPass);

    return lastPass;
  };

  const dispatch = useDispatch();

  const activity = ['Admin', 'Training', 'Billable'];

  // const data = [
  //   { date: 'March', name: 'Admin', duration: 598478 },
  //   { date: 'April', name: 'Admin', duration: 106741 },
  //   { date: 'Mai', name: 'Admin', duration: 892083 },
  //   { date: 'Juin', name: 'Admin', duration: 392177 },
  //   { date: 'July', name: 'Admin', duration: 5038433 },
  //   { date: 'August', name: 'Admin', duration: 690830 },
  //   { date: 'March', name: 'Training', duration: 598478 },
  //   { date: 'April', name: 'Training', duration: 106741 },
  //   { date: 'Mai', name: 'Training', duration: 892083 },
  //   { date: 'Juin', name: 'Training', duration: 392177 },
  //   { date: 'July', name: 'Training', duration: 5038433 },
  //   { date: 'August', name: 'Training', duration: 690830 },
  //   { date: 'March', name: 'Billable', duration: 598478 },
  //   { date: 'April', name: 'Billable', duration: 106741 },
  //   { date: 'Mai', name: 'Billable', duration: 892083 },
  //   { date: 'Juin', name: 'Billable', duration: 392177 },
  //   { date: 'July', name: 'Billable', duration: 5038433 },
  //   { date: 'August', name: 'Billable', duration: 690830 },
  // ];

  const mockData = [
    { name: '<5', value: 19912018 },
    { name: '5-9', value: 20501982 },
    { name: '10-14', value: 20679786 },
    { name: '15-19', value: 21354481 },
    { name: '20-24', value: 22604232 },
    { name: '25-29', value: 21698010 },
    { name: '30-34', value: 21183639 },
    { name: '35-39', value: 19855782 },
    { name: '40-44', value: 20796128 },
    { name: '45-49', value: 21370368 },
    { name: '50-54', value: 22525490 },
    { name: '55-59', value: 21001947 },
    { name: '60-64', value: 18415681 },
    { name: '65-69', value: 14547446 },
    { name: '70-74', value: 10587721 },
    { name: '75-79', value: 7730129 },
    { name: '80-84', value: 5811429 },
    { name: '≥85', value: 5938752 },
  ];

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
      function DonutChart(
        data,
        {
          name = ([x]) => x, // given d in data, returns the (ordinal) label
          value = ([, y]) => y, // given d in data, returns the (quantitative) value
          title, // given d in data, returns the title text
          width = 640, // outer width, in pixels
          height = 400, // outer height, in pixels
          innerRadius = Math.min(width, height) / 3.2, // inner radius of pie, in pixels (non-zero for donut)
          outerRadius = Math.min(width, height) / 2, // outer radius of pie, in pixels
          labelRadius = (innerRadius + outerRadius) / 2, // center radius of labels
          format = ',', // a format specifier for values (in the label)
          names, // array of names (the domain of the color scale)
          colors, // array of colors for names
          stroke = innerRadius > 0 ? 'none' : 'white', // stroke separating widths
          strokeWidth = 1, // width of stroke separating wedges
          strokeLinejoin = 'round', // line join of stroke separating wedges
          padAngle = stroke === 'none' ? 1 / outerRadius : 0, // angular separation between wedges
        } = {}
      ) {
        // Compute values.
        const N = d3.map(data, name);
        const V = d3.map(data, value);
        const I = d3.range(N.length).filter(i => !isNaN(V[i]));

        // Unique the names.
        if (names === undefined) names = N;
        names = new d3.InternSet(names);

        // Chose a default color scheme based on cardinality.
        if (colors === undefined) colors = d3.schemeSpectral[names.size];
        if (colors === undefined)
          colors = d3.quantize(
            t => d3.interpolateSpectral(t * 0.8 + 0.1),
            names.size
          );

        // Construct scales.
        const color = d3.scaleOrdinal(names, ['#f06000', '#dd69b3', '#60a951']);

        // Compute titles.
        if (title === undefined) {
          const formatValue = d3.format(format);
          title = i => `${N[i]}\n${formatValue(V[i])}`;
        } else {
          const O = d3.map(data, d => d);
          const T = title;
          title = i => T(O[i], i, data);
        }

        // Construct arcs.
        const arcs = d3
          .pie()
          .padAngle(padAngle)
          .sort(null)
          .value(i => V[i])(I);
        const arc = d3.arc().innerRadius(innerRadius).outerRadius(outerRadius);
        const arcLabel = d3
          .arc()
          .innerRadius(labelRadius)
          .outerRadius(labelRadius);

        const svg = d3
          .create('svg')
          .attr('width', width)
          .attr('height', height)
          .attr('viewBox', [-width / 2, -height / 2, width, height])
          .attr('style', 'max-width: 100%; height: auto; height: intrinsic;');

        svg
          .append('g')
          .attr('stroke', stroke)
          .attr('stroke-width', strokeWidth)
          .attr('stroke-linejoin', strokeLinejoin)
          .selectAll('path')
          .data(arcs)
          .join('path')
          .attr('fill', d => color(N[d.data]))
          .attr('d', arc)
          .append('title')
          .text(d => title(d.data));

        svg
          .append('g')
          .attr('font-family', 'sans-serif')
          .attr('font-size', 10)
          .attr('text-anchor', 'middle')
          .selectAll('text')
          .data(arcs)
          .join('text')
          .attr('transform', d => `translate(${arcLabel.centroid(d)})`)
          .selectAll('tspan')
          .data(d => {
            const lines = `${title(d.data)}`.split(/\n/);
            return d.endAngle - d.startAngle > 0.25 ? lines : lines.slice(0, 1);
          })
          .join('tspan')
          .attr('x', 0)
          .attr('y', (_, i) => `${i * 1.1}em`)
          .attr('font-weight', (_, i) => (i ? null : 'bold'))
          .text(d => d);

        const container = document.getElementById('svg-year-pie');
        if (container) {
          container.innerHTML = '';
          container.appendChild(svg.node());
        }

        // return Object.assign(svg.node(), {scales: {color}});
      }

      const chart = DonutChart(data, {
        name: d => d.name,
        value: d => d.value,
        width: 500,
        height: 500,
      });
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
        id='svg-year-pie'
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
        <h5 className='m-0'>Genesys</h5>
      </div>
    </div>
  );
};

export default YearlyActivityPie;
