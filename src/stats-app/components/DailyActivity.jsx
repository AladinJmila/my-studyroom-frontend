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

    
  }

  return (
    <div className='mt-4 mb-4' style={{ width: '100%' }}>
      <h1>Daily Activity</h1>
      <div id='svg'></div>
    </div>
  )
}

export default DailyActivity
