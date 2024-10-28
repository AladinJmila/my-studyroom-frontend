import { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as workerTimers from 'worker-timers'
import { playStartBeep, computeHalfInterval } from '../services/timerServices'
import PlayPauseStep from './../../common/PlayPauseStep'
import beep from '../../static/audio/new-notification.mp3'
import beepHalf from '../../static/audio/beep-09.wav'
import { toast } from 'react-toastify'
import {
  loadNewestTimerRecord,
  updateAction,
  loadVizData,
} from '../../store/apps/timerRecordsActions'

const myBeep = new Audio(beep)
const myHalfBeep = new Audio(beepHalf)
let trackIndex = 1
let roundIndex = 1
let repNum = 1
let isPlaying = false
let recordTime
let recordInterval
let recordSubject
let newestTimerRecord
let intervalIsSet

const NavBarIntervalsCard = ({ playingSession, playingLoop }) => {
  const { subject } = playingSession
  let intervals = playingLoop.intervals
  const loopLength = intervals.length

  const [intervalIndex, setIntervalIndex] = useState(0)
  const [currentInterval, setCurrentInterval] = useState(
    intervals[intervalIndex]
  )
  const [time, setTime] = useState({
    seconds: currentInterval.totalDuration.seconds,
    minutes: currentInterval.totalDuration.minutes,
    hours: currentInterval.totalDuration.hours,
  })
  const [interv, setInterv] = useState(null)
  const [play, setPlay] = useState(false)
  const [progress, setProgress] = useState(0)

  newestTimerRecord = useSelector(state => state.apps.timerRecords)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadNewestTimerRecord())
    dispatch(loadVizData())
  }, [play])

  // Load interval object for useEffect()
  useEffect(() => {
    recordInterval = currentInterval
    recordSubject = subject
  }, [currentInterval])

  // Load interval generated by setInterval() for useEffect()
  useEffect(() => {
    intervalIsSet = interv
  }, [interv])

  // Handle play/stop actions coming from sessions card
  useEffect(() => {
    return () => {
      if (isPlaying) {
        dispatch(loadNewestTimerRecord())
        isPlaying = false
        setPlay(false)
        toast.error(`"${recordInterval.name}" stopped`)
        sendTimerState(recordTime, 'stop', recordInterval, recordSubject)
        // sendTimerState(playingTime, 'stop: session card', recInterval, recordSubject)
        if (intervalIsSet) workerTimers.clearInterval(intervalIsSet)
      }
    }
  }, [playingSession])

  // Handle page reload (or pressing F5)
  useEffect(() => {
    window.addEventListener('beforeunload', e => {
      dispatch(loadNewestTimerRecord())
      e.preventDefault()
      e.returnValue = ''

      if (isPlaying) {
        isPlaying = false
        // stop()
        setPlay(false)
        toast.error(`"${recordInterval.name}" stopped`)
        sendTimerState(recordTime, 'stop', recordInterval, recordSubject)
        // sendTimerState(playingTime, 'stop: reload', recInterval, recordSubject)
        if (intervalIsSet) workerTimers.clearInterval(intervalIsSet)
      }
    })
  }, [])

  const sendTimerState = (timerState, playState, interval, subject) => {
    const action = {
      timeInSeconds:
        timerState.seconds + timerState.minutes * 60 + timerState.hours * 3600,
      intervalName: interval._id,
      intervalName: interval.name,
      intervalColor: interval.color,
      subjectName: subject.name,
      subjectId: subject._id,
    }

    dispatch(updateAction(action, newestTimerRecord?._id))
  }

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
    isPlaying = true
    setPlay(true)
    run()
    sendTimerState(time, 'start', currentInterval, subject)
    toast.success(`"${currentInterval.name}" started`)
    setInterv(workerTimers.setInterval(run, 1000))
    playStartBeep(time, currentInterval, 2)
  }

  const stop = () => {
    if (!isPlaying) {
      setPlay(false)
      return
    }

    sendTimerState(recordTime, 'stop', currentInterval, subject)
    if (interv) workerTimers.clearInterval(interv)
    isPlaying = false

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

      setTime({
        seconds: intervals[newIntervalIndex].totalDuration.seconds,
        minutes: intervals[newIntervalIndex].totalDuration.minutes,
        hours: intervals[newIntervalIndex].totalDuration.hours,
      })

      if (play) {
        isPlaying = false
        stop()
        toast.error(`"${currentInterval.name}" stopped`)
        sendTimerState(time, 'stop', currentInterval, subject)
        // sendTimerState(time, 'stop: step forward', currentInterval, subject)
        workerTimers.clearInterval(interv)
      }

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

      setTime({
        seconds: intervals[newIntervalIndex].totalDuration.seconds,
        minutes: intervals[newIntervalIndex].totalDuration.minutes,
        hours: intervals[newIntervalIndex].totalDuration.hours,
      })

      if (play) {
        isPlaying = false
        stop()
        toast.error(`"${currentInterval.name}" stopped`)
        sendTimerState(time, 'stop', currentInterval, subject)
        // sendTimerState(time, 'stop: step backward', currentInterval, subject)
        workerTimers.clearInterval(interv)
      }

      setProgress(0)
      trackIndex--
      if (trackIndex % loopLength === 0) roundIndex--
      repNum = 1
    }
  }

  const handleSubmitCompleted = () => {
    toast.success(`"${currentInterval.name}" Completed`)
    sendTimerState(
      currentInterval.totalDuration,
      'start',
      currentInterval,
      subject
    )
    setTimeout(() => {
      sendTimerState(
        { seconds: 0, minutes: 0, hours: 0 },
        'stop',
        currentInterval,
        subject
      )
      dispatch(loadVizData())
      dispatch(loadNewestTimerRecord())
    }, 1000)
  }

  let updatedSeconds = time.seconds
  let updatedMinutes = time.minutes
  let updatedHours = time.hours

  const run = () => {
    if (isPlaying) {
      if (updatedHours > 0 && updatedMinutes === 0) {
        updatedHours--
        updatedMinutes = 60
      }
      if (updatedMinutes > 0 && updatedSeconds === 0) {
        updatedMinutes--
        updatedSeconds = 60
      }

      if (updatedSeconds === 0 && updatedMinutes === 0 && updatedHours === 0) {
        isPlaying = false
        setPlay(false)
        toast.success(`"${currentInterval.name}" completed`)
        sendTimerState(recordTime, 'stop', recordInterval, recordSubject)
        // sendTimerState(playingTime, 'stop: reload', recInterval, recordSubject)
        if (intervalIsSet) workerTimers.clearInterval(intervalIsSet)

        setTime({
          seconds: currentInterval.totalDuration.seconds,
          minutes: currentInterval.totalDuration.minutes,
          hours: currentInterval.totalDuration.hours,
        })
        return
      }

      if (
        currentInterval.signalHalf &&
        updatedHours === halfInterval.hours &&
        updatedMinutes === halfInterval.minutes &&
        updatedSeconds === halfInterval.seconds
      ) {
        myHalfBeep.play()
        toast.warning(`"${currentInterval.name}" reached half`)
      }

      if (updatedHours === 0 && updatedMinutes === 0 && updatedSeconds === 3) {
        let x = 0
        myBeep.play()
        const intervalId = workerTimers.setInterval(() => {
          myBeep.play()
          if (++x === 2) {
            workerTimers.clearInterval(intervalId)
          }
        }, 1000)
      }

      updatedSeconds--

      const currentTimeInSeconds =
        (updatedHours * 60 + updatedMinutes) * 60 + updatedSeconds

      const progressPercentage =
        100 -
        Math.floor((currentTimeInSeconds / intervalDurationInSeconds) * 100)

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
      recordTime = {
        seconds: updatedSeconds,
        minutes: updatedMinutes,
        hours: updatedHours,
      }
      setTime(recordTime)
    }
  }

  const intervalsCardStyle = {
    backgroundColor: currentInterval.color,
  }

  const labelStyle = {
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
    top: 2,
    left: 0,
  }

  return (
    <div
      className="card d-flex flex-row navbar-timer"
      style={intervalsCardStyle}
    >
      <div style={labelStyle}>
        <PlayPauseStep
          user
          play={play}
          onToggle={handleTogglePlay}
          onStepForward={handleStepForward}
          onStepBackward={handleStepBackward}
        />
      </div>
      <div
        className="text-center flex-grow-1 d-flex justify-content-around"
        style={{ position: 'relative', zIndex: 100 }}
      >
        <div style={labelStyle}>
          {currentInterval.name} &nbsp;&nbsp;&nbsp;&nbsp;
          {time.hours < 10 ? `0${time.hours}` : time.hours} :&nbsp;
          {time.minutes < 10 ? `0${time.minutes}` : time.minutes} :&nbsp;
          {time.seconds < 10 ? `0${time.seconds}` : time.seconds}&nbsp;&nbsp;
          {/* {currentInterval.numOfReps > 1 &&
            `set ${repNum} of ${currentInterval.numOfReps}`} */}
        </div>
      </div>
      {/* <div
        className='me-2'
        style={labelStyle}
      >{`Round ${roundIndex} of ${playingSession.numOfReps}`}</div> */}
      <div className="float-start" style={progressBar}></div>
      <div
        onClick={handleSubmitCompleted}
        className="float-end pointer"
        style={labelStyle}
      >
        <i className="fa fa-check" aria-hidden="true"></i>
      </div>
    </div>
  )
}

export default NavBarIntervalsCard
