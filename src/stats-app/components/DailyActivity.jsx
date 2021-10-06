import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import * as d3 from 'd3'

const DailyActivity = () => {
  const { vizData } = useSelector(state => state.apps.timerRecords)
  const data = vizData[4]?.activity
  data && console.log(data)

  // const data = [
  //   { intervalName: 'Study Hard', totalTime: 45, color: '#fe452d' },
  //   { intervalName: 'Break', totalTime: 10, color: '#da92e1' },
  //   { intervalName: 'Study Easy', totalTime: 30, color: '#e9abc4' },
  //   { intervalName: 'Meditation', totalTime: 10, color: '#e934c4' },
  //   { intervalName: 'Coding', totalTime: 60, color: '#0934b1' },
  //   { intervalName: 'Stretching', totalTime: 5, color: '#bc3e00' },
  // ]
  useEffect(() => {
    genGraph()
  }, [])

  let totalDuration = 0

  if (data) {
    totalDuration = Number.parseFloat(
      d3.sum(data, d => d.totalPlayTime) / 3600
    ).toFixed(1)
  }

  const width = 600
  const height = 15
  const margin = { top: 0, right: 0, bottom: 0, left: 0 }
  const x = d3.scaleLinear([0, 1], [margin.left, width - margin.right])

  let stack = null

  if (data) {
    stack = () => {
      const total = d3.sum(data, d => d.totalPlayTime)
      console.log(total)
      let value = 0
      return data.map(d => ({
        name: d.intervalName,
        value: d.totalPlayTime / total,
        startValue: value / total,
        endValue: (value += d.totalPlayTime) / total,
        color: d.color,
        subject: d.subjectName,
      }))
    }
  }

  // console.log(stack())

  const formatPercent = x.tickFormat(null, '%')

  let genGraph = () => {}

  if (data) {
    genGraph = () => {
      const svg = d3
        .select('#svg')
        .append('svg')
        .attr('viewBox', [0, 0, width, height])
        .style('display', 'block')

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
  }

  return (
    <>
      {data && (
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
          <h4 className='text-center'>{`${totalDuration} Hours`}</h4>
          <div
            className='mb-3 mt-4'
            style={{ borderRadius: '1rem', overflow: 'hidden' }}
            id='svg'
          ></div>
          <div className='d-flex justify-content-between flex-wrap mb-2'>
            {data &&
              stack().map(d => (
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
      )}
    </>
  )
}

export default DailyActivity
