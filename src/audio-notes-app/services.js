import * as workerTimers from 'worker-timers';

export const formatTime = time => {
  if (isNaN(time)) return '00:00';
  let seconds = time % 60;
  seconds = seconds >= 10 ? seconds : '0' + seconds;
  let minutes = parseInt(time / 60);
  minutes = minutes >= 10 ? minutes : '0' + minutes;

  return `${minutes}:${seconds}`;
};

export const playTrack = ({
  audioEl,
  audioNote,
  isPlaying,
  timesPlayed,
  setIsPlaying,
  timeoutOffset,
  repsInterval,
  currentTrackIndex,
  setPlayingTrackIndex,
  totalTracks,
  onEnded,
  playSubject,
  currentGroupIndex,
  dispatch,
  setCurrentPlayingGroup,
}) => {
  let prevTimesPlayed = 1;
  console.log('should play here');
  console.log(isPlaying);
  if (!audioNote.isChecked) {
    if (!isPlaying) {
      console.log('and here');

      setIsPlaying(true);
      audioEl.current.play();

      if (!repsInterval && audioNote.reps > 1) {
        const intervalDuration =
          audioNote.track.duration * 1000 + timeoutOffset;

        repsInterval = workerTimers.setInterval(() => {
          timesPlayed++;
          prevTimesPlayed = timesPlayed;

          if (timesPlayed === audioNote.reps) {
            setIsPlaying(false);
            prevTimesPlayed = timesPlayed;
            timesPlayed = 1;
            workerTimers.clearInterval(repsInterval);
            repsInterval = null;
          }
          setIsPlaying(true);
          audioEl.current.play();
        }, intervalDuration);
      }
    } else {
      timesPlayed = 1;
      prevTimesPlayed = 1;
      setIsPlaying(false);
      audioEl.current.pause();
      audioEl.current.currentTime = 0;
      repsInterval && workerTimers.clearInterval(repsInterval);
      repsInterval = null;
    }
  } else {
    currentTrackIndex++;
    setPlayingTrackIndex(currentTrackIndex);
    onEnded && onEnded();
  }
  audioEl.current.onended = () => {
    setIsPlaying(false);

    // console.log('audio reps', audioNote.reps);
    // console.log('prev times played', prevTimesPlayed);

    if (prevTimesPlayed === audioNote.reps) {
      onEnded && onEnded();
    }

    if (currentTrackIndex && totalTracks) {
      // console.log('tracks total', totalTracks);
      // console.log('track index', currentTrackIndex + 1);
      console.log(currentTrackIndex + 1);
      if (
        (prevTimesPlayed === audioNote.reps &&
          currentTrackIndex + 1 === totalTracks) ||
        currentTrackIndex + 1 === totalTracks
      ) {
        // currentGroupIndex.current = currentGroupIndex.current + 1;
        // console.log('incremented group in services', currentGroupIndex.current);

        setTimeout(() => {
          dispatch(setCurrentPlayingGroup({ index: currentGroupIndex + 1 }));
          playSubject(currentGroupIndex + 1);
          // console.log('called play subject');
        }, timeoutOffset);
        timesPlayed = 1;
        prevTimesPlayed = 1;
      }
    }
    // console.log(' ');
  };
};

export const updateProgress = ({
  audioEl,
  audioNote,
  setAudioCurrentTime,
  setProgressPosition,
}) => {
  if (audioEl.current) {
    audioEl.current.ontimeupdate = () => {
      setAudioCurrentTime(Math.ceil(audioEl.current.currentTime));
      setProgressPosition(
        Math.ceil(
          (100 * Math.ceil(audioEl.current.currentTime)) /
            audioNote.track.duration
        )
      );
    };
  }
};
