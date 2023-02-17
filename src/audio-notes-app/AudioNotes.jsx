import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BeatLoader } from 'react-spinners';
import HeaderCard from '../common/HeaderCard';
import SortCard from '../common/SortCard';
import AudioNotesForm from './AudioNotesForm';
import AudioNotesGroup from './AudioNotesGroup';
import { loadAudioNotes } from '../store/apps/audioNotesActions';
import { formatTime } from './services';
import { setCurrentPlayingGroup } from '../store/ui/uiAudioNotes';

const AudioNotes = () => {
  const [showForm, setShowFrom] = useState(false);
  const [subjectIsPlaying, setSubjectIsPlaying] = useState(false);
  const [groupsBtns, setGroupsBtns] = useState([]);

  const dispatch = useDispatch();
  const groups = useSelector(state => state.apps.audioNotes.list);
  const { selectedSubject } = useSelector(state => state.apps.subjects);
  const { user } = useSelector(state => state.auth);
  const { loading } = useSelector(state => state.apps.audioNotes);
  const { currentPlayingGroup } = useSelector(state => state.ui.audioNotes);

  const subjectIsValid = subject => {
    return subject && subject.name !== 'All Subjects';
  };

  useEffect(() => {
    if (subjectIsValid(selectedSubject))
      dispatch(loadAudioNotes(selectedSubject._id));
  }, [selectedSubject]);

  useEffect(() => {
    dispatch(setCurrentPlayingGroup({ groupsCount: groups.length }));
  }, [groups]);

  useEffect(() => {
    dispatch(
      setCurrentPlayingGroup({
        tracksCount: groups[currentPlayingGroup.index]?.children.length,
        name: groups[currentPlayingGroup.index]?.name,
      })
    );
    if (currentPlayingGroup.index > groups.length - 1)
      dispatch(
        setCurrentPlayingGroup({
          index: 0,
        })
      );
  }, [currentPlayingGroup.index]);

  const handleShowForm = () => {
    setShowFrom(showForm ? false : true);
  };

  const getPrevSubject = () => {
    if (subjectIsPlaying) groupsBtns[currentPlayingGroup.index].play.click();
    setSubjectIsPlaying(false);

    if (currentPlayingGroup.index > 0) {
      dispatch(
        setCurrentPlayingGroup({ index: currentPlayingGroup.index - 1 })
      );
    }
  };

  const getPrevTrack = () => {
    setSubjectIsPlaying(false);
    groupsBtns[currentPlayingGroup.index].prev.click();
  };

  const playSubject = currentGroupIndex => {
    // console.log('attempted playing subject');
    if (currentPlayingGroup.index + 1 > groups.length) {
      setSubjectIsPlaying(false);
      return dispatch(setCurrentPlayingGroup({ index: 0 }));
    }

    groupsBtns[currentGroupIndex].play.click();
    setSubjectIsPlaying(!subjectIsPlaying);
  };

  const getNextTrack = () => {
    setSubjectIsPlaying(false);
    groupsBtns[currentPlayingGroup.index].next.click();
  };

  const getNextSubject = () => {
    if (subjectIsPlaying) groupsBtns[currentPlayingGroup.index].play.click();
    setSubjectIsPlaying(false);
    if (currentPlayingGroup.index < currentPlayingGroup.groupsCount - 1) {
      dispatch(
        setCurrentPlayingGroup({ index: currentPlayingGroup.index + 1 })
      );
    }
  };

  const item = (
    <div className='d-flex audio-header-details'>
      <div className='me-2'>AudioNotes</div>
      {subjectIsValid(selectedSubject) && Boolean(groups.length) && (
        <>
          <div className='fw-normal'>
            {subjectIsValid(selectedSubject) &&
              formatTime(groups.reduce((a, b) => a + b.props.totalDuration, 0))}
          </div>
          <div className='audio-controls'>
            <button
              onClick={getPrevSubject}
              className='audio-control-btn for-groups'
            >
              <i className='fa fa-step-backward'></i>
            </button>
            <button onClick={getPrevTrack} className='audio-control-btn'>
              <i className='fa fa-step-backward'></i>
            </button>
            <button
              onClick={() => playSubject(currentPlayingGroup.index)}
              className='audio-control-btn'
            >
              <i className={`fa fa-${subjectIsPlaying ? 'stop' : 'play'}`}></i>
            </button>
            <button onClick={getNextTrack} className='audio-control-btn'>
              <i className='fa fa-step-forward'></i>
            </button>
            <button
              onClick={getNextSubject}
              className='audio-control-btn for-groups'
            >
              <i className='fa fa-step-forward'></i>
            </button>
          </div>
          <div className='playing-group'>
            {groups.length && groups[currentPlayingGroup.index]?.name}
          </div>
        </>
      )}
    </div>
  );

  return (
    <div className='audio-notes-container'>
      <div className='sticky-top'>
        <HeaderCard
          user={user}
          count={groups.length}
          item={item}
          onClick={handleShowForm}
          showForm={showForm}
        />
        <SortCard sortTarget={null} onSort={null} checkedName='Checked' />
        {showForm && <AudioNotesForm />}
      </div>
      {loading ? (
        <div className='center-spinner'>
          <BeatLoader size={50} color={'#6A7475'} loading={loading} />
        </div>
      ) : (
        <>
          {subjectIsValid(selectedSubject) ? (
            Boolean(groups.length) &&
            groups.map((group, index) => (
              <AudioNotesGroup
                key={group._id}
                index={index}
                user={user}
                group={group}
                setGroupsBtns={setGroupsBtns}
                playSubject={playSubject}
                currentGroupIndex={currentPlayingGroup.index}
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
