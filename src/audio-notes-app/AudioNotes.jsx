import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import HeaderCard from '../common/HeaderCard';
import SortCard from '../common/SortCard';
import { loadAudioNotesGroups } from '../store/apps/audioNotesActions';
import AudioNotesForm from './AudioNotesForm';
import AudioNotesGroup from './AudioNotesGroup';
import { baseURL } from '../store/services/httpService';
import { playGroup } from './services';

let timesPlayed = 1;
let repsInterval = null;
let currentGroupIndex = 0;
let currentTrackIndex = 0;

const AudioNotes = () => {
  const [showForm, setShowFrom] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState();
  const [playingGroupIndex, setPlayingGroupIndex] = useState(1);
  const audioEl = useRef();

  const { user } = useSelector(state => state.auth);
  const groups = useSelector(state => state.apps.audioNotes.groups);
  const { selectedSubject } = useSelector(state => state.apps.subjects);
  const dispatch = useDispatch();

  const audioPadding = 5;

  useEffect(() => {
    dispatch(loadAudioNotesGroups());
  }, []);

  const handleShowForm = () => {
    setShowFrom(showForm ? false : true);
  };

  const playSubject = () => {
    currentGroupIndex = 0;
    const playNextGroup = () => {
      const groupArgs = {
        group: groups[currentGroupIndex],
        audioEl,
        isPlaying,
        timesPlayed,
        setIsPlaying,
        repsInterval,
        currentIndex: currentTrackIndex,
        setCurrentTrack,
      };
      playGroup(groupArgs);
    };
  };

  const item = (
    <div className='d-flex'>
      <div>AudioNotes</div>
      <button
        onClick={playSubject}
        className='play-btn'
        disabled={selectedSubject?.name === 'All Subjects'}
      >
        <i className={`fa fa-${isPlaying ? 'stop' : 'play'}`}></i>
      </button>
    </div>
  );

  return (
    <div className='audio-notes-container'>
      <HeaderCard
        user={user}
        count={0}
        item={item}
        onClick={handleShowForm}
        showForm={showForm}
      />
      {currentTrack && (
        <audio
          ref={audioEl}
          src={`${baseURL}/audioNotes/stream/${currentTrack}`}
        ></audio>
      )}
      <SortCard sortTarget={null} onSort={null} checkedName='Checked' />
      {showForm && (
        <AudioNotesForm user={user} handleShowForm={handleShowForm} />
      )}
      {groups &&
        groups.map(group => (
          <AudioNotesGroup key={group._id} user={user} group={group} />
        ))}
    </div>
  );
};

export default AudioNotes;
