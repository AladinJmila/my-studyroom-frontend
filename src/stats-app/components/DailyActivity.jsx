import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import * as d3 from 'd3'
import NavDate from './NavDate'
import {
  timeFormatter,
  toStringTimeFormatter,
} from './../services/StatsService'

const DailyActivity = () => {
  const { vizData } = useSelector(state => state.apps.timerRecords)
  const [dayIndex, setDayIndex] = useState(vizData?.length - 1)
  const subjectData = vizData[dayIndex]?.subjectActivity
  const data = vizData[dayIndex]?.activity
  const date = vizData[dayIndex]?.date
  let learntSubjects = []
  if (data) {
    learntSubjects = new Set(data.map(item => item.subjectName))
    learntSubjects = Array.from(learntSubjects)
  }

  vizData && console.log(vizData)

  useEffect(() => {
    genGraph()
  }, [data, dayIndex])

  let totalDuration = 0
  let formattedDuration

  if (data) {
    totalDuration = Math.floor(d3.sum(data, d => d.totalPlayTime))

    formattedDuration = timeFormatter(totalDuration)
  }

  const width = 600
  const height = 15
  const margin = { top: 0, right: 0, bottom: 0, left: 0 }
  const x = d3.scaleLinear([0, 1], [margin.left, width - margin.right])

  let stack = null

  if (data) {
    stack = () => {
      const total = d3.sum(data, d => d.totalPlayTime)
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

  const formatPercent = x.tickFormat(null, '%')

  let genGraph = () => {}

  if (data) {
    genGraph = () => {
      d3.select('svg').remove()

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

      return svg.node()
    }
  }

  return (
    <div
      className='mt-4 mb-4'
      style={{
        padding: '1rem 2rem 1rem 2rem',
        border: 'black solid 1px',
        backgroundColor: '#F2F2F2',
        overflow: 'auto',
        position: 'relative',
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
        id='svg'
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
                {formatPercent(d.value)}
              </span>
              <span style={{ fontSize: '1rem' }}>{d.name}</span>
            </div>
          ))}
      </div>

      <div
        className='d-flex justify-content-between flex-wrap pt-2'
        style={{ borderTop: '1px solid grey', color: 'grey' }}
      >
        {subjectData &&
          subjectData.map((s, i) => (
            <h6 key={i} className='m-0'>
              {`${s.subjectName}: `}
              <span style={{ color: 'black' }}>
                {toStringTimeFormatter(timeFormatter(s.totalPlayTime))}
              </span>
            </h6>
          ))}
      </div>
    </div>
  )
}

export default DailyActivity
