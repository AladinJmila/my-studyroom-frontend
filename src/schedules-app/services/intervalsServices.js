export const computeIntervalDuration = interval => {
  let seconds = interval.seconds * interval.numOfReps

  let minutes = interval.minutes * interval.numOfReps

  if (seconds > 60) {
    minutes += Math.floor(seconds / 60)
    seconds = seconds % 60
  }

  let hours = 0
  if (minutes > 60) {
    hours = Math.floor(minutes / 60)
    minutes = minutes % 60
  }

  return { seconds, minutes, hours }
}

export const formatDuration = intervalDuration => {
  const { seconds, minutes, hours } = intervalDuration
  const formattedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`
  const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`
  const formattedHours = hours < 10 ? `0${hours}` : `${hours}`

  return hours
    ? `${formattedHours}:${formattedMinutes}:${formattedSeconds}`
    : `${formattedMinutes}:${formattedSeconds}`
}
