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
  audioPadding,
  repsInterval,
  onEnded,
}) => {
  if (!audioNote.isChecked) {
    if (!isPlaying) {
      setIsPlaying(true);
      audioEl.current.play();

      if (!repsInterval && audioNote.reps > 1) {
        const intervalDuration =
          (audioNote.track.duration + audioPadding) * 1000;

        repsInterval = workerTimers.setInterval(() => {
          timesPlayed++;
          if (timesPlayed === audioNote.reps) {
            setIsPlaying(false);
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
      setIsPlaying(false);
      audioEl.current.pause();
      audioEl.current.currentTime = 0;
      repsInterval && workerTimers.clearInterval(repsInterval);
      repsInterval = null;
    }
  }
  audioEl.current.onended = () => {
    setIsPlaying(false);
    if (timesPlayed === audioNote.reps) {
      onEnded && onEnded();
    }
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

export const playGroup = ({
  group,
  audioEl,
  isPlaying,
  timesPlayed,
  setIsPlaying,
  audioPadding,
  repsInterval,
  currentIndex,
  setCurrentTrack,
  setPlayingTrackIndex,
}) => {
  currentIndex = 0;
  setTimeout(() => {
    const playNext = () => {
      setCurrentTrack(group.children[currentIndex].track.name);
      const playArgs = {
        audioEl,
        audioNote: group.children[currentIndex],
        isPlaying,
        timesPlayed,
        setIsPlaying,
        audioPadding,
        repsInterval,
        onEnded,
      };
      playTrack(playArgs);
    };

    const onEnded = () => {
      currentIndex++;
      setPlayingTrackIndex && setPlayingTrackIndex(currentIndex + 1);
      setTimeout(() => {
        playNext();
      }, audioPadding * 1000);
    };

    playNext();
  }, 500);
};
