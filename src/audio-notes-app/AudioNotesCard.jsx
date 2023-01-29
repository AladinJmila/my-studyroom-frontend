import { useState, useRef } from 'react';
import CardEllipsisMenu from '../common/CardEllipsisMenu';
import { userIsEditor } from '../services/permissionsService';
import { cardsBody } from '../services/stylesService';
import { formatTime, play, updateProgress } from './services';
import { baseURL } from '../store/services/httpService';
import Check from '../common/Check';

let timesPlayed = 1;
let repsInterval = null;

const AudioNotesCard = ({
  user,
  audioNote,
  index,
  groupName,
  audioPadding,
}) => {
  const showPrivateInfo = user && userIsEditor(audioNote, user._id);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progressPosition, setProgressPosition] = useState(0);
  const [audioCurrentTime, setAudioCurrentTime] = useState(0);
  const [showUpdateRepsBtn, setShowUpdateRepsBtn] = useState(false);
  const [repetitions, setRepititions] = useState(audioNote.reps);
  const audioEl = useRef();

  const playArgs = {
    audioEl,
    audioNote,
    isPlaying,
    timesPlayed,
    setIsPlaying,
    audioPadding,
    repsInterval,
  };

  const progressArgs = {
    audioEl,
    audioNote,
    setAudioCurrentTime,
    setProgressPosition,
  };

  const extendedPlay = (play, updateProgress) => {
    play(playArgs);
    updateProgress(progressArgs);
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
          onClick={() => extendedPlay(play, updateProgress)}
          className='play-btn'
          disabled={audioNote.isChecked}
          style={{ color: audioNote.isChecked ? 'grey' : '' }}
        >
          <i className={`fa fa-${isPlaying ? 'stop' : 'play'}`}></i>
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
};

export default AudioNotesCard;
