export const getLoopIntervals = (intervalsIds, intervals) => {
  const loopIntervals = []
  intervalsIds.forEach(item => {
    loopIntervals.push(
      ...intervals.filter(interval => interval._id === item.intervalId)
    )
  })

  return loopIntervals
}

export const computeLoopDuration = loopIntervals => {
  const intervalsDuration = []
  loopIntervals.forEach(interval =>
    intervalsDuration.push(interval.totalDuration)
  )

  let seconds = intervalsDuration.reduce((t, { seconds }) => t + seconds, 0)
  let minutes = intervalsDuration.reduce((t, { minutes }) => t + minutes, 0)

  if (seconds >= 60) {
    minutes += Math.floor(seconds / 60)
    seconds = seconds % 60
  }

  let hours = intervalsDuration.reduce((t, { hours }) => t + hours, 0)

  if (minutes >= 60) {
    hours += Math.floor(minutes / 60)
    minutes = minutes % 60
  }

  return { seconds, minutes, hours }
}

export const formatDuration = loopDuration => {
  const { seconds, minutes, hours } = loopDuration

  const formattedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`
  const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`
  const formattedHours = hours < 10 ? `0${hours}` : `${hours}`

  return hours
    ? `${formattedHours}:${formattedMinutes}:${formattedSeconds}`
    : `${formattedMinutes}:${formattedSeconds}`
}
