import PlayPauseStep from './../../common/PlayPauseStep'
import { useState } from 'react'

const NavBarIntervalsCard = ({ intervals }) => {
  const [intervalIndex, setIntervalIndex] = useState(0)
  const [currentInterval, setCurrentInterval] = useState(
    intervals[intervalIndex]
  )
  const [time, setTime] = useState({
    seconds: currentInterval.totalDuration.seconds,
    minutes: currentInterval.totalDuration.minutes,
    hours: currentInterval.totalDuration.hours,
  })
  const [interv, setInterv] = useState()
  const [play, setPlay] = useState(false)

  const start = () => {
    run()
    setInterv(setInterval(run, 1000))
    setPlay(true)
  }

  const stop = () => {
    clearInterval(interv)
    setPlay(false)
  }

  const handleTogglePlay = () => {
    play ? stop() : start()
  }

  const handleStepForward = () => {
    if (intervalIndex < intervals.length - 1) {
      const newIntervalIndex = intervalIndex + 1
      setIntervalIndex(newIntervalIndex)
      setCurrentInterval(intervals[newIntervalIndex])
      clearInterval(interv)
      setTime({
        seconds: intervals[newIntervalIndex].totalDuration.seconds,
        minutes: intervals[newIntervalIndex].totalDuration.minutes,
        hours: intervals[newIntervalIndex].totalDuration.hours,
      })
      setPlay(false)
    }
  }

  const handleStepBackward = () => {
    if (intervalIndex > 0) {
      let newIntervalIndex = intervalIndex - 1
      setIntervalIndex(newIntervalIndex)
      setCurrentInterval(intervals[newIntervalIndex])
      clearInterval(interv)
      setTime({
        seconds: intervals[newIntervalIndex].totalDuration.seconds,
        minutes: intervals[newIntervalIndex].totalDuration.minutes,
        hours: intervals[newIntervalIndex].totalDuration.hours,
      })
      setPlay(false)
    }
  }

  let updatedSeconds = time.seconds
  let updatedMinutes = time.minutes
  let updatedHours = time.hours

  const run = () => {
    if (updatedHours > 0 && updatedMinutes === 0) {
      updatedHours--
      updatedMinutes = 60
    }
    if (updatedMinutes > 0 && updatedSeconds === 0) {
      updatedMinutes--
      updatedSeconds = 60
    }

    if (updatedSeconds === 0 && updatedMinutes === 0 && updatedHours === 0)
      return stop()

    updatedSeconds--

    setTime({
      seconds: updatedSeconds,
      minutes: updatedMinutes,
      hours: updatedHours,
    })
  }

  const intervalsCardStyle = {
    backgroundColor: currentInterval.color,
    padding: '0.265rem 0.75rem',
    margin: 20,
    margin: 0,
  }

  return (
    <div style={intervalsCardStyle} className='card d-flex flex-row'>
      <div className='ms-1'>
        <PlayPauseStep
          user
          play={play}
          onToggle={handleTogglePlay}
          onStepForward={handleStepForward}
          onStepBackward={handleStepBackward}
        />
      </div>
      <div
        className='text-center flex-grow-1 ms-3 d-flex justify-content-around'
        style={{ borderLeft: '1px solid black' }}
      >
        <h6 className='ms-5 mb-0 mt-0' style={{ fontSize: '1.15rem' }}>
          {currentInterval.name} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;
          {time.hours < 10 ? `0${time.hours}` : time.hours} :&nbsp;
          {time.minutes < 10 ? `0${time.minutes}` : time.minutes} :&nbsp;
          {time.seconds < 10 ? `0${time.seconds}` : time.seconds}
        </h6>
        {/* <h6 className='me-5 mb-0 mt-0' style={{ fontSize: '1.15rem' }}>
          {time.hours < 10 ? `0${time.hours}` : time.hours} :{' '}
          {time.minutes < 10 ? `0${time.minutes}` : time.minutes} :{' '}
          {time.seconds < 10 ? `0${time.seconds}` : time.seconds}
        </h6> */}
      </div>
    </div>
  )
}

export default NavBarIntervalsCard
