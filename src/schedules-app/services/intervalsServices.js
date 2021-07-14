export const formatDuration = totalDuration => {
  const { seconds, minutes, hours } = totalDuration
  const formattedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`
  const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`
  const formattedHours = hours < 10 ? `0${hours}` : `${hours}`

  let foramtted

  if (hours)
    foramtted = `${formattedHours}:${formattedMinutes}:${formattedSeconds}`
  else if (minutes) foramtted = `${formattedMinutes}:${formattedSeconds}`
  else foramtted = `${formattedSeconds}`

  return foramtted
}
