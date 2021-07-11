export default function (interval) {
  let minutes
  interval.minutes > 0
    ? (minutes =
        interval.minutes * interval.numOfReps +
        Math.floor((interval.seconds * interval.numOfReps) / 60))
    : (minutes = Math.floor((interval.seconds * interval.numOfReps) / 60))
  const seconds = (interval.seconds * interval.numOfReps) % 60

  let hours = 0
  if (minutes > 60) {
    hours = Math.floor(minutes / 60)
    minutes = minutes % 60
  }

  return { hours, minutes, seconds }
}
