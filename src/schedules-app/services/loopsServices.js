import { computeIntervalDuration } from './intervalsServices'

export const computeLoopDuration = loopIntervals => {
  const intervalsDuration = []
  loopIntervals.forEach(interval =>
    intervalsDuration.push(computeIntervalDuration(interval))
  )

  let totalSeconds = intervalsDuration.reduce(
    (t, { seconds }) => t + seconds,
    0
  )
  let totalMinutes = intervalsDuration.reduce(
    (t, { minutes }) => t + minutes,
    0
  )

  if (totalSeconds > 60) {
    totalMinutes += Math.floor(totalSeconds / 60)
    totalSeconds = totalSeconds % 60
  }

  let totalHours = intervalsDuration.reduce((t, { hours }) => t + hours, 0)

  if (totalMinutes > 60) {
    totalHours += Math.floor(totalMinutes / 60)
    totalMinutes = totalMinutes % 60
  }

  return { totalSeconds, totalMinutes, totalHours }
}

export const formatDuration = loopDuration => {
  const { totalSeconds, totalMinutes, totalHours } = loopDuration

  const formattedSeconds =
    totalSeconds < 10 ? `0${totalSeconds}` : `${totalSeconds}`
  const formattedMinutes =
    totalMinutes < 10 ? `0${totalMinutes}` : `${totalMinutes}`
  const formattedHours = totalHours < 10 ? `0${totalHours}` : `${totalHours}`

  return totalHours
    ? `${formattedHours}:${formattedMinutes}:${formattedSeconds}`
    : `${formattedMinutes}:${formattedSeconds}`
}
