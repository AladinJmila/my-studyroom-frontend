import { useState, useRef } from 'react';
import CardEllipsisMenu from '../common/CardEllipsisMenu';
import { userIsEditor } from '../services/permissionsService';
import { cardsBody } from '../services/stylesService';
import { formatTime, playTrack, updateProgress } from './services';
import { baseURL } from '../store/services/httpService';
import Check from '../common/Check';
import { useDispatch } from 'react-redux';
import {
  deleteAudioNote,
  patchAudioNote,
} from '../store/apps/audioNotesActions';

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

  const dispatch = useDispatch();

  const playArgs = {
    audioEl,
    audioNote,
    isPlaying,
    timesPlayed,
    setIsPlaying,
    timeoutOffset: audioPadding * 1000,
    repsInterval,
  };

  const progressArgs = {
    audioEl,
    audioNote,
    setAudioCurrentTime,
    setProgressPosition,
  };

  const extendedPlay = (playTrack, updateProgress) => {
    playTrack(playArgs);
    updateProgress(progressArgs);
  };

  const handleUpdateReps = e => {
    setShowUpdateRepsBtn(true);
    if (e.target.value > 0) setRepititions(e.target.value);
  };

  const submitNewRepetitions = audioNote => {
    setShowUpdateRepsBtn(false);
    dispatch(patchAudioNote(audioNote._id, { reps: repetitions }));
  };

  const handleDelete = audioNote => {
    dispatch(deleteAudioNote(audioNote));
  };

  const handleCheck = audioNote => {
    dispatch(
      patchAudioNote(audioNote._id, { isChecked: !audioNote.isChecked })
    );
  };

  return (
    <div style={cardsBody} className='card mb-1 p-1 ps-3 pe-3 audio-notes-card'>
      <div className='controls'>
        <Check
          onCheck={() => handleCheck(audioNote)}
          isChecked={audioNote.isChecked}
        />
        <button
          type='button'
          onClick={() => extendedPlay(playTrack, updateProgress)}
          className='play-btn'
          disabled={audioNote.isChecked}
        >
          <i className={`fa fa-${isPlaying ? 'stop' : 'play'}`}></i>
        </button>
      </div>
      <div className='track-details'>
        <h6>
          {index + 1} - {groupName}
        </h6>
        <div className='reps'>
          <div className='repeat-icon'></div>
          <input
            type='number'
            dir='rtl'
            value={repetitions}
            onChange={handleUpdateReps}
            readOnly={audioNote.isChecked}
          />
          {showUpdateRepsBtn && (
            <button
              type='button'
              className='update-reps'
              onClick={() => submitNewRepetitions(audioNote)}
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
            onDelete={handleDelete}
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
