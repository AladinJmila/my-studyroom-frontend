export function timeFormatter(durationInSeconds) {
  const hours = Math.floor(durationInSeconds / 3600)
  const minutes = Math.floor((durationInSeconds % 3600) / 60)
  return { hours, minutes }
}

export function toStringTimeFormatter(duration) {
  const { hours, minutes } = duration
  let result
  if (hours) {
    result = `${hours} h ${minutes} m`
  } else if (minutes) {
    result = `${minutes} m`
  }

  return result
}
