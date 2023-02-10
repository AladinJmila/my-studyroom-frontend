import { useState, useEffect, useRef } from 'react';
import AudioNotesCard from './AudioNotesCard';
import { formatTime, playTrack } from './services';
import { baseURL } from '../store/services/httpService';
import { userIsEditor } from '../services/permissionsService';
import CardEllipsisMenu from '../common/CardEllipsisMenu';
import { useDispatch } from 'react-redux';
import {
  deleteAudioNoteGroup,
  updateAudioNotesGroup,
} from '../store/apps/audioNotesActions';
import Check from '../common/Check';
import SettingsMenu from '../common/SettingsMenu';

let timesPlayed = 1;
let repsInterval = null;
let currentTrackIndex = 0;

function AudioNotesGroup({
  user,
  group,
  playSubject,
  currentGroupIndex,
  setGroupsBtns,
}) {
  const showPrivateInfo = user && userIsEditor(group, user._id);
  const [showContent, setShowContent] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState();
  const [audioPadding, setAudioPadding] = useState(5);

  const audioEl = useRef();
  const playBtn = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    if (playBtn.current) {
      setGroupsBtns(prev => [...prev, playBtn.current]);
    }
  }, []);

  const playGroup = () => {
    currentTrackIndex = 0;

    setTimeout(() => {
      const playNext = () => {
        console.log('attempted play');
        setCurrentTrack(group.children[currentTrackIndex].track.name);
        const playArgs = {
          audioEl,
          audioNote: group.children[currentTrackIndex],
          isPlaying,
          timesPlayed,
          setIsPlaying,
          audioPadding,
          repsInterval,
          currentTrackIndex,
          totalTracks: group.children.length,
          onEnded,
          playSubject,
          currentGroupIndex,
        };
        playTrack(playArgs);
      };

      const onEnded = () => {
        currentTrackIndex++;
        setTimeout(() => {
          if (group.children[currentTrackIndex]) playNext();
        }, audioPadding * 1000);
      };

      playNext();
    }, 500);
  };

  const handleDelete = group => {
    dispatch(deleteAudioNoteGroup(group));
  };

  const handleCheck = group => {
    dispatch(updateAudioNotesGroup(group._id, { isChecked: !group.isChecked }));
  };

  const handleSubmit = () => {
    console.log(audioPadding);
    // setShowMenu(false);
  };

  return (
    <>
      <div className='audio-notes-group'>
        <div className='check-container'>
          <Check
            onCheck={() => handleCheck(group)}
            isChecked={group.isChecked}
          />
        </div>
        <h6> {group.name}</h6>
        <div className='audio-notes-group-contols'>
          <button ref={playBtn} onClick={playGroup} className='play-btn'>
            <i
              className={`fa fa-${isPlaying ? 'stop' : 'play'}`}
              style={{ color: 'white', zIndex: 100 }}
            ></i>
          </button>
          {isPlaying ? (
            <p>
              {currentTrackIndex + 1} / {group.children.length}
            </p>
          ) : (
            <p>{group.children.length} tracks</p>
          )}
          <p>{formatTime(group.props.totalDuration)}</p>
          <p>
            {group.props.totalDuration
              ? Math.ceil(
                  ((group.props.totalDuration - group.props.remainingDuration) /
                    group.props.totalDuration) *
                    100
                )
              : 0}
            %
          </p>
          <button
            className='expand-btn'
            onClick={() => setShowContent(!showContent)}
          >
            <i
              className={`fa fa-${showContent ? 'chevron-up' : 'chevron-down'}`}
            ></i>
          </button>
        </div>
        <SettingsMenu>
          <>
            <span className='setting-name'>Audio padding:</span>
            <input
              type='number'
              value={audioPadding}
              onChange={e => setAudioPadding(e.target.value)}
            />
            <button type='button' className='submit' onClick={handleSubmit}>
              <i className='fa fa-check'></i>
            </button>
          </>
        </SettingsMenu>
        <div className='ellipsis-container'>
          {showPrivateInfo && (
            <CardEllipsisMenu
              item={group}
              onEdit={null}
              onToggleProp={null}
              onDelete={handleDelete}
              vertical
            />
          )}
        </div>
      </div>
      {currentTrack && (
        <audio
          ref={audioEl}
          src={`${baseURL}/audioNotes/stream/${currentTrack}`}
        ></audio>
      )}
      {showContent &&
        group.children.map((child, index) => (
          <AudioNotesCard
            user={user}
            key={child._id}
            audioNote={child}
            index={index}
            groupName={group.name}
            audioPadding={audioPadding}
          />
        ))}
    </>
  );
}

export default AudioNotesGroup;
