import { useState, useRef } from 'react';
import CardEllipsisMenu from '../common/CardEllipsisMenu';
import { userIsEditor } from '../services/permissionsService';
import { cardsBody } from '../services/stylesService';
import { formatTime } from './services';
import { baseURL } from '../store/services/httpService';

function AudioNotesCard({ user, audioNote }) {
  const showPrivateInfo = user && userIsEditor(audioNote, user._id);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioEl = useRef();

  const play = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying) {
      audioEl.current.play();
    } else {
      audioEl.current.pause();
    }
  };

  return (
    <div style={cardsBody} className='card mb-1 audio-notes-card'>
      <div className='p-1 ps-3 pe-3'>
        <div className='row '>
          <h6 className='col-6 card-subtitle d-flex align-items-center text-truncate'>
            {audioNote.title}
          </h6>
          <div className='col-4 reps'>
            <p>reps:</p>
            <input type='number' value={audioNote.reps} />
            <button type='button' className='update-reps'>
              <i className='fa fa-check'></i>
            </button>
          </div>
          <div className='col-2'>
            <div className=' card-link float-end'>
              {showPrivateInfo && (
                <CardEllipsisMenu
                  item={audioNote}
                  onEdit={null}
                  onToggleProp={null}
                  onDelete={null}
                />
              )}
            </div>
          </div>
        </div>
        <div className='audio-player'>
          <div className='controls'>
            <button type='button' onClick={play} className='play-btn'>
              <i className={`fa fa-${isPlaying ? 'pause' : 'play'}`}></i>
            </button>
          </div>
          <input
            type='range'
            className='timeline'
            max='100'
            value={50}
            style={{ backgroundSize: `${50}% 100%` }}
            onClick={null}
            readOnly
          />
          <div className='time'>{`${formatTime(0)} / ${formatTime(
            audioNote.track.duration
          )}`}</div>
          <audio
            ref={audioEl}
            src={`${baseURL}/audioNotes/stream/${audioNote.track.name}`}
          ></audio>
        </div>
      </div>
    </div>
  );
}

export default AudioNotesCard;
