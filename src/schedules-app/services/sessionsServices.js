export const formatDuration = (loopDuration, numOfReps) => {
  let { seconds, minutes, hours } = loopDuration;

  if (numOfReps > 1) {
    seconds = seconds * numOfReps;
    minutes = minutes * numOfReps;
    hours = hours * numOfReps;

    if (seconds >= 60) {
      minutes += Math.ceil(seconds / 60);
      seconds = seconds % 60;
    }

    if (minutes >= 60) {
      hours += Math.ceil(minutes / 60);
      minutes = minutes % 60;
    }
  }

  const formattedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
  const formattedHours = hours < 10 ? `0${hours}` : `${hours}`;

  return hours
    ? `${formattedHours}:${formattedMinutes}:${formattedSeconds}`
    : `${formattedMinutes}:${formattedSeconds}`;
};
