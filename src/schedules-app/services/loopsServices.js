export const formatDuration = loopDuration => {
  const { seconds, minutes, hours } = loopDuration

  const formattedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`
  const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`
  const formattedHours = hours < 10 ? `0${hours}` : `${hours}`

  return hours
    ? `${formattedHours}:${formattedMinutes}:${formattedSeconds}`
    : `${formattedMinutes}:${formattedSeconds}`
}
