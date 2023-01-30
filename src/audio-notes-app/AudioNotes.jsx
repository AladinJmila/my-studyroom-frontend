import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import HeaderCard from '../common/HeaderCard';
import SortCard from '../common/SortCard';
import { loadAudioNotesGroups } from '../store/apps/audioNotesActions';
import AudioNotesForm from './AudioNotesForm';
import AudioNotesGroup from './AudioNotesGroup';

const AudioNotes = () => {
  const [showForm, setShowFrom] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const currentGroupIndex = useRef();
  currentGroupIndex.current = 0;

  const { user } = useSelector(state => state.auth);
  const groups = useSelector(state => state.apps.audioNotes.groups);
  const { selectedSubject } = useSelector(state => state.apps.subjects);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadAudioNotesGroups());
  }, []);

  const handleShowForm = () => {
    setShowFrom(showForm ? false : true);
  };

  const playSubject = () => {
    const DOMGroups = document.querySelectorAll('.audio-notes-group');
    if (!isPlaying) {
      setIsPlaying(true);
      [...DOMGroups][currentGroupIndex.current]
        .querySelector('.play-btn')
        .click();
    } else {
      setIsPlaying(false);
      [...DOMGroups][currentGroupIndex.current]
        .querySelector('.play-btn')
        .click();
    }
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
      <SortCard sortTarget={null} onSort={null} checkedName='Checked' />
      {showForm && <AudioNotesForm />}
      {groups &&
        groups.map(group => (
          <AudioNotesGroup
            key={group._id}
            user={user}
            group={group}
            playSubject={playSubject}
            currentGroupIndex={currentGroupIndex}
          />
        ))}
    </div>
  );
};

export default AudioNotes;
