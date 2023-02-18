import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AudioNotesCard from './AudioNotesCard';
import { formatTime, playTrack } from './services';
import CardEllipsisMenu from '../common/CardEllipsisMenu';
import Check from '../common/Check';
import SettingsMenu from '../common/SettingsMenu';
import { userIsEditor } from '../services/permissionsService';
import { baseURL } from '../store/services/httpService';
import {
  deleteAudioNoteGroup,
  updateAudioNotesGroup,
} from '../store/apps/audioNotesActions';
import {
  setCurrentPlayingGroup,
  setCurrentPlayingNote,
} from '../store/ui/uiAudioNotes';

let timesPlayed = 1;
let repsInterval = null;

function AudioNotesGroup({ index, user, group, playSubject, setGroupsBtns }) {
  const showPrivateInfo = user && userIsEditor(group, user._id);
  const [showContent, setShowContent] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState();
  const [audioPadding, setAudioPadding] = useState(
    group.props?.audioPadding ? group.props.audioPadding : 3
  );
  const [showSettingsMenu, setShowSettingsMenu] = useState(false);

  const { currentPlayingNote } = useSelector(state => state.ui.audioNotes);
  const { currentPlayingGroup } = useSelector(state => state.ui.audioNotes);

  const audioEl = useRef();
  const playBtn = useRef();
  const prevBtn = useRef();
  const nextBtn = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    if (playBtn.current) {
      setGroupsBtns(prev => [
        ...prev,
        { prev: prevBtn.current, play: playBtn.current, next: nextBtn.current },
      ]);
    }
  }, []);

  useEffect(() => {
    dispatch(setCurrentPlayingNote({ index: 0 }));
  }, [currentPlayingGroup.index]);

  const playGroup = () => {
    if (!group.isChecked) {
      dispatch(setCurrentPlayingGroup({ index }));
      if (currentPlayingNote.index > group.children.length - 1) {
        dispatch(setCurrentPlayingNote({ index: 0 }));
      }
      const timeoutOffset = group.children[currentPlayingNote.index]?.isChecked
        ? 0
        : audioPadding * 1000;

      setTimeout(() => {
        const playNext = currentTrackIndex => {
          if (currentTrackIndex === undefined)
            currentTrackIndex = currentPlayingNote.index;
          console.log('attempted play');
          setCurrentTrack(group.children[currentTrackIndex].track.name);
          const playArgs = {
            audioEl,
            audioNote: group.children[currentTrackIndex],
            isPlaying,
            timesPlayed,
            setIsPlaying,
            timeoutOffset,
            repsInterval,
            currentTrackIndex,
            totalTracks: group.children.length,
            onEnded,
            playSubject,
            currentGroupIndex: currentPlayingGroup.index,
            dispatch,
            setCurrentPlayingGroup,
            setCurrentPlayingNote,
            isSubjectPlay: currentPlayingGroup.isSubjectPlay,
          };
          playTrack(playArgs);
        };

        const onEnded = currentTrackIndex => {
          if (currentTrackIndex < group.children.length) {
            dispatch(setCurrentPlayingNote({ index: currentTrackIndex }));
            setTimeout(() => {
              if (group.children[currentPlayingNote.index])
                playNext(currentTrackIndex);
            }, timeoutOffset);
          }
        };

        playNext();
      }, 200);
    }
  };

  const handleDelete = group => {
    dispatch(deleteAudioNoteGroup(group));
  };

  const handleCheck = group => {
    dispatch(updateAudioNotesGroup(group._id, { isChecked: !group.isChecked }));
  };

  const handleAudioPadding = group => {
    dispatch(
      updateAudioNotesGroup(group._id, {
        props: { ...group.props, audioPadding: parseInt(audioPadding) },
      })
    );
    setShowSettingsMenu(false);
  };

  const handleStepBackward = () => {
    setIsPlaying(false);
    timesPlayed = 1;
    repsInterval = null;

    if (currentPlayingNote.index > 0) {
      dispatch(setCurrentPlayingNote({ index: currentPlayingNote.index - 1 }));
    } else if (currentPlayingNote.index === 0) {
      dispatch(setCurrentPlayingNote({ index: 0 }));
    }
  };

  const handleStepForward = () => {
    setIsPlaying(false);
    timesPlayed = 1;
    repsInterval = null;

    if (currentPlayingNote.index < group.children.length - 1) {
      dispatch(setCurrentPlayingNote({ index: currentPlayingNote.index + 1 }));
    } else if (currentPlayingNote.index === group.children.length - 1) {
      dispatch(setCurrentPlayingNote({ index: group.children.length - 1 }));
    }
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
          <div className='audio-controls'>
            <button
              ref={prevBtn}
              onClick={handleStepBackward}
              className='audio-control-btn'
              disabled={group.isChecked}
            >
              <i className='fa fa-step-backward'></i>
            </button>
            <button
              ref={playBtn}
              onClick={playGroup}
              className='audio-control-btn'
              disabled={group.isChecked}
            >
              <i className={`fa fa-${isPlaying ? 'stop' : 'play'}`}></i>
            </button>
            <button
              ref={nextBtn}
              onClick={handleStepForward}
              className='audio-control-btn'
              disabled={group.isChecked}
            >
              <i className='fa fa-step-forward'></i>
            </button>
          </div>
          <p>
            {currentPlayingGroup.index === index
              ? currentPlayingNote.index + 1
              : 1}{' '}
            / {group.children.length} tracks
          </p>
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
        <SettingsMenu
          showSettingsMenu={showSettingsMenu}
          setShowSettingsMenu={setShowSettingsMenu}
        >
          <>
            <span className='setting-name'>Audio padding:</span>
            <input
              type='number'
              value={audioPadding}
              onChange={e => setAudioPadding(e.target.value)}
            />
            <button
              type='button'
              className='submit'
              onClick={() => handleAudioPadding(group)}
            >
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
