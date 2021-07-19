import PlayPauseStep from './../../common/PlayPauseStep'
import { useState } from 'react'
import { playStartBeep, computeHalfInterval } from '../services/timerServices'
import beep from '../../static/audio/beep-07a.wav'
import beepHalf from '../../static/audio/beep-09.wav'

const myBeep = new Audio(beep)
const myHalfBeep = new Audio(beepHalf)
let trackIndex = 1
let roundIndex = 1
let repNum = 1

const NavBarIntervalsCard = ({ intervals, numOfReps }) => {
  const loopLength = intervals.length
  if (numOfReps > 1) {
    let i = 0
    let extendedIntervlas = []
    while (i < numOfReps) {
      extendedIntervlas.push(...intervals)
      i++
    }
    intervals = [...extendedIntervlas]
  }

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
  const [progress, setProgress] = useState(0)

  const halfInterval = computeHalfInterval(currentInterval)
  const intervalDurationInSeconds =
    (currentInterval.totalDuration.hours * 60 +
      currentInterval.totalDuration.minutes) *
      60 +
    currentInterval.totalDuration.seconds
  let repDurationInseconds
  if (currentInterval.numOfReps > 1) {
    repDurationInseconds =
      currentInterval.minutes * 60 + currentInterval.seconds
  }

  const start = () => {
    run()
    setInterv(setInterval(run, 1000))
    setPlay(true)
    playStartBeep(time, currentInterval, 2)
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
      setProgress(0)
      trackIndex++
      if ((trackIndex - 1) % loopLength === 0) roundIndex++
      repNum = 1
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
      setProgress(0)
      trackIndex--
      if (trackIndex % loopLength === 0) roundIndex--
      repNum = 1
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

    if (
      currentInterval.signalHalf &&
      updatedHours === halfInterval.hours &&
      updatedMinutes === halfInterval.minutes &&
      updatedSeconds === halfInterval.seconds
    ) {
      myHalfBeep.play()
    }

    if (updatedHours === 0 && updatedMinutes === 0 && updatedSeconds === 3) {
      let x = 0
      myBeep.play()
      const intervalId = setInterval(() => {
        myBeep.play()
        if (++x === 2) {
          clearInterval(intervalId)
        }
      }, 1000)
    }

    updatedSeconds--

    const currentTimeInSeconds =
      (updatedHours * 60 + updatedMinutes) * 60 + updatedSeconds

    const progressPercentage =
      100 - Math.floor((currentTimeInSeconds / intervalDurationInSeconds) * 100)

    if (
      currentInterval.numOfReps > 1 &&
      currentTimeInSeconds % repDurationInseconds === 0
    ) {
      if (repNum !== currentInterval.numOfReps) {
        repNum++
        myBeep.play()
      }
    }

    setProgress(progressPercentage)
    setTime({
      seconds: updatedSeconds,
      minutes: updatedMinutes,
      hours: updatedHours,
    })
  }

  const intervalsCardStyle = {
    backgroundColor: currentInterval.color,
    position: 'relative',
    padding: '0.265rem 0.75rem',
    fontFamily: 'Lucida Sans',
    width: '100%',
  }

  const labelStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderRadius: '0.25rem',
    padding: '0 1rem',
    fontSize: '1.15rem',
    postion: 'absolute',
    zIndex: 100,
  }

  const progressBar = {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    width: `${progress}%`,
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
  }

  return (
    <div className='card d-flex flex-row' style={intervalsCardStyle}>
      <div style={labelStyle}>
        <PlayPauseStep
          user
          play={play}
          onToggle={handleTogglePlay}
          onStepForward={handleStepForward}
          onStepBackward={handleStepBackward}
        />
      </div>
      <div className='text-center flex-grow-1 d-flex justify-content-around'>
        <div className='mb-0 mt-0' style={labelStyle}>
          {currentInterval.name} &nbsp;&nbsp;&nbsp;&nbsp;
          {time.hours < 10 ? `0${time.hours}` : time.hours} :&nbsp;
          {time.minutes < 10 ? `0${time.minutes}` : time.minutes} :&nbsp;
          {time.seconds < 10 ? `0${time.seconds}` : time.seconds}&nbsp;&nbsp;
          {currentInterval.numOfReps > 1 &&
            `set ${repNum} of ${currentInterval.numOfReps}`}
        </div>
      </div>
      <div
        className='float-end'
        style={labelStyle}
      >{`Round ${roundIndex} of ${numOfReps}`}</div>
      <div className='float-start' style={progressBar}></div>
    </div>
  )
}

export default NavBarIntervalsCard
