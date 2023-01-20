export const formatTime = time => {
  if (isNaN(time)) return '00:00';
  let seconds = time % 60;
  seconds = seconds >= 10 ? seconds : '0' + seconds;
  let minutes = parseInt(time / 60);
  minutes = minutes >= 10 ? minutes : '0' + minutes;

  return `${minutes}:${seconds}`;
};
