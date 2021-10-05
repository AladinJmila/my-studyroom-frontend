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
    { intervalName: 'Coding', value: 60, color: '#0934b1' },
    { intervalName: 'Stretching', value: 5, color: '#bc3e00' },
  ]

  const totalTime = Number.parseFloat(d3.sum(data, d => d.value) / 60).toFixed(
    1
  )

  const width = 600
  const height = 15
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

  const formatPercent = x.tickFormat(null, '%')

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
      .selectAll('rect')
      .data(stack)
      .join('rect')
      .attr('fill', d => d.color)
      .attr('x', d => x(d.startValue))
      .attr('y', margin.top)
      .attr('width', d => x(d.endValue) - x(d.startValue))
      .attr('height', height - margin.top - margin.bottom)
      .append('title')
      .text(d => `${d.name}${formatPercent(d.value)}`)

    // svg
    //   .append('g')
    //   .attr('font-family', 'sans-serif')
    //   .attr('font-size', 12)
    //   .selectAll('text')
    //   .data(stack().filter(d => x(d.endValue) - x(d.startValue) > 40))
    //   .join('text')
    //   .attr('fill', d => (d3.lab(d.color).l < 50 ? 'white' : 'black'))
    //   .attr('transform', d => `translate(${x(d.startValue) + 6}, 6)`)
    //   .call(text =>
    //     text
    //       .append('tspan')
    //       .attr('y', '0.7em')
    //       .attr('font-weight', 'bold')
    //       .text(d => d.name)
    //   )
    //   .call(text =>
    //     text
    //       .append('tspan')
    //       .attr('x', 0)
    //       .attr('y', '1.7em')
    //       .attr('fill-opacity', 0.7)
    //       .text(d => formatPercent(d.value))
    //   )

    return svg.node()
  }

  return (
    <div
      className='mt-4 mb-4'
      style={{
        padding: '1rem 2rem 2rem 2rem',
        border: 'black solid 1px',
        backgroundColor: '#F2F2F2',
        overflow: 'auto',
        position: 'relative',
      }}
    >
      <h4 className='text-center'>{`${totalTime} Hours`}</h4>
      <div
        className='mb-3 mt-4'
        style={{ borderRadius: '1rem', overflow: 'hidden' }}
        id='svg'
      ></div>
      <div className='d-flex justify-content-between flex-wrap mb-2'>
        {stack().map(d => (
          <div className='mb-2' style={{ minWidth: '12rem' }}>
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
              {formatPercent(d.value)}
            </span>
            <span style={{ fontSize: '1rem' }}>{d.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DailyActivity
