import { useState, useRef } from 'react';
import CardEllipsisMenu from '../common/CardEllipsisMenu';
import { userIsEditor } from '../services/permissionsService';
import { cardsBody } from '../services/stylesService';
import { formatTime } from './services';
import { baseURL } from '../store/services/httpService';
import Check from '../common/Check';

let timesPlayed = 0;
function AudioNotesCard({ user, audioNote, index, groupName }) {
  const showPrivateInfo = user && userIsEditor(audioNote, user._id);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progressPosition, setProgressPosition] = useState(0);
  const [audioCurrentTime, setAudioCurrentTime] = useState(0);
  const [showUpdateRepsBtn, setShowUpdateRepsBtn] = useState(false);
  const [repetitions, setRepititions] = useState(audioNote.reps);
  const audioEl = useRef();
  const audioPadding = 5;

  const play = () => {
    const repsInterval = setInterval(() => {
      console.log(timesPlayed);
      if (timesPlayed === audioNote.reps) {
        timesPlayed = 0;
        return clearInterval(repsInterval);
      }
      audioEl.current.play();
      console.log('playing');
      timesPlayed++;
    }, audioNote.track.duration + audioPadding * 1000);
    setIsPlaying(!isPlaying);
    if (!isPlaying) {
      audioEl.current.play();
    } else {
      audioEl.current.pause();
    }

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
    audioEl.current.onended = () => setIsPlaying(false);
  };

  const handleUpdateReps = e => {
    setShowUpdateRepsBtn(true);
    if (e.target.value > 0) setRepititions(e.target.value);
  };

  const submitNewRepetitions = () => {
    setShowUpdateRepsBtn(false);
    console.log(repetitions);
  };

  const handleCheck = () => {
    console.log(audioNote);
  };

  return (
    <div style={cardsBody} className='card mb-1 p-1 ps-3 pe-3 audio-notes-card'>
      <div className='controls'>
        <Check onCheck={handleCheck} isChecked={audioNote.isChecked} />
        <button
          type='button'
          onClick={play}
          className='play-btn'
          disabled={audioNote.isChecked}
          style={{ color: audioNote.isChecked ? 'grey' : '' }}
        >
          <i className={`fa fa-${isPlaying ? 'pause' : 'play'}`}></i>
        </button>
      </div>
      <div className='track-details'>
        <h6 className='card-subtitle d-flex align-items-center text-truncate'>
          {index + 1} - {groupName}
        </h6>
        <div className='reps'>
          <div className='repeat-icon'></div>
          <input
            type='number'
            value={repetitions}
            onChange={handleUpdateReps}
          />
          {showUpdateRepsBtn && (
            <button
              type='button'
              className='update-reps'
              onClick={submitNewRepetitions}
            >
              <i className='fa fa-check'></i>
            </button>
          )}
        </div>

        <div className='time'>{`${formatTime(audioCurrentTime)} / ${formatTime(
          audioNote.track.duration
        )}`}</div>
      </div>

      <input
        type='range'
        className='timeline'
        max='100'
        value={progressPosition}
        style={{ backgroundSize: `${progressPosition}% 100%` }}
        onClick={null}
        readOnly
      />
      <div className='ellipsis-container'>
        {showPrivateInfo && (
          <CardEllipsisMenu
            item={audioNote}
            onEdit={null}
            onToggleProp={null}
            onDelete={null}
            vertical
          />
        )}
      </div>
      <audio
        ref={audioEl}
        src={`${baseURL}/audioNotes/stream/${audioNote.track.name}`}
      ></audio>
    </div>
  );
}

export default AudioNotesCard;
