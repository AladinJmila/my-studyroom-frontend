import beep from '../../static/audio/beep-07a.wav'
const myBeep = new Audio(beep)

export const playStartBeep = (time, currentInterval, reps) => {
  if (
    time.hours === currentInterval.totalDuration.hours &&
    time.minutes === currentInterval.totalDuration.minutes &&
    time.seconds === currentInterval.totalDuration.seconds
  ) {
    let x = 0
    myBeep.play()
    const intervalId = setInterval(() => {
      myBeep.play()
      if (++x === reps - 1) {
        clearInterval(intervalId)
      }
    }, 1000)
  }
}

export const computeHalfInterval = interval => {
  let { seconds, minutes, hours } = interval.totalDuration
  const halfInseconds = Math.floor(((hours * 60 + minutes) * 60 + seconds) / 2)

  minutes = Math.floor(halfInseconds / 60)
  seconds = halfInseconds % 60
  if (minutes >= 60) {
    hours = Math.floor(minutes / 60)
    minutes = minutes % 60
  }

  return { seconds, minutes, hours }
}
