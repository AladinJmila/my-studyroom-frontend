import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import * as d3 from 'd3'

let transValue = 0
let prevValue = 0

const DailyActivity = () => {
  // const data = useSelector(state => state.apps.timerRecords.vizData)

  const data = [
    { intervalName: 'Study Hard', value: 45, color: '#fe452d' },
    { intervalName: 'Break', value: 10, color: '#da92e1' },
    { intervalName: 'Study Easy', value: 30, color: '#e9abc4' },
    { intervalName: 'Meditation', value: 10, color: '#e934c4' },
    { intervalName: 'Sleep', value: 60, color: '#0934b1' },
  ]
  const scaleData = data.map(d => d.value)
  const width = 600
  const height = 33
  const margin = { top: 0, right: 0, bottom: 0, left: 0 }
  const x = d3.scaleLinear([0, 1], [margin.left, width - margin.right])

  const stack = () => {
    const total = d3.sum(data, d => d.value)
    let value = 0
    return data.map(d => ({
      name: d.intervalName,
      value: d.value / total,
      startValue: value / total,
      endValue: (value += d.value) / total,
      color: d.color,
    }))
  }

  console.log(stack())

  useEffect(() => {
    genGraph()
  }, [])

  const genGraph = () => {
    const svg = d3
      .select('#svg')
      .append('svg')
      .attr('viewBox', [0, 0, width, height])
      .style('display', 'block')
    // .attr('width', width)
    // .attr('height', barHeight * data.length)

    svg
      .append('g')
      .attr('stroke', 'white')
      .selectAll('rect')
      .data(stack)
      .join('rect')
      .attr('fill', d => d.color)
      .attr('x', d => x(d.startValue))
      .attr('y', margin.top)
      .attr('width', d => x(d.endValue) - x(d.startValue))
      .attr('height', height - margin.top - margin.bottom)
      .append('title')
      .text(d => d.name)

    return svg.node()

    // const bar = svg
    //   .selectAll('svg')
    //   .data(data)
    //   .enter()
    //   .append('g')
    //   .attr('transform', (d, i) => {
    //     // console.log(transValue)
    //     const trans = `translate(${transValue - prevValue}, 0)`
    //     transValue += scale(d.value)
    //     // console.log(scale(d.value))

    //     return trans
    //   })
    // .attr('transform', (d, i) => `translate(0, ${i * barHeight})`)

    // transValue = 0

    // bar
    //   .append('rect')
    //   .attr('width', d => {
    //     transValue += scale(d.value) - prevValue
    //     prevValue = scale(d.value)
    //     return prevValue
    //   })
    //   .attr('height', barHeight - 1)
    //   .attr('fill', d => d.color)

    // transValue = 0
    // bar
    //   .append('text')
    //   .attr('x', d => {
    //     transValue += d.value * scaleFactor - prevValue
    //     prevValue = d.value * scaleFactor
    //     return prevValue / 2
    //   })
    //   .attr('y', barHeight / 2)
    //   .attr('dy', '.35em')
    //   .text(d => d.value)

    // transValue = 0
  }

  return (
    <div className='mt-4 mb-4' style={{ width: '100%' }}>
      <h1>Daily Activity</h1>
      <div id='svg'></div>
    </div>
  )
}

export default DailyActivity

// const width= 600
// const height = 200
// const margin = {top: 30, right: 10, bottom: 0, left: 30}
// const formatValue = x => isNaN(x) ? 'N/A' : x.toLacaleString('en')
// const formatPercent = d3.format('.1%')
// const x = d3.scaleLinear()
//             .range([margin.left, width - margin.right])
// const y = 0
// // const y = d3.scaleBand()
// //             .domain(data?.map(d => d.name))
// //             .range([margin.top, height - margin.bottom])
// //             .padding(0.08)

// const XAxis = g => g.attr('transform', `translate(${margin.left},0)`)
//                     .call(d3.axisTop(x).ticks(width / 100, '%'))
//                     .call(g => g.selectAll('.domain'.remove()))

// const yAxis = g => g.att('transfrom', `translate(${margin.left},0)`)
//                     .call(d3.axisLeft(y).tickSizeOuter(0))
//                     .call(g => g.selectAll('.domain').remove())

// // const color = d3.scaleOrdinal()
// //                 .domain(data?.map(d => d.key))
// //                 .range(d3.schemeSpectral[data.length])
// //                 .unknown('#ccc')

// const chart = () => {
//     const svg = d3.create('svg')
//                 .attr('viewBox', [0, 0, width, height])
//                 .style('overflow', 'visible')

//     svg.append('g')
//       .selectAll('g')
//       .data(data)
//         .enter().append('g')
//       .attr('fill', d => d.color)
//       .selectAll('rect')
//       .data(d => d)
//       .join('rect')
//         .attr('x', d => x(d[0]))
//         .attr('y', (d, i) => y())
// }
