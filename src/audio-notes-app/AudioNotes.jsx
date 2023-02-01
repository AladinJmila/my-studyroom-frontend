import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import HeaderCard from '../common/HeaderCard';
import SortCard from '../common/SortCard';
import { loadAudioNotes } from '../store/apps/audioNotesActions';
import AudioNotesForm from './AudioNotesForm';
import AudioNotesGroup from './AudioNotesGroup';

const AudioNotes = () => {
  const [showForm, setShowFrom] = useState(false);
  const [subjectIsPlaying, setSubjectIsPlaying] = useState(false);
  const [groupsBtns, setGroupsBtns] = useState([]);
  const currentGroupIndex = useRef();
  currentGroupIndex.current = 0;

  const { user } = useSelector(state => state.auth);
  const groups = useSelector(state => state.apps.audioNotes.list);
  const { selectedSubject } = useSelector(state => state.apps.subjects);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadAudioNotes());
  }, []);

  const handleShowForm = () => {
    setShowFrom(showForm ? false : true);
  };

  const playSubject = () => {
    if (currentGroupIndex.current + 1 > groups.length)
      return setSubjectIsPlaying(false);
    groupsBtns[currentGroupIndex.current].click();
  };

  const item = (
    <div className='d-flex'>
      <div>AudioNotes</div>
      <button
        onClick={() => {
          setSubjectIsPlaying(!subjectIsPlaying);
          playSubject();
        }}
        className='play-btn'
        disabled={!selectedSubject || selectedSubject?.name === 'All Subjects'}
      >
        <i className={`fa fa-${subjectIsPlaying ? 'stop' : 'play'}`}></i>
      </button>
    </div>
  );

  return (
    <div className='audio-notes-container'>
      <HeaderCard
        user={user}
        count={groups.length}
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
            setGroupsBtns={setGroupsBtns}
            playSubject={playSubject}
            currentGroupIndex={currentGroupIndex}
          />
        ))}
    </div>
  );
};

export default AudioNotes;
