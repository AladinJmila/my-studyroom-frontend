import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import HeaderCard from '../common/HeaderCard';
import SortCard from '../common/SortCard';
import { loadAudioNotes } from '../store/apps/audioNotesActions';
import AudioNotesForm from './AudioNotesForm';
import AudioNotesGroup from './AudioNotesGroup';
import { BeatLoader } from 'react-spinners';

const AudioNotes = () => {
  const [showForm, setShowFrom] = useState(false);
  const [subjectIsPlaying, setSubjectIsPlaying] = useState(false);
  const [groupsBtns, setGroupsBtns] = useState([]);
  const currentGroupIndex = useRef();
  currentGroupIndex.current = 0;

  const dispatch = useDispatch();
  const groups = useSelector(state => state.apps.audioNotes.list);
  const { selectedSubject } = useSelector(state => state.apps.subjects);
  const { user } = useSelector(state => state.auth);
  const { loading } = useSelector(state => state.apps.audioNotes);

  const subjectIsValid = subject => {
    return subject && subject.name !== 'All Subjects';
  };

  useEffect(() => {
    if (subjectIsValid(selectedSubject))
      dispatch(loadAudioNotes(selectedSubject._id));
  }, [selectedSubject]);

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
        disabled={!subjectIsValid(selectedSubject)}
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
      {loading ? (
        <div className='center-spinner'>
          <BeatLoader size={50} color={'#6A7475'} loading={loading} />
        </div>
      ) : (
        <>
          {subjectIsValid(selectedSubject) ? (
            groups &&
            groups.map(group => (
              <AudioNotesGroup
                key={group._id}
                user={user}
                group={group}
                setGroupsBtns={setGroupsBtns}
                playSubject={playSubject}
                currentGroupIndex={currentGroupIndex}
              />
            ))
          ) : (
            <div className='d-flex justify-content-center'>
              <b>Select a specific Subject to load Audio Notes</b>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AudioNotes;
